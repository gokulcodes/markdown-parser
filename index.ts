import { patterns, expressions } from './regexWordLib';
import { orderedListRegex, singleStarts, tableRegex, unorderedListRegex  } from './regexLineLib';
import { Pattern, Expression } from "./types"
import { checkEndMatch, checkStartMatch, listRenderer, tableRenderer } from './utils'

function checkLineStart(content : string) {
  let matchedToken: Pattern | undefined = singleStarts.find((token) => checkStartMatch(content, token.startRegex));
  if (!matchedToken) {
    return {isEndHalfValid: -1, matchedToken: undefined, endHalf: ''};
  }
  let tokenLen = matchedToken?.token?.length;
  let endHalf = content.substring(tokenLen)
  return {isEndHalfValid: content.length, matchedToken, endHalf}
}

function checkPatternMatch(content : string) {
  let matchedToken: Pattern | undefined = patterns.find((token) => checkStartMatch(content, token.startRegex));
  if (!matchedToken) {
    return {isEndHalfValid: -1, matchedToken: undefined, endHalf: ''};
  }
  let tokenLen = matchedToken?.token?.length;
  let endHalf = content.substring(tokenLen), isEndHalfValid = content.length;
  if (matchedToken.endRegex) {
    isEndHalfValid = checkEndMatch(endHalf, matchedToken.endRegex)
  }
  return {isEndHalfValid, matchedToken, endHalf}
}

function checkExpressionMatch(content : string) {
  let matchedToken: Expression | undefined = expressions.find((token) => checkStartMatch(content, token.startRegex));
  if (!matchedToken) {
    return { title: -1, url: -1, urlTitle: -1, isUrlValid: -1, tag: -1, token: '' };
  }
  
  let tokenLen = matchedToken?.token?.length, tokenEndLen = matchedToken.tokenEnd.length;
  let titleHalf = content.substring(tokenLen)
  let isTitleEndValid = checkEndMatch(titleHalf, matchedToken.endRegex)
  if (isTitleEndValid == -1) {
    return { title: -1, url: -1, urlTitle: -1, isUrlValid: -1, tag: matchedToken.tag, token: matchedToken.token }
  }
  
  let title = titleHalf.substring(0, isTitleEndValid), url = '',urlTitle =''
  console.log(title)
  
  let secondSegment = titleHalf.substring(title.length + tokenEndLen);
  console.log(content, matchedToken, isTitleEndValid, secondSegment)
  if (checkStartMatch(secondSegment, matchedToken.startUrlRegex)) {
    
    let urlHalf = secondSegment.substring(tokenEndLen)
    let isUrlValid = checkEndMatch(urlHalf, matchedToken.endUrlRegex)
    if (isUrlValid === -1) {
      return { title: -1, url: -1, urlTitle: -1, isUrlValid: -1, tag: matchedToken.tag, token: matchedToken.token }
    }

    url = urlHalf.substring(0, isUrlValid)

    urlTitle = url?.split(' ')?.[1];
    if (title && url) {
      return {
        title, url: url?.split(' ')?.[0], urlTitle, isUrlValid : isUrlValid + title.length + tokenLen + 1 , tag: matchedToken.tag, token: matchedToken.token
      }
    }
  }
  
  return { title: -1, url: -1, urlTitle: -1, isUrlValid: -1, tag: matchedToken.tag, token: matchedToken.token }

}

function wordParser(content: string) : string {
  let response : string = "";
  let n : number = content.length, pointer = 0;

  while(pointer < n) {
    let remainingStr = content.substring(pointer);

    let { isEndHalfValid, matchedToken, endHalf } = checkPatternMatch(remainingStr)
    if (isEndHalfValid !== -1 && matchedToken && endHalf) {
      let tokenLen = matchedToken?.token?.length;
      let endIndex = isEndHalfValid;
      response += `<${matchedToken.tag}>${wordParser(endHalf.substring(0, endIndex))}</${matchedToken.tag}>`;
      pointer = pointer + endIndex + (2 * tokenLen);
      continue;
    }

    let { url, title, urlTitle, tag, isUrlValid  } = checkExpressionMatch(remainingStr)
    if (url !== -1 && title !== -1) {
      if (tag == 'a') {
        response += `<${tag} ${urlTitle ? `title='${urlTitle}'` : ''}  href='${url}'>${title}</${tag}>`;
      } else {
        response += `<${tag} alt='${title}' ${urlTitle ? `title='${urlTitle}'` : ''} src='${url}' />`;
      }
      pointer = pointer + (isUrlValid + 2);
      continue;
    } 

    response += content[pointer];
    pointer++;
  }

  return response;
}

function Digester(content : string) : string {
  let lines = content.split("\n");

  let response : Array<string> = [],
    n = lines.length, pointer = 0;
  while (pointer < n) {
    
    let remainingStr = lines[pointer];
    let { isEndHalfValid, matchedToken, endHalf } = checkLineStart(remainingStr)

    if (remainingStr === '---') {
      response.push('<hr />')
      pointer++;
      continue;
    }

    if (isEndHalfValid !== -1 && matchedToken && endHalf) {
      let endIndex = isEndHalfValid;
      response.push(`<${matchedToken.tag}>${wordParser(endHalf.substring(0, endIndex))}</${matchedToken.tag}>`);
      pointer++;
      continue;
    }

    // Unordered & Ordered List 
    if (checkStartMatch(lines[pointer], unorderedListRegex.startRegex)) {
      
      // ul
      let group = [];
      let lineIndex = pointer;
      while (checkStartMatch(lines[lineIndex].trim(), unorderedListRegex.startRegex)) {
        group.push(lines[lineIndex])
        lineIndex++;
        if (lineIndex == n) break;
      }

      pointer = lineIndex - 1;
      response.push(listRenderer(group, 0, -1, wordParser, 'ul'))

    } else if (checkStartMatch(lines[pointer], orderedListRegex.startRegex)) {

      // ol
      let group = [];
      let lineIndex = pointer;
      while (checkStartMatch(lines[lineIndex].trim(), orderedListRegex.startRegex)) {
        group.push(lines[lineIndex])
        lineIndex++;
        if (lineIndex == n) break;
      }

      pointer = lineIndex - 1;
      response.push(listRenderer(group, 0, -1, wordParser, 'ol'))

    } else if (checkStartMatch(lines[pointer], tableRegex.startRegex)) {
      
      let group = [];
      let lineIndex = pointer;
      while (checkStartMatch(lines[lineIndex].trim(), tableRegex.startRegex)) {
        group.push(lines[lineIndex])
        lineIndex++;
        if (lineIndex == n) break;
      }

      pointer = lineIndex;

      response.push(tableRenderer(group, wordParser));

    } else if (lines[pointer].length) {
      response.push(`<p>${wordParser(lines[pointer])}</p>`);
    } else {
      response.push("<div />")
    }

    pointer++
  }

  return response.join('\n')
}

// const res = Digester(
//   `
// ```
// javascript
// // Sample JavaScript function\
// function greet(name) {\
//   return `Hello, ${name}! 👋`;\
// }\
// console.log(greet('sdfasdfdf'));\
// ```"
// )

// console.log(res)

export {
  Digester,
  wordParser
}