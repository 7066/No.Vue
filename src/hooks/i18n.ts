import { createI18n } from "vue-i18n";
import { Ref, ref, watch } from "vue";

// 默认语言
const alreadyLoadedLocale = new Set(["zh_CN"]);
// 同步加载默认语言
const defaultFiles = import.meta.glob("../modules/*/locale/zh_CN.ts", {
  eager: true,
  import: "default",
});

// 定义翻译源
const messages = {} as {
  [key: string]: {
    [key: string]: object;
  };
};

// 读取默认语言文件
Object.keys(defaultFiles).forEach((url) => {
  const [module, locale] = url
    .replace(/src|modules|\.ts|\.?\/?/g, "")
    .split("locale");

  if (module && locale) {
    if (!messages[locale]) {
      messages[locale] = {};
    }
    messages[locale][module] = defaultFiles[url] as {
      [key: string]: object;
    };
  }
});

const target: Ref<"zh_CN" | "en_US"> = ref("zh_CN");
const i18n = createI18n({
  locale: target.value,
  messages,
});

const n = new Set(["zh_CN", "en_US"]);

watch(target, (k) => {
  if (n.has(k)) {
    // 当前语言未加载
    if (!alreadyLoadedLocale.has(k)) {
      let files;
      switch (k) {
        case "en_US":
          files = import.meta.glob(["../modules/*/locale/en_US.ts"], {
            import: "default",
          });
          break;
      }
      loadLazy(files, k, {});
    } else {
      // @ts-ignore 🤮
      i18n.global.locale.value = k;
    }
  } else {
    throw new Error(`国际化 -${k}- 尚未定义`);
  }
});

export const useLocale = (): typeof target => target;

const loadLazy = (files: any, locale: string, translate: any) => {
  // if (!messages[locale]) {
  //   messages[locale] = {};
  // }
  // let trans = messages[locale] || {};
  const modules: string[] = [];
  Promise.all(
    Object.keys(files).map((url) => {
      const [module] = url
        .replace(/src|modules|\.ts|\.?\/?/g, "")
        .split("locale");

      modules.push(module);

      return files[url]();
    })
  )
    .then((files) => {
      files.forEach((trans, index) => {
        const module = modules[index];
        if (module) {
          translate = Object.assign(translate, {
            [module]: trans,
          });
        }
      });
    })
    .then(() => {
      // 加载语言
      i18n.global.setLocaleMessage(locale, translate);

      alreadyLoadedLocale.add(locale);

      // @ts-ignore 🤮
      i18n.global.locale.value = locale;
    });
};

export default i18n;
