import fs from "fs";
import path from "path";

export const getRunCommand = (name: string) => {
  const packageJsonPath = path.join(`../${name}`, "package.json");
  try {
    const data = fs.readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(data);
    const runCommand = packageJson.scripts && packageJson.scripts.start;
    return runCommand;
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
  }
};
