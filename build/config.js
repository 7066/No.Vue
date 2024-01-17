import path from "path";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default (env) => {
  return {
    server: {
      host: true,
      open: true,
      base: "/",
      proxy: {
        "^/api": {
          target: "http://www.google.com",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/posts/, ''),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../src/modules"),
        "#": path.resolve(__dirname, "../src/components"),
        assets: path.resolve(__dirname, "../src/assets"),
        utils: path.resolve(__dirname, "../src/utils"),
      },
      extensions: [".vue", ".ts", ".js", ".json"],
    },
    Csspxtoviewport: postcsspxtoviewport8plugin({
      unitToConvert: "px",
      viewportWidth: 1920,
      selectorBlackList: ["ignore-"],
      exclude: [/node_modules/],
    }),
    VUE: vue(),
    VueI18n: vueI18n({
      runtimeOnly: false,
      include: path.resolve(__dirname, "../src/**/**/locales/**"),
    }),
    AutoImport: AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ["vue", "vue-router"],
      dirs: ["./src/hooks", "./src/modules/**/store.ts"],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          alias: { icon: "ep" },
          prefix: "",
          enabledCollections: ["ep"],
        }),
      ],
      dts: "./.eslintrc-auto-import.d.ts",
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    Components: Components({
      dirs: ["src/components"],
      resolvers: [
        IconsResolver({
          alias: { icon: "ep" },
          prefix: "",
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver(),
      ],
      dts: "./.eslintrc-auto-components.d.ts",
    }),
    Icons: Icons({
      autoInstall: true,
    }),
  };
};
