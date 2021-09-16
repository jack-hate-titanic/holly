#! /usr/bin/env node
/*
 * @Author:ws
 * @Date: 2021-09-16 21:25:01
 * @LastEditTime: 2021-09-16 21:46:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /holly/bin/cli.js
 */
const program = require("commander");

program
  .command("create <app-name>")
  .description("create new a project")
  .option("-f,--force", "overwrite target directory if it exist")
  .action((name, options) => {
    require("../lib/create.js")(name, options);
  });

program
  // 配置版本号信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

program.parse(process.argv);
