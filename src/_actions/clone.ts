"use server";
import { getServerAuth } from "@/lib/auth";
import { errorPromise } from "@/lib/promise-error";
import { spawn } from "child_process";
import fs from "fs";
export const gitClone = async (
  url: string
): Promise<{
  output: string;
  message: string;
  name: string;
  code: -1 | 0 | 1;
}> => {
  const session = await getServerAuth();
  if (!session) errorPromise("Unauthenticated");
  return new Promise((resolve, reject) => {
    const Name = url
      .split("github.com/")[1]
      .split("/")[1]
      .split(".")[0]
      .replace(" ", "_");
    fs.existsSync(`../${Name}`)
      ? resolve({
          output: "Message",
          message: "Directory already exists",
          name: Name,
          code: -1,
        })
      : spawn("git", ["clone", url], { cwd: "../" })
          .on("close", (code) => {
            if (code === 0) {
              resolve({
                output: "Success",
                message: "Cloned Successfully",
                name: Name,
                code: 1,
              });
            } else {
              resolve({
                output: "Error",
                message: "Unable to clone",
                name: Name,
                code: 0,
              });
            }
          })
          .on("error", (err) => {
            resolve({
              output: "Error",
              message: err.message,
              name: Name,
              code: 0,
            });
          });
  });
};
