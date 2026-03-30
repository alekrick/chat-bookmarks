# 💬 Chat Bookmarks

A prototype that reimagines ChatGPT as a **knowledge tool**, not just a conversation tool—by enabling users to bookmark and revisit key insights across chats.

---

## 💡 Problem

In long ChatGPT conversations, valuable insights get buried and are difficult to retrieve.

Users today:

* Scroll endlessly to find important answers
* Re-ask the same questions
* Lose high-value information over time

---

## 🎯 Solution

Chat Bookmarks introduces a **cross-chat bookmarking system** that allows users to:

* 🔖 Save specific messages
* 📚 Access all bookmarks in one place
* ⚡ Instantly jump back to important insights

---

## 🧠 Key Features

* Bookmark any assistant message
* Dedicated **Bookmarks section** in the sidebar
* View bookmarks across all chats
* Chat-level bookmark filtering (via menu)
* Smooth scroll + highlight when navigating to a bookmark
* Local session persistence using `localStorage`

---

## 👤 Target Users

* Product Managers preparing case studies
* Learners studying frameworks or concepts
* Knowledge workers using ChatGPT for thinking & research

---

## 📊 Success Metrics (Hypothetical)

* % of users creating at least one bookmark
* Average bookmarks per user
* Bookmark revisit rate
* Reduction in time spent searching within chats

---

## ⚖️ Trade-offs

* **LocalStorage vs Backend**

  * Faster to prototype
  * No cross-device sync

* **Bookmarking assistant messages only**

  * Simpler UX
  * Less flexibility

---

## 🚀 Future Improvements

* 🔍 Search within bookmarks
* 🏷 Tagging & organization
* ☁️ Cloud sync across devices
* 🤖 AI-suggested highlights
* 🧾 Export bookmarks to notes / Notion

---

## 🧪 Why this matters

> This project explores how conversational interfaces can evolve from transient interactions into persistent **knowledge systems**.

---

## 🛠 Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS

---

## ⚙️ Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view it in the browser.

---

## 📁 Project Structure (simplified)

* `/app` – main application routes
* `/components` – UI components (Chat, Sidebar, Messages)
* `/lib` – helpers (localStorage, state management)

---

## 🙌 Author

Built by Alessandra Krick as a product-thinking + prototyping project.
