"use client";

import type { JSX } from "react";
import { useState, useRef, useEffect } from "react";
import type { Bookmark, HighlightColor } from "@/types";
import { formatTimestamp, truncate } from "@/lib/utils";

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

interface BookmarksPopupProps {
  bookmarks: Bookmark[];
  onClose: () => void;
  onBookmarkClick: (bookmark: Bookmark) => void;
  onRemoveBookmark: (id: string) => void;
  onUpdateLabel: (id: string, label: string) => void;
  searchBookmarks: (query: string) => Bookmark[];
  getChatTitle: (chatId: string) => string;
}

const BookmarksPopup = ({
  bookmarks,
  onClose,
  onBookmarkClick,
  onRemoveBookmark,
  onUpdateLabel,
  searchBookmarks,
  getChatTitle,
}: BookmarksPopupProps): JSX.Element => {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [labelDraft, setLabelDraft] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = search ? searchBookmarks(search) : bookmarks;

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const saveLabel = (id: string): void => {
    onUpdateLabel(id, labelDraft.trim());
    setEditingId(null);
    setLabelDraft("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[8vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-amber-500"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <h2 className="text-base font-semibold text-white">
              Highlights &amp; Bookmarks
            </h2>
            <span className="rounded-full bg-white/8 px-2 py-0.5 text-xs tabular-nums text-white/40">
              {bookmarks.length}
            </span>
          </div>
          <button
            onClick={onClose}
            data-testid="close-bookmarks-popup"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/60"
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

        <div className="shrink-0 border-b border-white/5 px-5 py-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              width="15"
              height="15"
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search highlights…"
              data-testid="bookmarks-search-input"
              className="w-full rounded-lg bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white/80 placeholder-white/30 outline-none ring-1 ring-white/10 transition-colors focus:ring-white/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                className="mb-3 text-white/15"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-sm text-white/30">
                {search
                  ? "No highlights match your search"
                  : "No highlights yet"}
              </p>
              {!search && (
                <p className="mt-1 text-xs text-white/20">
                  Select text in any message to create a highlight
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((bm) => (
                <div
                  key={bm.id}
                  data-testid={`bookmark-item-${bm.id}`}
                  className="group/item cursor-pointer rounded-xl p-3 transition-colors hover:bg-white/5"
                  onClick={() => {
                    onBookmarkClick(bm);
                    onClose();
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`mt-1 h-4 w-1 shrink-0 rounded-full ${COLOR_DOT[bm.color]}`}
                    />
                    <p
                      className={`flex-1 rounded-md px-2 py-1 text-sm leading-relaxed text-white/70 ${COLOR_BG[bm.color]}`}
                    >
                      &ldquo;{truncate(bm.highlightedText, 140)}&rdquo;
                    </p>
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 pl-3.5 text-[11px]">
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-white/40">
                      {getChatTitle(bm.chatId)}
                    </span>
                    <span className="text-white/25">
                      {formatTimestamp(bm.createdAt)}
                    </span>

                    {editingId === bm.id ? (
                      <input
                        autoFocus
                        value={labelDraft}
                        onChange={(e) => setLabelDraft(e.target.value)}
                        onBlur={() => saveLabel(bm.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveLabel(bm.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Label…"
                        className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-white/80 outline-none ring-1 ring-amber-500/50"
                      />
                    ) : (
                      <>
                        {bm.label && (
                          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-400">
                            {bm.label}
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(bm.id);
                            setLabelDraft(bm.label ?? "");
                          }}
                          className="text-white/0 transition-colors hover:text-amber-400 group-hover/item:text-white/25"
                        >
                          {bm.label ? "edit" : "+ label"}
                        </button>
                      </>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveBookmark(bm.id);
                      }}
                      className="ml-auto text-white/0 transition-colors hover:text-red-400 group-hover/item:text-white/25"
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPopup;
