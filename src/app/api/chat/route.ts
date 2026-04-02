import { NextRequest, NextResponse } from 'next/server';
import { convertToModelMessages, ModelMessage, UIMessage } from 'ai';
import { toUIMessageStream } from '@ai-sdk/langchain';
import { createUIMessageStreamResponse } from 'ai';
import { z } from 'zod';
import {
  StateGraph,
  MessagesAnnotation,
  MemorySaver,
} from '@langchain/langgraph';
import { tool } from '@langchain/core/tools';
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { vectorStore } from '@/database/db-connection';
import type { DocumentInterface } from '@langchain/core/documents';
import { ToolNode, toolsCondition } from '@langchain/langgraph/prebuilt';

const llm = new ChatOpenAI({
  model: 'gpt-4o',
  temperature: 0.5,
});

function createRetrieveTool() {
  const retrieveSchema = z.object({ query: z.string() });
  const retrieve = tool(
    async (input: unknown) => {
      const { query } = retrieveSchema.parse(input);
      const retrievedDocs = await vectorStore.similaritySearch(query);
      const serialized = retrievedDocs
        .map(
          (doc: DocumentInterface<Record<string, unknown>>) =>
            `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`,
        )
        .join('\n');
      return [serialized, retrievedDocs];
    },
    {
      name: 'retrieve',
      description: 'Retrieve information related to a query.',
      schema: retrieveSchema,
      responseFormat: 'content_and_artifact',
    },
  );
  return retrieve;
}

function createGraph() {
  const queryOrRespond = async (state: typeof MessagesAnnotation.State) => {
    const llmWithTools = llm.bindTools([createRetrieveTool()]);
    const systemPrompt = `You are David AI.
                          Use retrieval tool for all questions except simple greetings.
                          Answer ONLY about your professional experience from knowledge base.
                          NEVER provide code examples or tutorials.
                          Just say what technologies I used and in which projects.
                          Introduce yourself: "Hello, I'm David AI, what do you want to know about me?"
                          Speak in first person about my experience only.`;
    const response = await llmWithTools.invoke([
      new SystemMessage(systemPrompt),
      ...state.messages,
    ]);
    return { messages: [response] };
  };

  const tools = new ToolNode([createRetrieveTool()]);

  const generate = async (state: typeof MessagesAnnotation.State) => {
    const recentToolMessages = [];
    for (let i = state['messages'].length - 1; i >= 0; i--) {
      const message = state['messages'][i];
      if (message instanceof ToolMessage) {
        recentToolMessages.push(message);
      } else {
        break;
      }
    }
    const toolMessages = recentToolMessages.reverse();

    const docsContent = toolMessages.map((doc) => doc.content).join('\n');
    const systemMessageContent =
      'You are David AI. Answer ONLY about your professional experience. ' +
      'NEVER provide code examples or technical guidance. ' +
      'Only mention technologies you used and in which projects. ' +
      'If asked for code say: "I only share my professional experience, not technical guidance." ' +
      'If asked something else, redirect to my professional background. ' +
      'Speak in first person about my experience only. ' +
      `${docsContent}`;

    const conversationMessages = state.messages.filter(
      (message) =>
        message instanceof HumanMessage ||
        message instanceof SystemMessage ||
        (message instanceof AIMessage &&
          (message.tool_calls?.length ?? 0) === 0),
    );
    const prompt = [
      new SystemMessage(systemMessageContent),
      ...conversationMessages,
    ];

    const response = await llm.invoke(prompt);
    return { messages: [response] };
  };

  const graphBuilder = new StateGraph(MessagesAnnotation)
    .addNode('queryOrRespond', queryOrRespond)
    .addNode('tools', tools)
    .addNode('generate', generate)
    .addEdge('__start__', 'queryOrRespond')
    .addConditionalEdges('queryOrRespond', toolsCondition, {
      __end__: '__end__',
      tools: 'tools',
    })
    .addEdge('tools', 'generate')
    .addEdge('generate', '__end__');

  const checkpointer = new MemorySaver();

  const graphWithMemory = graphBuilder.compile({
    checkpointer: checkpointer,
  });
  return graphWithMemory;
}

export async function POST(req: NextRequest) {
  try {
    const { id: sessionId, messages }: { id: string; messages: UIMessage[] } =
      await req.json();
    const messagesConverted = await convertToModelMessages(messages);
    const messagesMapped = messagesConverted.map((msg: ModelMessage) => {
      return {
        role: msg.role as 'user',
        content: (msg.content[0] as { type: string; text: string }).text,
      };
    });

    const graph = createGraph();
    const stream = graph.streamEvents(
      { messages: messagesMapped },
      {
        configurable: { thread_id: sessionId },
        streamMode: 'values',
        version: 'v2',
      },
    );

    return createUIMessageStreamResponse({
      stream: toUIMessageStream(stream),
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 },
    );
  }
}
