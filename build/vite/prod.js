// import gzip from "vite-plugin-compression";
// import { visualizer } from "rollup-plugin-visualizer";
import {
  server,
  resolve,
  vue,
  AutoImport,
  Components,
  Icons,
  Csspxtoviewport,
} from "./config";

export default () => {
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
    server: server(),
    resolve: resolve(),
    plugins: [
      vue(),
      AutoImport(),
      Components(),
      Icons(),
      // gzip(),
      // visualizer({ open: false }),
    ],
    css: {
      postcss: {
        plugins: [Csspxtoviewport],
      },
    },
  };
};
