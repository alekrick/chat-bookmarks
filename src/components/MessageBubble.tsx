"use client";

import type { JSX } from "react";
import { useState, useRef, useEffect } from "react";
import type { Bookmark, HighlightColor } from "@/types";
import { renderContent, getVisualText } from "@/lib/content-renderer";

const HIGHLIGHT_COLORS: HighlightColor[] = ["yellow", "green", "blue", "pink"];

const COLOR_DOT: Record<HighlightColor, string> = {
  yellow: "bg-yellow-400",
  green: "bg-emerald-400",
  blue: "bg-sky-400",
  pink: "bg-pink-400",
};

interface MessageBubbleProps {
  id: string;
  role: "user" | "assistant";
  content: string;
  highlights: Bookmark[];
  isHighlighted: boolean;
  onAddHighlight: (text: string, color: HighlightColor) => void;
  onRemoveHighlight: (bookmarkId: string) => void;
  onChangeHighlightColor: (bookmarkId: string, color: HighlightColor) => void;
}

const MessageBubble = ({
  id,
  role,
  content,
  highlights,
  isHighlighted,
  onAddHighlight,
  onRemoveHighlight,
  onChangeHighlightColor,
}: MessageBubbleProps): JSX.Element => {
  const isUser = role === "user";
  const contentRef = useRef<HTMLDivElement>(null);

  const [selection, setSelection] = useState<{
    text: string;
    rect: DOMRect;
  } | null>(null);

  const [editingHighlight, setEditingHighlight] = useState<{
    id: string;
    color: HighlightColor;
    rect: DOMRect;
  } | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent): void => {
      if (!(e.target as Element).closest("[data-selection-toolbar]")) {
        setSelection(null);
        setEditingHighlight(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleMouseUp = (): void => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
    if (
      !contentRef.current?.contains(sel.anchorNode) ||
      !contentRef.current?.contains(sel.focusNode)
    )
      return;

    const selectedText = sel.toString();
    const visual = getVisualText(content);
    if (!visual.includes(selectedText)) return;

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelection({ text: selectedText, rect });
    setEditingHighlight(null);
  };

  const handleNewHighlight = (color: HighlightColor): void => {
    if (!selection) return;
    onAddHighlight(selection.text, color);
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  };

  const handleEditHighlight = (color: HighlightColor): void => {
    if (!editingHighlight) return;
    if (color === editingHighlight.color) {
      onRemoveHighlight(editingHighlight.id);
    } else {
      onChangeHighlightColor(editingHighlight.id, color);
    }
    setEditingHighlight(null);
  };

  const handleHighlightClick = (
    hlId: string,
    hlColor: HighlightColor,
    rect: DOMRect,
  ): void => {
    setSelection(null);
    window.getSelection()?.removeAllRanges();
    setEditingHighlight({ id: hlId, color: hlColor, rect });
  };

  const activeToolbar = selection
    ? { rect: selection.rect, mode: "new" as const }
    : editingHighlight
      ? { rect: editingHighlight.rect, mode: "edit" as const }
      : null;

  const computeToolbarStyle = (): React.CSSProperties | undefined => {
    if (!activeToolbar) return undefined;
    const TOOLBAR_W = 260;
    const GAP = 10;
    const { rect } = activeToolbar;
    let x = rect.left + rect.width / 2 - TOOLBAR_W / 2;
    let y = rect.top - 56 - GAP;
    x = Math.max(8, Math.min(x, window.innerWidth - TOOLBAR_W - 8));
    if (y < 8) y = rect.bottom + GAP;
    return { left: x, top: y };
  };

  const dismissToolbar = (): void => {
    window.getSelection()?.removeAllRanges();
    setSelection(null);
    setEditingHighlight(null);
  };

  return (
    <div
      id={`msg-${id}`}
      data-testid={`message-${id}`}
      className={`group relative px-4 py-4 transition-colors duration-700 md:px-0 ${
        isHighlighted ? "highlight-flash rounded-xl" : ""
      }`}
    >
      <div className="flex gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
            isUser ? "bg-indigo-600 text-white" : "bg-emerald-600 text-white"
          }`}
        >
          {isUser ? "Y" : "A"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm font-medium text-white/90">
              {isUser ? "You" : "Assistant"}
            </span>
            {highlights.length > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-white/30">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-amber-500/70"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {highlights.length}
              </span>
            )}
          </div>

          <div
            ref={contentRef}
            onMouseUp={handleMouseUp}
            className="select-text text-sm leading-relaxed text-white/80"
          >
            {renderContent(content, highlights, handleHighlightClick)}
          </div>
        </div>
      </div>

      {activeToolbar && (
        <div
          data-selection-toolbar
          data-testid="highlight-toolbar"
          className="fixed z-50"
          style={computeToolbarStyle()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex items-end justify-center gap-0.5 rounded-2xl bg-[#2a2a2a] px-2.5 py-1.5 shadow-2xl ring-1 ring-white/15">
            {HIGHLIGHT_COLORS.map((color) => {
              const isActive =
                activeToolbar.mode === "edit" &&
                editingHighlight?.color === color;

              return (
                <button
                  key={color}
                  onClick={() =>
                    activeToolbar.mode === "new"
                      ? handleNewHighlight(color)
                      : handleEditHighlight(color)
                  }
                  data-testid={`highlight-color-${color}`}
                  className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-0.5 transition-colors hover:bg-white/10 ${isActive ? "bg-white/15" : ""}`}
                  title={isActive ? "Remove highlight" : `Highlight ${color}`}
                >
                  <span
                    className={`relative h-5 w-5 shrink-0 rounded-full ${COLOR_DOT[color]} ring-1 ring-white/20`}
                  >
                    {isActive && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="absolute inset-0 m-auto text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[10px] capitalize leading-none text-white/50">
                    {color}
                  </span>
                </button>
              );
            })}
            <div className="mx-0.5 mb-1 h-6 w-px self-center bg-white/10" />
            <button
              onClick={dismissToolbar}
              className="mb-1 flex h-5 w-5 items-center justify-center self-center rounded-full text-white/30 transition-colors hover:bg-white/10 hover:text-white/60"
              title="Cancel"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center">
            <div className="h-2 w-2 -translate-y-px rotate-45 bg-[#2a2a2a] ring-1 ring-white/15 [clip-path:polygon(0%_100%,100%_100%,100%_0%)]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
