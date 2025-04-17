export function checkStartMatch(text: string, pattern : RegExp) : boolean {
    const regex = new RegExp(pattern);
    return regex.test(text);
}

export function checkEndMatch(text: string, pattern: RegExp): number {
    const regex = new RegExp(pattern);
    if (!regex.test(text)) return -1;
    return text.search(pattern);
}

function getTabCnt(line : string) {
  let n = line.length;
  let i = 0; 
  while (i < n && line[i] === ' ') i++;
  return i;
}

export function listRenderer(lines: Array<string>, index: number, tabCnt: number, wordParser : Function, listType: string): string {
  if (index >= lines.length) {
    return '';
  }
  
  let currTabCnt = getTabCnt(lines[index]);
  if (currTabCnt > tabCnt) {
    
    // new nesting is needed here
    return `<${listType}>` + `<li>` + wordParser(lines[index].substring(currTabCnt + 2)) + listRenderer(lines, index + 1, currTabCnt, wordParser, listType) + "</li>" + `</${listType}>`

  }

  if (currTabCnt === tabCnt) {
    // add a new list in same level

    return "</li>" + "<li>" + wordParser(lines[index].substring(currTabCnt + 2)) + listRenderer(lines, index + 1, currTabCnt, wordParser, listType);

  }

  return "</li>" + `</${listType}>` + listRenderer(lines, index, currTabCnt, wordParser, listType);
}

export function tableRenderer(lines: Array<string>, wordParser:Function): string {
  
  let rows = [], pointer = 0;
  while (pointer < lines.length) {
    let line = lines[pointer];
    let column = line.split("|");
    if (column.length > 1) {
      column.shift();
      column.pop();
    }
    rows.push(column);
    pointer++;
  }

  if (rows.length > 1) {
    rows.splice(1, 1);
  }

  return `<table>
    ${rows.map(
            (row, ind) =>
              `<tr>${row
                .map((col) =>
                  ind === 0
                    ? `<th>${wordParser(col)}</th>`
                    : `<td>${wordParser(col)}</td>`
                )
                .join("")}</tr>`
          )
    .join("")}
          </table>`
}

export function codeBlockRenderer(lines: Array<string>) {
  let fullCode = lines.join('\n');
  return "<pre>" + fullCode + "</pre>"
}