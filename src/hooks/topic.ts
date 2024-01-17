import { Ref, ref, watch } from "vue";
const target: Ref<"sunny" | "night"> = ref("sunny");
const n = new Set(["sunny", "night"]);

watch(target, (k) => {
  if (n.has(k)) {
    const r = document.documentElement;
    r.className = k;
  } else {
    throw new Error(`主题 -${k}- 尚未定义`);
  }
});
export const useTopic = (): typeof target => target;
