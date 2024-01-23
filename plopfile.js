import _module from "./plop-templates/module.js";
import _component from "./plop-templates/component.js";
import _commit from "./plop-templates/commit.js";
export default (plop) => {
  plop.setGenerator("module", _module);
  plop.setGenerator("component", _component);
  plop.setGenerator("commit", _commit);
};
