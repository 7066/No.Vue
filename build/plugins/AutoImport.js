import AutoImport from "unplugin-auto-import/vite";
export default () =>
  AutoImport({
    // targets to transform
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],

    imports: ["vue", "vue-router"],
    dirs: ["./hooks"],
    dts: "./auto-imports.d.ts",
    resolvers: [
      /* ... */
    ],
    eslintrc: {
      enabled: true,
      filepath: "./.eslintrc-auto-import.json",
      globalsPropValue: true
    }
  });
