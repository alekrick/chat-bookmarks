"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useAppState } from "@/hooks/useAppState";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import BookmarksPopup from "@/components/BookmarksPopup";

const Home = (): JSX.Element => {
  const state = useAppState();
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  if (!state.mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#212121]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#212121]">
      <Sidebar
        chats={state.chats}
        activeChatId={state.activeChatId}
        bookmarkCount={state.bookmarks.length}
        open={state.sidebarOpen}
        onClose={() => state.setSidebarOpen(false)}
        onSelectChat={state.setActiveChatId}
        onCreateChat={state.createChat}
        onDeleteChat={state.deleteChat}
        onOpenBookmarks={() => setBookmarksOpen(true)}
      />
      <ChatArea
        chat={state.activeChat}
        highlightedMessageId={state.highlightedMessageId}
        getMessageHighlights={state.getMessageHighlights}
        getChatBookmarks={state.getChatBookmarks}
        onSendMessage={state.sendMessage}
        onAddHighlight={state.addHighlight}
        onRemoveBookmark={state.removeBookmark}
        onChangeHighlightColor={state.changeHighlightColor}
        onNavigateToBookmark={state.navigateToBookmark}
        onOpenSidebar={() => state.setSidebarOpen(true)}
        onDeleteChat={state.deleteChat}
      />

      {bookmarksOpen && (
        <BookmarksPopup
          bookmarks={state.bookmarks}
          onClose={() => setBookmarksOpen(false)}
          onBookmarkClick={state.navigateToBookmark}
          onRemoveBookmark={state.removeBookmark}
          onUpdateLabel={state.updateBookmarkLabel}
          searchBookmarks={state.searchBookmarks}
          getChatTitle={state.getChatTitle}
        />
      )}
    </div>
  );
};

export default Home;
