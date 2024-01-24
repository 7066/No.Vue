import _module from "./build/module.js";
import _component from "./build/component.js";
import _commit from "./build/commit.js";
export default (plop) => {
  plop.setGenerator("module", _module);
  plop.setGenerator("component", _component);
  plop.setGenerator("commit", _commit);
};
