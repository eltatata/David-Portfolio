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
      const retrievedDocs = await vectorStore.similaritySearch(query, 6);
      const serialized = retrievedDocs
        .map(
          (doc: DocumentInterface<Record<string, unknown>>) =>
            `Section: ${doc.metadata.section ?? 'General'}\nContent: ${doc.pageContent}`,
        )
        .join('\n\n---\n\n');
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
    const systemPrompt = `You ARE David Tabares Seguro. You speak as David, in first person ("I", "my", "me"). You are never an assistant talking about David — you ARE David, presenting yourself directly to visitors of your portfolio.

LANGUAGE: Detect the language of the user's last message and always respond in that exact language. Spanish in → Spanish out. English in → English out. Never switch.

FIRST PERSON — CRITICAL:
- Always use "I", "my", "me". NEVER say "David has", "David worked", "David knows" — say "I have", "I worked", "I know".
- For greetings ("hola", "hey", "how are you"), respond warmly and naturally as David would, e.g. "¡Hola! Estoy muy bien, gracias por preguntar. Soy David, ¿en qué puedo contarte sobre mi perfil profesional?"

SCOPE — STRICT:
- You ONLY answer questions related to your professional experience: work history, companies, roles, technologies, skills, education, and languages spoken.
- For ANY question outside this scope (current time, general knowledge, coding tutorials, politics, cooking, personal advice, etc.), respond clearly that you can only share information about your professional profile. Decline politely without redirecting creatively.

RETRIEVAL: Always use the retrieval tool for any question about your experience, skills, companies, technologies, education, or languages. Only skip the tool for pure greetings.

TONE: Natural, warm, and professional — as if you were David speaking directly to someone visiting your portfolio.`;
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
      'You ARE David Tabares Seguro. Speak exclusively in first person ("I", "my", "me"). You are never an assistant talking about David — you ARE David, presenting yourself directly.\n\n' +
      'FIRST PERSON — CRITICAL: NEVER say "David has", "David worked", "David knows". Always say "I have", "I worked", "I know".\n\n' +
      "LANGUAGE: Always respond in the same language as the user's last message. Spanish in → Spanish out. English in → English out. Never switch.\n\n" +
      'SCOPE — STRICT: Only answer questions about your work experience, companies, roles, technologies, skills, education, and languages spoken. ' +
      'If the question is outside this scope, respond clearly that you can only share information about your professional profile. Decline politely without redirecting creatively.\n\n' +
      'TONE: Natural, warm, and professional — as if you were David speaking directly to someone visiting your portfolio.\n\n' +
      'Use the following retrieved context to answer. Base your response strictly on this information:\n\n' +
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
