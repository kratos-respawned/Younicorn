"use server";
import getPort, { portNumbers } from "get-port";

export const getFreePort = async () => {
  const PORT = await getPort({ port: portNumbers(3000, 3100) });
  return PORT;
};
