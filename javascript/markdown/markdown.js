/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  For more of my solutions, check out my profile: https://exercism.org/profiles/Nostromos
 */

/**
 * First read - lots of duplicated functionality with an unclear and verbose naming convention (parser, parse_, parse__, parse<section>). Most of the functions contain the word `parse` somewhere, which is descriptive but not helpful given the task (parsing markdown);
 * 
 * `isTag()` isn't used, so that's an easy delete.
 * 
 * Structurally, there is one exported function - `parse()` - which calls numerous subfunctions that themselves call other subfunctions. We can likely consolidate quite a bit of that. 
 * 
 * Many functions also take an arg (class) called `markdown` as an argugment which provides three methods (replace, substring, and split) that seem to be duplicative of native JS features. We can use the standard JS methods, simplify, and reduce cognitive burden.
 * EDIT: On further inspection, this does use native language features and `markdown` is the text to parse.
 * 
 * Another issue is that that whether an item is a list or not is passed as a boolean and each function handles it, leading to if/then blocks in each function.
 * 
 * There's a philosophical question around how much to simplify this - having different methods for different markdown elements is useful if you only want to parse for specific things.
 * 
 * My approach will be to break out all the tags into a list. The `wrap` and `parser` functions are useful and generalizable for most of the symbols we need to handle, so we'll keep those. 
 */

function wrap(text, tag) {
  return `<${tag}>${text}</${tag}>`;
}

/* Deleted because its unused */
// function isTag(text, tag) {
//   return text.startsWith(`<${tag}>`);
// }

const symbolList = {
  '_': 'em',
  '__': 'strong',
  '#': 'header',
  '*': 'list',

}

/**
 * We'll keep this. It's useful to have a dedicated tag replacer function
 */
function parser(markdown, delimiter, tag) {
  const pattern = new RegExp(`${delimiter}(.+)${delimiter}`);
  const replacement = `<${tag}>$1</${tag}>`;
  return markdown.replace(pattern, replacement);
}

function parse__(markdown) {
  return parser(markdown, '__', 'strong');
}

function parse_(markdown) {
  return parser(markdown, '_', 'em');
}

function parseText(markdown, list) {
  const parsedText = parse_(parse__(markdown));
  if (list) {
    return parsedText;
  } else {
    return wrap(parsedText, 'p');
  }
}

function parseHeader(markdown, list) {
  let count = 0;
  for (let i = 0; i < markdown.length; i++) {
    if (markdown[i] === '#') {
      count += 1;
    } else {
      break;
    }
  }
  if (count === 0 || count > 6) {
    return [null, list];
  }
  const headerTag = `h${count}`;
  const headerHtml = wrap(markdown.substring(count + 1), headerTag);
  if (list) {
    return [`</ul>${headerHtml}`, false];
  } else {
    return [headerHtml, false];
  }
}

function parseLineItem(markdown, list) {
  if (markdown.startsWith('*')) {
    const innerHtml = wrap(parseText(markdown.substring(2), true), 'li');
    if (list) {
      return [innerHtml, true];
    } else {
      return [`<ul>${innerHtml}`, true];
    }
  }
  return [null, list];
}

function parseParagraph(markdown, list) {
  if (!list) {
    return [parseText(markdown, false), false];
  } else {
    return [`</ul>${parseText(markdown, false)}`, false];
  }
}

function parseLine(markdown, list) {
  let [result, inListAfter] = parseHeader(markdown, list);
  if (result === null) {
    [result, inListAfter] = parseLineItem(markdown, list);
  }
  if (result === null) {
    [result, inListAfter] = parseParagraph(markdown, list);
  }
  if (result === null) {
    throw new Error('Invalid markdown');
  }
  return [result, inListAfter];
}

export function parse(markdown) {
  const lines = markdown.split('\n');
  let result = '';
  let list = false;
  for (let i = 0; i < lines.length; i++) {
    let [lineResult, newList] = parseLine(lines[i], list);
    result += lineResult;
    list = newList;
  }
  if (list) {
    return result + '</ul>';
  } else {
    return result;
  }
}
