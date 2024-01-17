import gzip from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import merge from "./config";

export default ({ mode }) => {
  const {
    server,
    resolve,
    Csspxtoviewport,
    VUE,
    VueI18n,
    AutoImport,
    Components,
    Icons,
  } = merge({ mode });
  return {
    base: "./",
    build: {
      chunkSizeWarningLimit: 100,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          comments: true,
          // manualChunks: (code) => {
          //   if (code.includes("@vue")) {
          //     return "vue";
          //   }
          //   if (code.includes("lodash")) {
          //     return "lodash";
          //   }
          //   if (code.includes("lodash-es")) {
          //     return "lodash";
          //   }
          //   return "vendor";
          // },
        },
      },
    },
    server,
    resolve,
    plugins: [
      VUE,
      VueI18n,
      AutoImport,
      Components,
      gzip(),
      visualizer({ open: false }),
      Icons,
    ],
    css: {
      postcss: {
        plugins: [Csspxtoviewport],
      },
    },
  };
};
