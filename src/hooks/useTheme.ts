/** @主题设置 相关更改 style/variable.css */
import { Ref, ref, watch } from "vue";
const value: Ref<"sunny" | "night"> = ref("sunny");
const themes = new Set(["sunny", "night"]);

watch(value, (k) => {
  if (themes.has(k)) {
    const r = document.documentElement;
    r.className = k;
  } else {
    throw new Error(`主题 -${k}- 尚未定义`);
  }
});

export default (): typeof value => value;
