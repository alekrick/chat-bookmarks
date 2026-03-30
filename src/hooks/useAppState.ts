"use client";

import { useState, useEffect } from "react";
import type { Chat, Bookmark, Message, HighlightColor } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import { generateId } from "@/lib/utils";
import { getMockResponse } from "@/lib/mock-responses";

export const useAppState = () => {
  const [chats, setChats] = useLocalStorage<Chat[]>("cb-chats", []);
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>(
    "cb-bookmarks",
    [],
  );
  const [activeChatId, setActiveChatId] = useLocalStorage<string | null>(
    "cb-active-chat",
    null,
  );
  const [highlightedMessageId, setHighlightedMessageId] = useState<
    string | null
  >(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const createChat = (): string => {
    const id = generateId();
    const chat: Chat = {
      id,
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
    };
    setChats((prev) => [chat, ...prev]);
    setActiveChatId(id);
    return id;
  };

  const deleteChat = (id: string): void => {
    setChats((prev) => {
      const remaining = prev.filter((c) => c.id !== id);
      if (activeChatId === id) {
        setActiveChatId(remaining[0]?.id ?? null);
      }
      return remaining;
    });
    setBookmarks((prev) => prev.filter((b) => b.chatId !== id));
  };

  const sendMessage = (content: string): void => {
    const chatId = activeChatId;
    if (!chatId) return;

    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content,
      createdAt: Date.now(),
    };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId) return c;
        const updated = { ...c, messages: [...c.messages, userMsg] };
        if (c.messages.length === 0) {
          updated.title =
            content.slice(0, 40) + (content.length > 40 ? "…" : "");
        }
        return updated;
      }),
    );

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const assistantMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: getMockResponse(content),
        createdAt: Date.now(),
      };
      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== chatId) return c;
          return { ...c, messages: [...c.messages, assistantMsg] };
        }),
      );
    }, delay);
  };

  const addHighlight = (
    chatId: string,
    messageId: string,
    text: string,
    color: HighlightColor,
  ): void => {
    setBookmarks((prev) => {
      if (
        prev.some(
          (b) => b.messageId === messageId && b.highlightedText === text,
        )
      )
        return prev;
      return [
        ...prev,
        {
          id: generateId(),
          chatId,
          messageId,
          highlightedText: text,
          createdAt: Date.now(),
          color,
        },
      ];
    });
  };

  const changeHighlightColor = (id: string, color: HighlightColor): void => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, color } : b)),
    );
  };

  const removeBookmark = (id: string): void => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBookmarkLabel = (id: string, label: string): void => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, label } : b)),
    );
  };

  const getMessageHighlights = (messageId: string): Bookmark[] =>
    bookmarks.filter((b) => b.messageId === messageId);

  const getChatBookmarks = (chatId: string): Bookmark[] =>
    bookmarks.filter((b) => b.chatId === chatId);

  const navigateToBookmark = (bookmark: Bookmark): void => {
    setActiveChatId(bookmark.chatId);
    setSidebarOpen(false);
    setTimeout(() => {
      setHighlightedMessageId(bookmark.messageId);
      const el = document.getElementById(`msg-${bookmark.messageId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setHighlightedMessageId(null), 2500);
    }, 150);
  };

  const searchBookmarks = (query: string): Bookmark[] => {
    if (!query.trim()) return bookmarks;
    const q = query.toLowerCase();
    return bookmarks.filter(
      (b) =>
        b.highlightedText.toLowerCase().includes(q) ||
        b.label?.toLowerCase().includes(q),
    );
  };

  const getChatTitle = (chatId: string): string =>
    chats.find((c) => c.id === chatId)?.title ?? "Unknown Chat";

  return {
    mounted,
    chats,
    activeChat,
    activeChatId,
    bookmarks,
    highlightedMessageId,
    sidebarOpen,
    setSidebarOpen,
    setActiveChatId,
    createChat,
    deleteChat,
    sendMessage,
    addHighlight,
    changeHighlightColor,
    removeBookmark,
    updateBookmarkLabel,
    getMessageHighlights,
    getChatBookmarks,
    navigateToBookmark,
    searchBookmarks,
    getChatTitle,
  };
};
