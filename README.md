# Minimalist Todo List

A clean, distraction-free todo app built with React and Vite. Supports markdown-style input, a summary dashboard, dark/light mode, and full responsiveness.

## Features

- **Markdown input** — type tasks using markdown syntax and press Enter to add them
- **Summary dashboard** — view task stats by Day, Week, or Month with a visual bar chart
- **Dark / Light mode** — toggle in the header; respects your system preference on first load
- **Persistent storage** — todos and preferences survive page reloads via localStorage
- **Inline editing** — double-click any task to edit it
- **Filter tabs** — filter tasks by All, Active, or Done
- **Responsive** — works on desktop and mobile

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Markdown Input Syntax

| What you type | Result |
|---|---|
| `task text` | Plain task |
| `- task text` | List-style task |
| `* task text` | List-style task |
| `1. task text` | Numbered task |
| `- [ ] task` | Unchecked task |
| `- [x] task` | Pre-completed task |
| `**bold**` | **Bold** text in task |
| `*italic*` | *Italic* text in task |
| `` `code` `` | `Code` span in task |
| `~~strike~~` | ~~Strikethrough~~ in task |

Press **Enter** to add the task. Double-click a task to edit it inline.

## Tech Stack

- [React 18](https://react.dev/) — UI
- [Vite 5](https://vitejs.dev/) — build tool & dev server
- CSS custom properties — theming (no CSS framework)
- `localStorage` — data persistence (no backend required)
