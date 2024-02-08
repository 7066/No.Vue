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
    server: server(),
    resolve: resolve(),
    plugins: [vue(), AutoImport(), Components(), Icons()],
    css: {
      postcss: {
        plugins: [Csspxtoviewport()],
      },
    },
  };
};
