import merge from "./config";

export default ({ env }) => {
  const {
    server,
    resolve,
    Csspxtoviewport,
    VUE,
    VueI18n,
    AutoImport,
    Components,
    Icons,
  } = merge({ env });
  return {
    server,
    resolve,
    plugins: [VUE, VueI18n, AutoImport, Components, Icons],
    css: {
      postcss: {
        // plugins: [Csspxtoviewport],
      },
    },
  };
};
