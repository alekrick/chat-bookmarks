"use client";

import type { JSX } from "react";
import { useState, useRef, useEffect } from "react";
import type { Chat, Bookmark, HighlightColor } from "@/types";
import MessageBubble from "./MessageBubble";
import ChatBookmarksModal from "./ChatBookmarksModal";

interface ChatAreaProps {
  chat: Chat | null;
  highlightedMessageId: string | null;
  getMessageHighlights: (messageId: string) => Bookmark[];
  getChatBookmarks: (chatId: string) => Bookmark[];
  onSendMessage: (content: string) => void;
  onAddHighlight: (
    chatId: string,
    messageId: string,
    text: string,
    color: HighlightColor,
  ) => void;
  onRemoveBookmark: (id: string) => void;
  onChangeHighlightColor: (id: string, color: HighlightColor) => void;
  onNavigateToBookmark: (bookmark: Bookmark) => void;
  onOpenSidebar: () => void;
  onDeleteChat: (id: string) => void;
  onCreateChat: () => void;
}

const ChatArea = ({
  chat,
  highlightedMessageId,
  getMessageHighlights,
  getChatBookmarks,
  onSendMessage,
  onAddHighlight,
  onRemoveBookmark,
  onChangeHighlightColor,
  onNavigateToBookmark,
  onOpenSidebar,
  onDeleteChat,
  onCreateChat,
}: ChatAreaProps): JSX.Element => {
  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showChatBookmarks, setShowChatBookmarks] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatBookmarks = chat ? getChatBookmarks(chat.id) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages.length]);

  const handleSend = (): void => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (): void => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  if (!chat) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-[#212121]">
        <button
          onClick={onOpenSidebar}
          className="absolute left-3 top-3 rounded-lg p-2 text-white/50 transition-colors hover:bg-white/5 md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white/30"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-white/60">
            Start a conversation
          </h2>
          <p className="mt-1 text-sm text-white/30">
            Create a new chat to get started
          </p>
          <button
            onClick={onCreateChat}
            className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            Start new chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col bg-[#212121]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/5 md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <h1 className="text-sm font-medium text-white/80">{chat.title}</h1>
          {chatBookmarks.length > 0 && (
            <button
              onClick={() => setShowChatBookmarks(true)}
              data-testid="chat-bookmarks-badge"
              className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50 transition-colors hover:bg-white/10 hover:text-white/70"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {chatBookmarks.length}
            </button>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white/60"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-white/10 bg-[#2f2f2f] py-1 shadow-xl">
                <button
                  onClick={() => {
                    onDeleteChat(chat.id);
                    setShowMenu(false);
                  }}
                  data-testid="delete-chat-menu"
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-white/5"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete chat
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl py-4">
          {chat.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600">
                <span className="text-lg font-medium text-white">A</span>
              </div>
              <p className="text-lg font-medium text-white/60">
                How can I help you today?
              </p>
              <p className="mt-1 text-sm text-white/30">
                Select any text in a response to highlight it — just like Kindle
              </p>
            </div>
          )}

          {chat.messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              id={msg.id}
              role={msg.role}
              content={msg.content}
              highlights={getMessageHighlights(msg.id)}
              isHighlighted={highlightedMessageId === msg.id}
              onAddHighlight={(text, color) =>
                onAddHighlight(chat.id, msg.id, text, color)
              }
              onRemoveHighlight={onRemoveBookmark}
              onChangeHighlightColor={onChangeHighlightColor}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-3">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 rounded-2xl bg-[#2f2f2f] px-4 py-2.5 ring-1 ring-white/10 transition-colors focus-within:ring-white/20">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="Message…"
              rows={1}
              data-testid="chat-input"
              className="max-h-[200px] flex-1 resize-none bg-transparent text-sm leading-6 text-white/90 placeholder-white/50 outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              data-testid="send-button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black transition-opacity disabled:opacity-20"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-white/40">
            Prototype — no AI integration. Responses are mock-generated to demo the highlight &amp; bookmark feature.
          </p>
        </div>
      </div>

      {showChatBookmarks && (
        <ChatBookmarksModal
          chatTitle={chat.title}
          bookmarks={chatBookmarks}
          onClose={() => setShowChatBookmarks(false)}
          onBookmarkClick={onNavigateToBookmark}
          onRemoveBookmark={onRemoveBookmark}
        />
      )}
    </div>
  );
};

export default ChatArea;
