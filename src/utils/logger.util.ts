import chalk from "chalk";

export const logger = {
  success: (msg: string) => console.log(chalk.green("✔"), msg),
  info: (msg: string) => console.log(chalk.blue("ℹ"), msg),
  warning: (msg: string) => console.log(chalk.yellow("⚠"), msg),
  error: (msg: string) => console.log(chalk.red("✖"), msg),
  blank: () => console.log(),
  title: (msg: string) => console.log(chalk.bold.cyan(`\n  ${msg}\n`)),
};
