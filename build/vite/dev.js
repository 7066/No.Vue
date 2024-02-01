import { server, resolve, vue, AutoImport, Components, Icons } from "./config";

export default () => {
  return {
    server: server(),
    resolve: resolve(),
    plugins: [vue(), AutoImport(), Components(), Icons()],
  };
};
