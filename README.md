## 📦 Markdown Parser

A lightweight, modular Markdown-to-HTML parser that supports all essential markdown features—including headings, lists, tables, blockquotes, code blocks, multimedia embedding, and rich word formatting. 

### NPM Package

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

### ⚙️ Usage

```
import markdown from "markdown-parser"; // import package

const markdownContent = "# Markdown Parser";

const html = markdown.parse(markdownContent);

console.log(html); // <h1>Markdown Parser</h1>
```

### 🧩 Ideal For

- Static site generators
- Blog engines
- Custom content renderers
- Markdown preview tools
- Educational tools or online editors
