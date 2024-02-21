import _module from "./.plop/module.js";
import _component from "./.plop/component.js";
import _commit from "./.plop/commit.js";
export default (plop) => {
  plop.setGenerator("commit", _commit);
  plop.setGenerator("module", _module);
  plop.setGenerator("component", _component);
};
