import { createI18n } from "vue-i18n";
import { Ref, ref, watch } from "vue";

console.log("i18n");

// 翻译源
const messages = {} as {
  [key: string]: {
    [key: string]: object;
  };
};

// a: 当前项目支持的语言类型
const a = new Set(["zh", "en"]);
// b: 当前环境设置的语言类型，默认 zh
const b: Ref<"zh" | "en"> = ref("zh");
// c: 当前页面本地持久化缓存的语言类型 - 保留上一次用户切换的语言
const c = localStorage.getItem("locale");
if (c === "zh" || c === "en") b.value = c;
// d: 当前环境已经加载的语言包
const d = new Set([b.value]);
// 初始化语言包
lm(b.value);

// 实例化 i18n
const i18n = createI18n({
  locale: b.value,
  messages,
});
// 监听语言改变
watch(b, (_) => {
  if (!a.has(_)) {
    ElMessage.warning("国际化尚未实现" + _);
    return;
  }
  // 如果当前语言已经加载 切换语言
  if (d.has(_)) {
    sl(_);
    return;
  }
  // 未加载则异步加载语言包
  lm(_);
});

// 导出 hooks
export const useLocale = (): typeof b => b;
// 导出 i18n
export default i18n;

//////////////////////////////////////////////////////////////////////////////////////////////////////
/** @加载语言包 */
function lm(locale: string, translate = {}) {
  // 异步加载文件
  const files = lf(locale);
  if (!files) return;

  // 获取异步处理状态
  const syncloading = Promise.all(
    // 异步处理
    Object.keys(files).map((url) => {
      // 解析模块名称
      const [module] = url
        .replace(/src|modules|\.json|\.?\/?/g, "")
        .split("locale");

      // 存储读取的文件并返回异步状态
      return files[url]().then((json) => {
        translate = Object.assign(translate, {
          [module]: json,
        });
      });
    })
  );

  // 异步处理结束后, 改变国际化配置
  syncloading.then(() => {
    // 设置源文件
    i18n.global.setLocaleMessage(locale, translate);
    // 切换语言
    sl(locale);
  });
}

/** @切换语言 */
function sl(_: string) {
  i18n.global.locale = _;
  localStorage.setItem("locale", _);
}

/** @异步加载 */
function lf(_: string) {
  switch (_) {
    case "zh":
      return import.meta.glob(["../modules/*/locales/zh.json"], {
        import: "default",
      });
    case "en":
      return import.meta.glob(["../modules/*/locales/en.json"], {
        import: "default",
      });
  }
}
