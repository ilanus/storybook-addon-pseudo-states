var isAtRule = function isAtRule(selector) {
  return selector.indexOf("@") === 0;
};

export var splitSelectors = function splitSelectors(selectors) {
  if (isAtRule(selectors)) return [selectors];
  var result = [];
  var parentheses = 0;
  var brackets = 0;
  var selector = "";

  for (var i = 0, len = selectors.length; i < len; i++) {
    var char = selectors[i];

    if (char === "(") {
      parentheses += 1;
    } else if (char === ")") {
      parentheses -= 1;
    } else if (char === "[") {
      brackets += 1;
    } else if (char === "]") {
      brackets -= 1;
    } else if (char === ",") {
      if (!parentheses && !brackets) {
        result.push(selector.trim());
        selector = "";
        continue;
      }
    }

    selector += char;
  }

  result.push(selector.trim());
  return result;
};