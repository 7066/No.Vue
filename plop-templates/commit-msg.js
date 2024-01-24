import fs from "fs";
export const emoji = {
  feat: " ✨  ",
  component: " 📦  ",
  fix: " 🐛  ",
  format: " 🎨  ",
  style: " 💄  ",
  refactor: " 💥  ",
};

const message = fs.readFileSync(".git/COMMIT_EDITMSG").toString();
if (message.includes("---PLOP-TRIGGER")) {
  const _ = message.replace("---PLOP-TRIGGER", "");
  fs.writeFileSync(".git/COMMIT_EDITMSG", _);
  process.exit(0);
} else {
  if (message.includes("()")) {
    console.info(`\x1B[31m禁止使用括号如: feat()`);
    process.exit(1);
  }
  const _type = message.match(
    /['feat','component','fix','format','style','refactor']/,
  );
  console.log(_type, "_type?");
  const _ = message.replace(
    /['feat','component','fix','format','style','refactor',':']/,
    "",
  );
  process.exit(1);
  console.log(_);
  // const _ = message.replace("---PLOP-TRIGGER", "");
}
