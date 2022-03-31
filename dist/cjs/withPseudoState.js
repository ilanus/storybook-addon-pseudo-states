"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPseudoState = void 0;

var _addons = require("@storybook/addons");

var _coreEvents = require("@storybook/core-events");

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var pseudoStates = Object.values(_constants.PSEUDO_STATES);
var matchOne = new RegExp(":(".concat(pseudoStates.join("|"), ")"));
var matchAll = new RegExp(":(".concat(pseudoStates.join("|"), ")"), "g"); // Drops any existing pseudo state classnames that carried over from a previously viewed story
// before adding the new classnames. We do this the old-fashioned way, for IE compatibility.

var applyClasses = function applyClasses(element, classnames) {
  var _element$className$sp;

  element.className = (_element$className$sp = element.className.split(" ").filter(function (classname) {
    return classname && classname.indexOf("pseudo-") !== 0;
  })).concat.apply(_element$className$sp, _toConsumableArray(classnames)).join(" ");
};

var applyParameter = function applyParameter(element, parameter) {
  return applyClasses(element, Object.entries(parameter || {}).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        _ = _ref2[0],
        value = _ref2[1];

    return value;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        key = _ref4[0];

    return "pseudo-".concat(_constants.PSEUDO_STATES[key]);
  }));
}; // Traverses ancestry to collect relevant pseudo classnames, and applies them to the shadow host.
// Shadow DOM can only access classes on its host. Traversing is needed to mimic the CSS cascade.


var updateShadowHost = function updateShadowHost(shadowHost) {
  var classnames = new Set();

  for (var element = shadowHost.parentElement; element; element = element.parentElement) {
    if (!element.className) continue;
    element.className.split(" ").filter(function (classname) {
      return classname.indexOf("pseudo-") === 0;
    }).forEach(function (classname) {
      return classnames.add(classname);
    });
  }

  applyClasses(shadowHost, classnames);
}; // Keep track of attached shadow host elements for the current story


var shadowHosts = new Set();

_addons.addons.getChannel().on(_coreEvents.STORY_CHANGED, function () {
  return shadowHosts.clear();
});

var isAtRule = function isAtRule(selector) {
  return selector.indexOf("@") === 0;
};

var splitSelectors = function splitSelectors(selectors) {
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
}; // Global decorator that rewrites stylesheets and applies classnames to render pseudo styles


var withPseudoState = function withPseudoState(StoryFn, _ref5) {
  var viewMode = _ref5.viewMode,
      parameters = _ref5.parameters,
      id = _ref5.id;
  var parameter = parameters.pseudo;

  var _useGlobals = (0, _addons.useGlobals)(),
      _useGlobals2 = _slicedToArray(_useGlobals, 2),
      globals = _useGlobals2[0].pseudo,
      updateGlobals = _useGlobals2[1]; // Sync parameter to globals, used by the toolbar (only in canvas as this
  // doesn't make sense for docs because many stories are displayed at once)


  (0, _addons.useEffect)(function () {
    if (parameter !== globals && viewMode === "story") updateGlobals({
      pseudo: parameter
    });
  }, [parameter, viewMode]); // Convert selected states to classnames and apply them to the story root element.
  // Then update each shadow host to redetermine its own pseudo classnames.

  (0, _addons.useEffect)(function () {
    var timeout = setTimeout(function () {
      var element = document.getElementById(viewMode === "docs" ? "story--".concat(id) : "root");
      applyParameter(element, parameter);
      shadowHosts.forEach(updateShadowHost);
    }, 0);
    return function () {
      return clearTimeout(timeout);
    };
  }, [parameter, viewMode]);
  return StoryFn();
};

exports.withPseudoState = withPseudoState;
var warnings = new Set();

var warnOnce = function warnOnce(message) {
  if (warnings.has(message)) return; // eslint-disable-next-line no-console

  console.warn(message);
  warnings.add(message);
}; // Rewrite CSS rules for pseudo-states on all stylesheets to add an alternative selector


function rewriteStyleSheets(shadowRoot) {
  var _shadowRoot$adoptedSt;

  var styleSheets = shadowRoot ? shadowRoot.styleSheets : document.styleSheets;
  if (shadowRoot !== null && shadowRoot !== void 0 && (_shadowRoot$adoptedSt = shadowRoot.adoptedStyleSheets) !== null && _shadowRoot$adoptedSt !== void 0 && _shadowRoot$adoptedSt.length) styleSheets = shadowRoot.adoptedStyleSheets;

  var _iterator = _createForOfIteratorHelper(styleSheets),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var sheet = _step.value;

      if (sheet._pseudoStatesRewritten) {
        continue;
      } else {
        sheet._pseudoStatesRewritten = true;
      }

      try {
        var index = 0;

        var _iterator2 = _createForOfIteratorHelper(sheet.cssRules),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _step2.value,
                cssText = _step2$value.cssText,
                selectorText = _step2$value.selectorText;

            if (matchOne.test(selectorText)) {
              var selectors = splitSelectors(selectorText);
              var newRule = cssText.replace(selectorText, selectors.flatMap(function (selector) {
                if (selector.includes(".pseudo-")) return [];
                var states = [];
                var plainSelector = selector.replace(matchAll, function (_, state) {
                  states.push(state);
                  return "";
                });
                var stateSelector;

                if (selector.startsWith(":host(") || selector.startsWith("::slotted(")) {
                  stateSelector = states.reduce(function (acc, state) {
                    return acc.replaceAll(":".concat(state), ".pseudo-".concat(state));
                  }, selector);
                } else if (shadowRoot) {
                  stateSelector = ":host(".concat(states.map(function (s) {
                    return ".pseudo-".concat(s);
                  }).join(""), ") ").concat(plainSelector);
                } else {
                  stateSelector = "".concat(states.map(function (s) {
                    return ".pseudo-".concat(s);
                  }).join(""), " ").concat(plainSelector);
                }

                return [selector, stateSelector];
              }).join(", "));
              sheet.deleteRule(index);
              sheet.insertRule(newRule, index);
              if (shadowRoot) shadowHosts.add(shadowRoot.host);
            }

            index++;

            if (index > 1000) {
              warnOnce("Reached maximum of 1000 pseudo selectors per sheet, skipping the rest.");
              break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } catch (e) {
        if (e.toString().includes("cssRules")) {
          warnOnce("Can't access cssRules, likely due to CORS restrictions: ".concat(sheet.href));
        } else {
          // eslint-disable-next-line no-console
          console.error(e, sheet.href);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} // Reinitialize CSS enhancements every time the story changes


_addons.addons.getChannel().on(_coreEvents.STORY_RENDERED, function () {
  return rewriteStyleSheets();
}); // Reinitialize CSS enhancements every time a docs page is rendered


_addons.addons.getChannel().on(_coreEvents.DOCS_RENDERED, function () {
  return rewriteStyleSheets();
}); // IE doesn't support shadow DOM


if (Element.prototype.attachShadow) {
  // Monkeypatch the attachShadow method so we can handle pseudo styles inside shadow DOM
  Element.prototype._attachShadow = Element.prototype.attachShadow;

  Element.prototype.attachShadow = function attachShadow(init) {
    // Force "open" mode, so we can access the shadowRoot
    var shadowRoot = this._attachShadow(_objectSpread(_objectSpread({}, init), {}, {
      mode: "open"
    })); // Wait for it to render and apply its styles before rewriting them


    requestAnimationFrame(function () {
      rewriteStyleSheets(shadowRoot);
      updateShadowHost(shadowRoot.host);
    });
    return shadowRoot;
  };
}