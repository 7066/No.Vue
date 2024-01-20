import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
export default defineConfig({
  server: {
    host: true,
    open: true,
    // port: 5176,
    proxy: {
      /** @代理 https://api.oioweb.cn/ */
      "^/oioweb": {
        target: "https://api.oioweb.cn/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oioweb/, ""),
      },
    },
  },
  base: "./",
  // 路径别名, 记得同步到 tsconfig.json
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/modules"),
      "#": path.resolve(__dirname, "./src/utils"),
      "~": path.resolve(__dirname, "./src/assets"),
    },
    extensions: [".vue", ".ts", ".js", ".json"],
  },
  plugins: [
    vue(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        "vue",
        "vue-router",
        {
          axios: [["default", "axios"]],
        },
      ],
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
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          // 图标前缀 默认 - i,false - 空
          prefix: false,
          // https://icon-sets.iconify.design
          enabledCollections: [
            "ep", // "ant-design",
          ],
          // 别名
          alias: {
            icon: "ep",
          },
        }),
      ],
      dts: "./.eslintrc-auto-components.d.ts",
    }),
    Icons({
      autoInstall: true,
    }),
  ],
});
