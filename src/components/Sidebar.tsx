"use client";

import type { JSX } from "react";
import { useState, useRef, useEffect } from "react";
import type { Chat } from "@/types";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  bookmarkCount: number;
  open: boolean;
  onClose: () => void;
  onSelectChat: (id: string) => void;
  onCreateChat: () => void;
  onDeleteChat: (id: string) => void;
  onOpenBookmarks: () => void;
}

const Sidebar = ({
  chats,
  activeChatId,
  bookmarkCount,
  open,
  onClose,
  onSelectChat,
  onCreateChat,
  onDeleteChat,
  onOpenBookmarks,
}: SidebarProps): JSX.Element => {
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredChats = searchQuery
    ? chats.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chats;

  useEffect(() => {
    if (searchMode) searchRef.current?.focus();
  }, [searchMode]);

  const exitSearch = (): void => {
    setSearchMode(false);
    setSearchQuery("");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-[#171717] transition-transform duration-200 md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[52px] shrink-0 items-center justify-between px-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/5"
            title="Home"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l2 2" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/60 md:hidden"
            aria-label="Close sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="shrink-0 px-1.5">
          <ul className="m-0 list-none space-y-0.5 p-0">
            <li>
              <button
                onClick={() => {
                  onCreateChat();
                  onClose();
                }}
                data-testid="new-chat-button"
                className="group flex w-full items-center rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5"
              >
                <span className="flex h-5 w-5 items-center justify-center opacity-60">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </span>
                <span className="ml-2 flex-1 truncate text-left">New chat</span>
                <span className="hidden text-[11px] text-white/40 lg:inline-flex">
                  ⇧⌘O
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSearchMode(!searchMode)}
                data-testid="search-chats-button"
                className="group flex w-full items-center rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5"
              >
                <span className="flex h-5 w-5 items-center justify-center opacity-60">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
                <span className="ml-2 flex-1 truncate text-left">
                  Search chats
                </span>
                <span className="hidden text-[11px] text-white/40 lg:inline-flex">
                  ⌘K
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div className="mt-1 shrink-0 border-b border-white/5 px-1.5 pb-2.5">
          <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5">
            <span className="flex h-5 w-5 items-center justify-center opacity-60">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </span>
            <span className="ml-2 truncate">Images</span>
          </button>

          <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5">
            <span className="flex h-5 w-5 items-center justify-center opacity-60">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <span className="ml-2 truncate">Apps</span>
          </button>

          <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5">
            <span className="flex h-5 w-5 items-center justify-center opacity-60">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9M12 3a15 15 0 0 0-4 9 15 15 0 0 0 4 9M3 12h18" />
              </svg>
            </span>
            <span className="ml-2 truncate">Deep research</span>
          </button>

          <button
            onClick={onOpenBookmarks}
            data-testid="open-bookmarks-button"
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5"
          >
            <span className="flex h-5 w-5 items-center justify-center opacity-60">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span className="ml-2 flex-1 truncate text-left">Bookmarks</span>
            {bookmarkCount > 0 && (
              <span className="ml-auto rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white/40">
                {bookmarkCount}
              </span>
            )}
          </button>
        </div>

        {searchMode && (
          <div className="shrink-0 px-3 pt-2.5">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && exitSearch()}
                placeholder="Search…"
                data-testid="chat-search-input"
                className="w-full rounded-lg bg-white/5 py-2 pl-8 pr-8 text-sm text-white/80 placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-white/20"
              />
              <button
                onClick={exitSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-1.5 pt-1">
          <button
            className="flex w-full items-center gap-0.5 px-3 py-1.5 text-white/50"
          >
            <h2 className="text-xs font-medium">Your chats</h2>
          </button>

          {filteredChats.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-white/40">
              {searchQuery ? "No chats match your search" : "No chats yet"}
            </p>
          )}

          <ul className="m-0 list-none space-y-px p-0">
            {filteredChats.map((chat) => (
              <li key={chat.id} className="list-none">
                <div
                  data-testid={`chat-item-${chat.id}`}
                  className={`group relative flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                    chat.id === activeChatId
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white/80"
                  }`}
                  onClick={() => {
                    onSelectChat(chat.id);
                    onClose();
                  }}
                >
                  <span className="flex-1 truncate">{chat.title}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenId(menuOpenId === chat.id ? null : chat.id);
                    }}
                    className="absolute right-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/0 transition-colors hover:bg-white/10 hover:text-white/60 group-hover:text-white/30"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>

                  {menuOpenId === chat.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(null);
                        }}
                      />
                      <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-white/10 bg-[#2f2f2f] py-1 shadow-xl">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(chat.id);
                            setMenuOpenId(null);
                          }}
                          data-testid={`delete-chat-${chat.id}`}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-white/5"
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
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0 border-t border-white/5 p-2">
          <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-white/5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-semibold text-white">
              U
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-white/80">User</div>
              <div className="text-[11px] text-white/50">Free plan</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
