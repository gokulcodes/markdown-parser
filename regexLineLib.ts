const h1Regex = Object.freeze({
  token: "# ",
  tag: 'h1',
  startRegex: /^\#\ /,
  endRegex: /\n/d
})

const h2Regex = Object.freeze({
  token: "## ",
  tag: 'h1',
  startRegex: /^\#\#\ /,
  endRegex: /\n/d
})

const h3Regex = Object.freeze({
  token: "### ",
  tag: 'h3',
  startRegex: /^\#\#\#\ /,
  endRegex: /\n/d
})

const h4Regex = Object.freeze({
  token: "#### ",
  tag: 'h4',
  startRegex: /^\#\#\#\#\ /,
  endRegex: /\n/d
})

const h5Regex = Object.freeze({
  token: "##### ",
  tag: 'h5',
  startRegex: /^\#\#\#\#\#\ /,
  endRegex: /\n/d
})

const h6Regex = Object.freeze({
  token: "###### ",
  tag: 'h6',
  startRegex: /^\#\#\#\#\#\#\ /,
  endRegex: /\n/d
})

const unorderedListRegex = Object.freeze({
  token: "* ",
  tag: 'ul',
  startRegex: /^\* |\- /,
  endRegex: /\n/d
})

const orderedListRegex = Object.freeze({
  token: "1. ",
  tag: 'ol',
  startRegex: /^[1-9][0-9]{0,2}\./,
  endRegex: /\n/d
})

const tableRegex = Object.freeze({
  token: "|",
  tag: '',
  startRegex: /^\|/,
  endRegex: /\n/d
})

const codeBlockRegex = Object.freeze({
  token: "```",
  tag: 'pre',
  startRegex: /^\`\`\`/,
  endRegex: /\`\`\`/d
})

const singleStarts = [
    h6Regex,
    h5Regex,
    h4Regex,
    h3Regex,
    h2Regex,
    h1Regex,
]

export {
    singleStarts,
    unorderedListRegex,
  orderedListRegex,
    codeBlockRegex,
    tableRegex
}