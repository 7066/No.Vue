import { defineConfig, loadEnv } from "vite";
import dev from "./dev";
import prod from "./prod";

export default defineConfig(({ command, mode }) => {
  console.log(mode, process.cwd(), "???");
  if (command === "serve") {
    return dev({
      env: loadEnv(mode, process.cwd()),
    });
  } else {
    return prod({
      env: loadEnv(mode, process.cwd()),
    });
  }
});
