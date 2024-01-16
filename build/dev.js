import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default () => {
  return {
    /** @服务 */
    server: {
      host: true,
      open: true,
      base: "/",
      // proxy: {
      //   "^/api": {
      //     target: "http://www.google.com",
      //     changeOrigin: true,
      //     // rewrite: (path) => path.replace(/^\/posts/, ''),
      //   },
      // },
    },
    /** @路径别名 */
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../src/modules"),
        assets: path.resolve(__dirname, "../src/assets"),
      },
      extensions: [".vue", ".ts", ".js", ".json"],
    },
    /** @插件 */
    plugins: [
      vue(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: ["vue", "vue-router"],
        dirs: ["./src/hooks"],
        dts: "./.eslintrc-auto-imports.d.ts",
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            /** @图标前缀 默认 i，false 为空 */
            prefix: false,
            /** @图标源 https://icon-sets.iconify.design/ */
            enabledCollections: [
              "ep", // element-plus 图标库, https://icon-sets.iconify.design/ep/ 话说 ep 太难看
              "ant-design", // ant-design 图标库, https://icon-sets.iconify.design/ant-design/
            ],
            /** @设置别名 ep-loading -> icon-loading */
            alias: {
              icon: "ep",
            },
          }),
        ],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
      }),
      Components({
        dirs: ["src/components"],
        extensions: ["vue"],
        resolvers: [
          ElementPlusResolver(),
          // 图标库 https://icon-sets.iconify.design/
          IconsResolver({
            /** @图标前缀 默认 i，false 为空 */
            prefix: false,
            /** @图标源 https://icon-sets.iconify.design/ */
            enabledCollections: [
              "ep", // element-plus 图标库, https://icon-sets.iconify.design/ep/ 话说 ep 太难看
              "ant-design", // ant-design 图标库, https://icon-sets.iconify.design/ant-design/
            ],
            /** @设置别名 ep-loading -> icon-loading */
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
  };
};
