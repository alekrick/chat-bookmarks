"use client";

import React from "react";
import type { Bookmark, HighlightColor } from "@/types";

const HL_BG: Record<HighlightColor, string> = {
  yellow: "bg-yellow-400/30 text-yellow-100",
  green: "bg-emerald-400/25 text-emerald-100",
  blue: "bg-sky-400/25 text-sky-100",
  pink: "bg-pink-400/25 text-pink-100",
};

type Token =
  | { kind: "text"; value: string }
  | { kind: "bold"; value: string }
  | { kind: "code"; value: string }
  | { kind: "codeblock"; value: string }
  | { kind: "br" };

interface PosToken {
  kind: Token["kind"];
  value: string;
  vStart: number;
  vEnd: number;
}

interface HLRange {
  start: number;
  end: number;
  color: HighlightColor;
  id: string;
}

interface RenderChunk {
  text: string;
  format: "text" | "bold" | "code" | "codeblock";
  hl?: { color: HighlightColor; id: string };
}

type RenderItem = RenderChunk | { kind: "br" };

const tokenize = (content: string): Token[] => {
  const tokens: Token[] = [];
  const lines = content.split("\n");
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    if (i > 0) tokens.push({ kind: "br" });
    const line = lines[i];

    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      tokens.push({ kind: "codeblock", value: line });
      continue;
    }
    if (!line) continue;

    const re = /(\*\*(.+?)\*\*)|(`(.+?)`)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line)) !== null) {
      if (m.index > last)
        tokens.push({ kind: "text", value: line.slice(last, m.index) });
      if (m[1]) tokens.push({ kind: "bold", value: m[2] });
      else if (m[3]) tokens.push({ kind: "code", value: m[4] });
      last = re.lastIndex;
    }
    if (last < line.length)
      tokens.push({ kind: "text", value: line.slice(last) });
  }
  return tokens;
};

const withPositions = (tokens: Token[]): PosToken[] => {
  let pos = 0;
  return tokens.map((t): PosToken => {
    if (t.kind === "br") {
      const pt: PosToken = { kind: "br", value: "\n", vStart: pos, vEnd: pos + 1 };
      pos += 1;
      return pt;
    }
    const len = t.value.length;
    const pt: PosToken = { kind: t.kind, value: t.value, vStart: pos, vEnd: pos + len };
    pos += len;
    return pt;
  });
};

export const getVisualText = (content: string): string => {
  const pts = withPositions(tokenize(content));
  return pts.map((t) => (t.kind === "br" ? "\n" : t.value)).join("");
};

const buildItems = (pts: PosToken[], highlights: Bookmark[]): RenderItem[] => {
  const vt = pts.map((t) => (t.kind === "br" ? "\n" : t.value)).join("");

  const ranges: HLRange[] = [];
  for (const h of highlights) {
    const idx = vt.indexOf(h.highlightedText);
    if (idx !== -1)
      ranges.push({
        start: idx,
        end: idx + h.highlightedText.length,
        color: h.color,
        id: h.id,
      });
  }
  ranges.sort((a, b) => a.start - b.start);

  const clean: HLRange[] = [];
  for (const r of ranges) {
    if (!clean.length || r.start >= clean[clean.length - 1].end)
      clean.push(r);
  }

  if (!clean.length) {
    return pts.map((t): RenderItem =>
      t.kind === "br"
        ? { kind: "br" }
        : { text: t.value, format: t.kind as RenderChunk["format"] },
    );
  }

  const items: RenderItem[] = [];
  for (const pt of pts) {
    if (pt.kind === "br") {
      items.push({ kind: "br" });
      continue;
    }
    const fmt = pt.kind as RenderChunk["format"];
    const overlapping = clean.filter(
      (r) => r.start < pt.vEnd && r.end > pt.vStart,
    );
    if (!overlapping.length) {
      items.push({ text: pt.value, format: fmt });
      continue;
    }

    let cursor = pt.vStart;
    for (const r of overlapping) {
      const s = Math.max(r.start, pt.vStart);
      const e = Math.min(r.end, pt.vEnd);
      if (s > cursor)
        items.push({
          text: pt.value.slice(cursor - pt.vStart, s - pt.vStart),
          format: fmt,
        });
      items.push({
        text: pt.value.slice(s - pt.vStart, e - pt.vStart),
        format: fmt,
        hl: { color: r.color, id: r.id },
      });
      cursor = e;
    }
    if (cursor < pt.vEnd)
      items.push({ text: pt.value.slice(cursor - pt.vStart), format: fmt });
  }
  return items;
};

export const renderContent = (
  content: string,
  highlights: Bookmark[],
  onHighlightClick: (id: string, color: HighlightColor, rect: DOMRect) => void,
): React.ReactNode => {
  const pts = withPositions(tokenize(content));
  const items = buildItems(pts, highlights);

  return items.map((item, i) => {
    if ("kind" in item && item.kind === "br") return <br key={i} />;

    const ch = item as RenderChunk;
    let node: React.ReactNode = ch.text;

    switch (ch.format) {
      case "bold":
        node = <strong className="text-white/95">{node}</strong>;
        break;
      case "code":
        node = (
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-emerald-300">
            {node}
          </code>
        );
        break;
      case "codeblock":
        node = (
          <code className="block rounded bg-white/5 px-3 py-0.5 text-xs text-emerald-300">
            {node}
          </code>
        );
        break;
    }

    if (ch.hl) {
      return (
        <mark
          key={i}
          className={`relative inline cursor-pointer rounded-sm px-px ${HL_BG[ch.hl.color]}`}
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            onHighlightClick(ch.hl!.id, ch.hl!.color, rect);
          }}
        >
          {node}
        </mark>
      );
    }

    return <React.Fragment key={i}>{node}</React.Fragment>;
  });
};
