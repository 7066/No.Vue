import { createI18n } from "vue-i18n";
import { ref, watch } from "vue";

// 当前环境设置的语言类型
const I18N = ref("");

// 加载过的语言
const LOADED = new Set();

// LOCALES: 当前项目支持的语言类型
const LOCALES = new Set(["zh", "en"]);

// 翻译源
const messages = {} as {
  [key: string]: {
    [key: string]: object;
  };
};

// 实例化 i18n
const i18n = createI18n({
  locale: I18N.value,
  messages,
});

/** @初始化 */
(() => {
  const _Locale = localStorage.getItem("LOCALE") || "zh";
  if (_Locale === "zh" || _Locale === "en") I18N.value = _Locale;
})();

// 监听语言改变
watch(
  I18N,
  (_) => {
    if (LOCALES.has(_)) {
      // 未加载则异步加载语言包
      LOAD_LOCALE(_);
    } else ElMessage.warning("国际化尚未实现" + _);
  },
  {
    immediate: true,
  },
);

// 导出 hooks
export const useLocale = (): typeof I18N => I18N;
// 导出 i18n
export default i18n;

/** @加载语言包 */
function LOAD_LOCALE(lng: string) {
  // 如果当前语言已经加载 切换语言
  if (LOADED.has(lng)) {
    i18n.global.locale = lng;
    localStorage.setItem("LOCALE", lng);
  } else {
    LOADED.add(lng);
    // 异步加载文件
    const files = LOAD_JSON(lng);
    if (!files) return;

    // 获取异步处理状态
    Promise.all(
      // 异步处理
      Object.keys(files).map((url) => {
        // 解析模块名称
        const [module] = url
          .replace(/src|modules|\.json|\.?\/?/g, "")
          .split("locale");

        // 存储读取的文件并返回异步状态
        return files[url]().then((data) => {
          return {
            [module]: data,
          };
        });
      }),
    ).then((resp) => {
      const translate = resp.reduce((result: any, data: any) => {
        return Object.assign(result, data);
      }, {});

      // 设置源文件
      i18n.global.setLocaleMessage(lng, translate);
      // 切换语言
      i18n.global.locale = lng;
      localStorage.setItem("LOCALE", lng);
    });
  }
}

/** @异步加载 */
function LOAD_JSON(lng: string) {
  switch (lng) {
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
