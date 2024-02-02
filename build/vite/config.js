import path from "path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import _vue from "@vitejs/plugin-vue";
import _AutoImport from "unplugin-auto-import/vite";
import _Components from "unplugin-vue-components/vite";
import _Icons from "unplugin-icons/vite";

export const vue = () => _vue();

export const server = () => ({
  host: true,
  open: true,
  base: "/",
  proxy: {
    /** @代理 https://api.oioweb.cn/ */
    "^/oioweb": {
      target: "https://api.oioweb.cn/api",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/oioweb/, ""),
    },
  },
});

export const resolve = () => ({
  alias: {
    "@": path.resolve(__dirname, "../../src/modules"),
    "~": path.resolve(__dirname, "../../src/assets"),
    "#": path.resolve(__dirname, "../../src/utils"),
  },
  extensions: [".vue", ".ts", ".js", ".json"],
});

export const AutoImport = () =>
  _AutoImport({
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    imports: ["vue", "vue-router"],
    dirs: [
      "./src/hooks" /**               */ /** 个性化支持 */,
      "./src/modules/**/store.ts" /** */ /** 模块Store */,
    ],
    dts: "./.eslintrc-auto-imports.d.ts",
    resolvers: [ElementPlusResolver(), IconsResolver()],
    eslintrc: {
      enabled: true,
      filepath: "./.eslintrc-auto-import.json",
      globalsPropValue: true,
    },
  });

export const Components = () =>
  _Components({
    resolvers: [
      ElementPlusResolver(),
      IconsResolver({
        prefix: false,
        enabledCollections: ["ep"],
        alias: { icon: "ep" },
      }),
    ],
    dts: "./.eslintrc-auto-components.d.ts",
  });

export const Icons = () =>
  _Icons({
    autoInstall: true,
  });
