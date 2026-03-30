export type HighlightColor = "yellow" | "green" | "blue" | "pink";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export interface Bookmark {
  id: string;
  chatId: string;
  messageId: string;
  highlightedText: string;
  createdAt: number;
  label?: string;
  color: HighlightColor;
}
