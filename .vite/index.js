import { defineConfig, loadEnv } from "vite";
import {
  server,
  resolve,
  vue,
  AutoImport,
  Components,
  Icons,
  Csspxtoviewport,
} from "./vite.config";
import dev from "./vite.dev";
import prod from "./vite.prod";

export default defineConfig(({ command, mode }) => {
  // 配置文件的变量通过 loadEnv 获取
  const env = loadEnv(mode, process.cwd());
  let config;
  switch (mode) {
    case "development":
      config = dev();
      break;
    default:
      config = prod();
      break;
  }
  const { plugins = [], props = {} } = config;

  return Object.assign(
    {
      server: server(env),
      resolve: resolve(),
      plugins: [vue(), AutoImport(), Components(), Icons(), ...plugins],
      css: {
        postcss: {
          plugins: [Csspxtoviewport()],
        },
      },
    },
    props,
  );
});
