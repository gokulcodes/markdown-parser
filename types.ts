type Pattern = {
  startRegex: RegExp,
  endRegex: RegExp,
  token: string,
  tag: string
}

type Expression = {
  startRegex: RegExp,
  endRegex: RegExp,
  token: string,
  tokenEnd: string,
  tag: string,
  endUrlRegex: RegExp,
  startUrlRegex: RegExp
}

export {Pattern, Expression}