'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Streamdown } from 'streamdown';
import 'streamdown/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const transport = new DefaultChatTransport({
  api: '/api/chat',
});

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({ transport });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    if (status === 'submitted' || status === 'streaming') return;
    sendMessage({ text: input });
    setInput('');
  };

  const isStreaming = status === 'submitted' || status === 'streaming';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 w-[420px] h-[540px] backdrop-blur-xl bg-card/70 border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="font-semibold text-foreground text-sm">
                David AI
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-7 w-7 p-0 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-3">
              {/* Welcome message */}
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl rounded-tl-sm text-sm bg-muted/80 text-foreground leading-relaxed">
                    {t('chat.welcomeMessage')}
                  </div>
                </div>
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'user' ? (
                    <div className="max-w-[85%]">
                      {message.parts.map((part, i) => {
                        if (part.type === 'text') {
                          return (
                            <div
                              key={`${message.id}-${i}`}
                              className="px-3 py-2 rounded-2xl rounded-tr-sm text-sm bg-primary text-primary-foreground leading-relaxed"
                            >
                              {part.text}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <div className="px-3 py-2 rounded-2xl rounded-tl-sm text-sm bg-muted/80 text-foreground leading-relaxed">
                        {message.parts.map((part, i) => {
                          if (part.type === 'text') {
                            return (
                              <Streamdown
                                key={`${message.id}-${i}`}
                                mode={
                                  status === 'streaming' &&
                                  message.id ===
                                    messages[messages.length - 1]?.id
                                    ? 'streaming'
                                    : 'static'
                                }
                                className="streamdown-chat prose-sm"
                              >
                                {part.text}
                              </Streamdown>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {status === 'submitted' &&
                messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <div className="px-3 py-2 rounded-2xl rounded-tl-sm text-sm bg-muted/80">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 px-4 py-3 border-t border-border bg-muted/20"
          >
            <input
              value={input}
              placeholder={t('chat.placeholder')}
              onChange={(e) => setInput(e.currentTarget.value)}
              className="flex-1 bg-background/60 border border-border rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60"
            />
            <Button
              type="submit"
              size="sm"
              disabled={isStreaming || !input.trim()}
              className="h-9 w-9 p-0 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
