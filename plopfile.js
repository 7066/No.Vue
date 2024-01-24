import _module from "./build/plop/module.js";
import _component from "./build/plop/component.js";
import _commit from "./build/plop/commit.js";
export default (plop) => {
  plop.setGenerator("commit", _commit);
  plop.setGenerator("module", _module);
  plop.setGenerator("component", _component);
};
