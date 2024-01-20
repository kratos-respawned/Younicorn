"use server";
// todo : kill build if it takes more than half an hour
//  const process = spawn(first, [...rest], { cwd: `../${name}` });
//  const timer = setTimeout(() => {
//    process.kill(); // This will stop the process
//    reject({
//      output: "Error",
//      message: "Build process timed out",
//      name: name,
//      code: 0,
//    });
//  }, 60 * 60 * 1000);
import { getServerAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { errorPromise } from "@/lib/promise-error";
import { spawn } from "child_process";
import { revalidatePath } from "next/cache";

export const runBuild = async (
  name: string,
  buildCmd: string
): Promise<{
  output: string;
  message: string;
  name: string;
  code: 0 | 1 | -1;
}> => {
  const session = await getServerAuth();
  if (!session) return errorPromise("Unauthenticated");
  const userCMD = buildCmd.split(" ");
  let [first, ...rest] = userCMD;
  if (!first) {
    first = "npm";
    rest = ["run", "build"];
  }
  return new Promise((resolve, reject) => {
    spawn("sudo", [first, ...rest], { cwd: `../${name}` })
      .on("close", (code) => {
        if (code === 0) {
          db.application
            .updateMany({
              where: {
                name: name,
              },
              data: {
                status: "BUILT",
              },
            })
            .then(() => console.log("done"));
          revalidatePath("/dashboard");
          resolve({
            output: "Success",
            message: "Build Success",
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
