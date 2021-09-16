/*
 * @Author: your name
 * @Date: 2021-09-16 21:31:52
 * @LastEditTime: 2021-09-16 22:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 *
 * @FilePath: /holly/lib/create.js
 */
const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const Generator = require("./Generator");

module.exports = async function (name, options) {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory already exists Pick an action:",
          choices: [
            { name: "Overwrite", value: "overwrite" },
            { name: "Cancel", value: "cancel" },
          ],
        },
      ]);
      if (!action) {
        return;
      } else if (action === "overwrite") {
        console.log(`\r\nRemoving...`);
        await fs.remove(targetDir);
      }
    }
  }
  const generator = new Generator(name, targetDir);
  generator.create();
};
