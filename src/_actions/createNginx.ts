"use server";

import { env } from "@/env.mjs";
import { getServerAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { errorPromise } from "@/lib/promise-error";
import { exec, spawn } from "child_process";
import { revalidatePath } from "next/cache";

export const runNginx = async (
  name: string,
  port: number
): Promise<{
  output: string;
  message: string;
  name: string;
  code: 0 | -1 | 1;
}> => {
  const session = await getServerAuth();
  if (!session) return errorPromise("Unauthenticated");

  return new Promise((resolve, reject) => {
    spawn("sudo", [
      "sh",
      "-c",
      `echo '${generateNginxConfig(
        name,
        port
      )}' | sudo tee /etc/nginx/sites-enabled/${name}`,
    ])
      .on("close", (code: number) => {
        if (code === 0) {
          exec(
            `sudo nginx -t && sudo systemctl restart nginx`,
            (err, stdout, stderr) => {
              if (err) {
                resolve({
                  output: "Error",
                  message: err.message,
                  name: name,
                  code: 0,
                });
              } else {
                db.application
                  .updateMany({
                    where: {
                      name: name,
                    },
                    data: {
                      status: "SUCCESS",
                      url: `${name.toLowerCase()}.${env.DOMAIN}`,
                    },
                  })
                  .then(() => console.log("done"));
                revalidatePath("/dashboard");
                resolve({
                  output: "Success",
                  message:
                    "Nginx configuration tested and nginx restarted successfully",
                  name: name,
                  code: 1,
                });
              }
            }
          );
        } else {
          resolve({
            output: "Error",
            message: "Error Occured during the nginx config process",
            name: name,
            code: 0,
          });
        }
      })
      .on("error", (err) => {
        console.log(err.message);
        resolve({
          output: "Error",
          message: err.message,
          name: name,
          code: 0,
        });
      });
  });
};

const generateNginxConfig = (name: string, port: number) => `
server {
        listen 80;
        server_name ${name.toLowerCase()}.${env.DOMAIN}
        gzip on;
        gzip_proxied any;
        gzip_types application/javascript application/x-javascript text/css text/javascript;
        gzip_comp_level 5;
        gzip_buffers 16 8k;
        gzip_min_length 256;

        location /_next/static/ {
                alias /${name}/.next/static/;
                expires 365d;
                access_log off;
        }

        location / {
                proxy_pass http://127.0.0.1:${port};
                proxy_http_version 1.1;
                proxy_set_header Upgrade \$http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host \$host;
                proxy_cache_bypass \$http_upgrade;
        }
}`;
