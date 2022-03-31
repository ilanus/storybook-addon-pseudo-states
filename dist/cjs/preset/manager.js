"use strict";

var _addons = require("@storybook/addons");

var _constants = require("../constants");

var _PseudoStateTool = require("../PseudoStateTool");

_addons.addons.register(_constants.ADDON_ID, function () {
  _addons.addons.add(_constants.TOOL_ID, {
    type: _addons.types.TOOL,
    title: "CSS pseudo states",
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === "story";
    },
    render: _PseudoStateTool.PseudoStateTool
  });
});