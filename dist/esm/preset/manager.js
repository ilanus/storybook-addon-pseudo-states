import { addons, types } from "@storybook/addons";
import { ADDON_ID, TOOL_ID } from "../constants";
import { PseudoStateTool } from "../PseudoStateTool";
addons.register(ADDON_ID, function () {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "CSS pseudo states",
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === "story";
    },
    render: PseudoStateTool
  });
});