"use server";

import { runBuild } from "@/_actions/build";
import { getRunCommand } from "@/_actions/prod/run";
import { getFreePort } from "@/lib/get-port";
import { errorPromise } from "@/lib/promise-error";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { db } from "@/lib/db";
export const npmStart = async (
  name: string,
  PORT: number,
  userCmd?: string
): Promise<{
  output: string;
  message: string;
  name: string;
  code: -1 | 0 | 1;
}> => {
  let runCmd = await getRunCommand(name);
  let pm2;
  if (userCmd) {
    const packageJsonPath = path.join(`../${name}`, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.scripts.younicornProd = userCmd + `-p ${PORT}`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    pm2 = spawn(
      "pm2",
      ["start", "npm", "--name", name, "--", "younicornProd", `--PORT=${PORT}`],
      { cwd: `../${name}` }
    );
  } else if (runCmd) {
    const packageJsonPath = path.join(`../${name}`, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.scripts.start += ` -p ${PORT}`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    pm2 = spawn(
      "pm2",
      ["start", "npm", "--name", name, "--", "start", `--PORT=${PORT}`],
      { cwd: `../${name}` }
    );
  }
  if (!pm2) return errorPromise("Unable to detect run command");
  pm2.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  pm2.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pm2.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
  await db.application
    .updateMany({
      where: {
        name: name,
      },
      data: {
        status: "DEPLOYED",
        port: PORT,
      },
    })
    .then(() => console.log("done"));
  return Promise.resolve({
    code: 1,
    message: "Success",
    name: name,
    output: "Process started successfully",
  });
};
