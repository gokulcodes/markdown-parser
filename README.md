## 📦 Markdown Parser

A lightweight, modular Markdown-to-HTML parser that supports all essential markdown features—including headings, lists, tables, blockquotes, code blocks, multimedia embedding, and rich word formatting. Built with extensibility and security in mind, this parser converts clean, human-readable markdown into sanitized, structured HTML ready for the web.

NPM Package
<a href="https://www.npmjs.com/package/@gokulvaradan/markdown-parser"><img alt="npm" src="https://img.shields.io/badge/NPM-MarkdownParser-darkgreen?style=flat-rounded&logo=npm"></a>

### ✅ Features

- ✔️ Headings (`#`, `##`, … `######`)
- ✔️ Paragraphs and spans
- ✔️ Ordered & Unordered Lists
- ✔️ Inline & Multiline Code Blocks
- ✔️ Blockquotes
- ✔️ Tables with auto-alignment
- ✔️ Images & Videos
- ✔️ Horizontal Rules (`---`)
- ✔️ Word Formatting:
  - **Bold**, *Italic*, ~~Strikethrough~~, <u>Underline</u>, ==Highlight==, [Links](https://example.com)

### ⚙️ Architecture Overview

Each markdown feature is parsed by a dedicated parser module:

| Module               | Responsibility                                           |
|----------------------|----------------------------------------------------------|
| `TitleParser`        | Converts heading syntax to `<h1>`-`<h6>` tags             |
| `DescriptionParser`  | Wraps content in `<p>` tags                              |
| `ListParser`         | Parses numbered or bulleted lists with indentation       |
| `CodeParser`         | Handles single-line and block-level code blocks          |
| `BlockQuotesParser`  | Converts `>` lines into styled blockquotes               |
| `TableParser`        | Detects and renders markdown tables                      |
| `MultiMediaParser`   | Parses `![]()` to render images/videos                   |
| `HorizontalLineParser` | Renders horizontal rules from `---` lines             |
| `WordParser`         | Applies inline formatting (bold, italic, etc.)           |
| `Digester`           | Orchestrates the parsing flow for entire content         |

### 🛡️ Optimized for Safety

- Built-in **sanitization** to prevent XSS attacks and ensure clean HTML output.
- Designed to work seamlessly in browsers and Node.js environments.

### 🧩 Ideal For

- Static site generators
- Blog engines
- Custom content renderers
- Markdown preview tools
- Educational tools or online editors
