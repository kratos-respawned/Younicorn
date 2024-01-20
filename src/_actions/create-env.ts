"use server";

import { getServerAuth } from "@/lib/auth";
import { errorPromise } from "@/lib/promise-error";
import { spawn } from "child_process";

export const createEnv = async (
  name: string,
  env: string
): Promise<{
  output: string;
  message: string;
  name: string;
  code: 0 | -1 | 1;
}> => {
  const session = await getServerAuth();
  if (!session) return errorPromise("Unauthenticated");
  const cmd = `echo "${env}" > .env`;
  return new Promise((resolve, reject) => {
    spawn(cmd, { cwd: `../${name}` })
      .on("close", (code) => {
        if (code === 0) {
          resolve({
            output: "Success",
            message: "Successfully created .env file.",
            name: name,
            code: 1,
          });
        } else {
          resolve({
            output: "Error",
            message: "Error Occured during the build process",
            name: name,
            code: 0,
          });
        }
      })
      .on("error", (err) => {
        resolve({
          output: "Error",
          message: err.message,
          name: name,
          code: 0,
        });
      });
  });
};