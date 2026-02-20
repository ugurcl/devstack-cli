import { Command } from "commander";
import { initCommand } from "./commands/init.js";

const program = new Command();

program
  .name("devstack")
  .description("Scaffold Express + TypeScript + MongoDB projects")
  .version("1.0.0");

program
  .command("init")
  .description("Create a new project")
  .action(initCommand);

program.parse();
