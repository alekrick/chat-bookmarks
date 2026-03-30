"use client";

import type { JSX } from "react";
import type { Bookmark, HighlightColor } from "@/types";
import { truncate, formatTimestamp } from "@/lib/utils";

const COLOR_DOT: Record<HighlightColor, string> = {
  yellow: "bg-yellow-400",
  green: "bg-emerald-400",
  blue: "bg-sky-400",
  pink: "bg-pink-400",
};

const COLOR_BG: Record<HighlightColor, string> = {
  yellow: "bg-yellow-400/20",
  green: "bg-emerald-400/15",
  blue: "bg-sky-400/15",
  pink: "bg-pink-400/15",
};

interface ChatBookmarksModalProps {
  chatTitle: string;
  bookmarks: Bookmark[];
  onClose: () => void;
  onBookmarkClick: (bookmark: Bookmark) => void;
  onRemoveBookmark: (id: string) => void;
}

const ChatBookmarksModal = ({
  chatTitle,
  bookmarks,
  onClose,
  onBookmarkClick,
  onRemoveBookmark,
}: ChatBookmarksModalProps): JSX.Element => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#2f2f2f] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              Highlights in this chat
            </h2>
            <p className="mt-0.5 text-xs text-white/40">{chatTitle}</p>
          </div>
          <button
            onClick={onClose}
            data-testid="close-chat-bookmarks"
            className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-4">
          {bookmarks.length === 0 ? (
            <div className="py-8 text-center">
              <svg
                className="mx-auto mb-3 text-white/20"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-sm text-white/40">
                No highlights in this chat yet
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  data-testid={`chat-bookmark-${bm.id}`}
                  className="group flex items-start gap-3 rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10"
                >
                  <div
                    className={`mt-1 h-4 w-1 shrink-0 rounded-full ${COLOR_DOT[bm.color]}`}
                  />
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => {
                      onBookmarkClick(bm);
                      onClose();
                    }}
                  >
                    <p
                      className={`rounded-md px-2 py-1 text-sm leading-relaxed text-white/70 ${COLOR_BG[bm.color]}`}
                    >
                      &ldquo;{truncate(bm.highlightedText, 150)}&rdquo;
                    </p>
                    <div className="mt-1 flex items-center gap-2 pl-2">
                      <span className="text-[10px] text-white/30">
                        {formatTimestamp(bm.createdAt)}
                      </span>
                      {bm.label && (
                        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-400">
                          {bm.label}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="shrink-0 rounded p-1 text-white/0 transition-colors hover:text-red-400 group-hover:text-white/30"
                    title="Remove highlight"
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBookmarksModal;
