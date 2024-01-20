"use server";
import { getServerAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { errorPromise } from "@/lib/promise-error";
import { spawn } from "child_process";
import { revalidatePath } from "next/cache";

export const halt = async (
  name: string
): Promise<{
  output: string;
  message: string;
  name: string;
  code: 0 | 1 | -1;
}> => {
  const session = await getServerAuth();
  if (!session) return errorPromise("Unauthenticated");

  return new Promise((resolve, reject) => {
    spawn("pm2", ["stop", name], { cwd: `../${name}` })
      .on("close", (code) => {
        if (code === 0) {
          db.application
            .updateMany({
              where: {
                name: name,
              },
              data: {
                status: "HALTED",
              },
            })
            .then(() => revalidatePath("/dashboard"));
          resolve({
            output: "Success",
            message: "Project Stopped",
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
