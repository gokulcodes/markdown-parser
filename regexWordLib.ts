const boldRegex = Object.freeze({
  token: "**",
  tag: 'b',
  startRegex: /^\*\*/,
  endRegex: /\*\*/d
})

const italicRegex = Object.freeze({
  token: "*",
  tag: 'em',
  startRegex: /^\*/,
  endRegex: /\*/d
})

const underlineRegex = Object.freeze({
  token: "_",
  tag: 'u',
  startRegex: /^\_/,
  endRegex: /\_/d
})

const strikeRegex = Object.freeze({
  token: "~~",
  tag: 'strike',
  startRegex: /^\~\~/,
  endRegex: /\~\~/d
})

const highlightRegex = Object.freeze({
  token: "==",
  tag: 'mark',
  startRegex: /^\=\=/,
  endRegex: /\=\=/d
})

const blockQuoteRegex = Object.freeze({
  token: ">",
  tag: 'blockquote',
  startRegex: /^\>/,
  endRegex: /\n/d
})


const codeRegex = Object.freeze({
  token: "`",
  tag: 'code',
  startRegex: /^\`/,
  endRegex: /\`/d
})

const codeBlockRegex = Object.freeze({
  token: "```",
  tag: 'code',
  startRegex: /^\`\`\`/,
  endRegex: /\`\`\`/d
})

const patterns = [
  boldRegex,
  italicRegex,
  underlineRegex,
  strikeRegex,
  highlightRegex,
  codeBlockRegex,
  codeRegex,
  blockQuoteRegex
]

const urlRegex = Object.freeze({
  token: "[",
  tokenEnd: ')',
  tag: 'a',
  startRegex: /^\[/,
  endRegex: /\]/d,
  startUrlRegex: /^\(/,
  endUrlRegex: /\)/d
})

const imgRegex = Object.freeze({
  token: "![",
  tokenEnd: ')',
  tag: 'img',
  startRegex: /^\!\[/,
  endRegex: /\]/d,
  startUrlRegex: /^\(/,
  endUrlRegex: /\)/d
})
const expressions = [
  urlRegex,
  imgRegex
]

export {patterns, expressions}
