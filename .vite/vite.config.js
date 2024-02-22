import path from "path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import _vue from "@vitejs/plugin-vue";
import _AutoImport from "unplugin-auto-import/vite";
import _Components from "unplugin-vue-components/vite";
import _Icons from "unplugin-icons/vite";
import _Csspxtoviewport from "postcss-px-to-viewport-8-plugin";
export const vue = () => _vue();

export const server = (env) => ({
  host: true,
  open: true,
  base: "/",
  proxy: {
    /** @代理 */
    "^/api": {
      target: env.VITE_PROXY,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
});

export const resolve = () => ({
  alias: {
    "@": path.resolve(__dirname, "../src/modules"),
    "~": path.resolve(__dirname, "../src/assets"),
    "#": path.resolve(__dirname, "../src/utils"),
    constant: path.resolve(__dirname, "../src/constant"),
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
    dts: "@types/auto-imports.d.ts",
    resolvers: [ElementPlusResolver(), IconsResolver()],
    eslintrc: {
      enabled: true,
      filepath: "@types/auto-imports.json",
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
    dts: "@types/auto-components.d.ts",
  });

export const Icons = () =>
  _Icons({
    autoInstall: true,
  });

export const Csspxtoviewport = () =>
  _Csspxtoviewport({
    unitToConvert: "px",
    viewportWidth: (file) => {
      let num = 1920;
      if (file.indexOf("m_") !== -1) {
        num = 375;
      }
      return num;
    },
    unitPrecision: 5, // 单位转换后保留的精度
    propList: ["*"], // 能转化为vw的属性列表
    viewportUnit: "vw", // 希望使用的视口单位
    fontViewportUnit: "vw", // 字体使用的视口单位
    selectorBlackList: ["ignore"], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
    minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
    mediaQuery: true, // 媒体查询里的单位是否需要转换单位
    replace: true, //  是否直接更换属性值，而不添加备用属性
    exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
    include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
    landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
    landscapeUnit: "vw", // 横屏时使用的单位
    landscapeWidth: 1024, // 横屏时使用的视口宽度
  });
