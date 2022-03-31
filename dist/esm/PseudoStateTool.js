function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useMemo } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton, WithTooltip, TooltipLinkList } from "@storybook/components";
import { styled, color } from "@storybook/theming";
import { PSEUDO_STATES } from "./constants";
var LinkTitle = styled.span(function (_ref) {
  var active = _ref.active;
  return {
    color: active ? color.secondary : "inherit"
  };
});
var LinkIcon = styled(Icons)(function (_ref2) {
  var active = _ref2.active;
  return {
    opacity: active ? 1 : 0,
    path: {
      fill: active ? color.secondary : "inherit"
    }
  };
});
var options = Object.keys(PSEUDO_STATES).sort();
export var PseudoStateTool = function PseudoStateTool() {
  var _useGlobals = useGlobals(),
      _useGlobals2 = _slicedToArray(_useGlobals, 2),
      pseudo = _useGlobals2[0].pseudo,
      updateGlobals = _useGlobals2[1];

  var hasSelection = useMemo(function () {
    return !!pseudo && Object.values(pseudo).includes(true);
  }, [pseudo]);
  var getValue = useCallback(function (option) {
    return pseudo ? pseudo[option] : false;
  }, [pseudo]);
  var toggleOption = useCallback(function (option) {
    return function () {
      return updateGlobals({
        pseudo: _objectSpread(_objectSpread({}, pseudo), {}, _defineProperty({}, option, !getValue(option)))
      });
    };
  }, [pseudo, getValue]);
  return /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "top",
    trigger: "click",
    tooltip: function tooltip() {
      return /*#__PURE__*/React.createElement(TooltipLinkList, {
        links: options.map(function (option) {
          return {
            id: option,
            title: /*#__PURE__*/React.createElement(LinkTitle, {
              active: getValue(option)
            }, ":", PSEUDO_STATES[option]),
            right: /*#__PURE__*/React.createElement(LinkIcon, {
              icon: "check",
              width: 12,
              height: 12,
              active: getValue(option)
            }),
            onClick: toggleOption(option),
            active: getValue(option)
          };
        })
      });
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    key: "pseudo-state",
    title: "Select CSS pseudo states",
    active: hasSelection
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "button"
  })));
};