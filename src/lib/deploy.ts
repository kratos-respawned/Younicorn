import { runBuild } from "@/_actions/build";
import { gitClone } from "@/_actions/clone";
import { createEnv } from "@/_actions/create-env";
import { npmInstall } from "@/_actions/package-installation";
import { Prompt } from "@/components/ui/sonner";
import { DeployForm } from "@/validators/deploy-form";
import { toast } from "sonner";

export const createProject = async (values: DeployForm) => {
  toast.info("Cloning Repo");
  const cloneResponse = await gitClone(values.url);
  Prompt(cloneResponse.code, cloneResponse.message, cloneResponse.output);
  if (cloneResponse.code == 0) return;
  toast.info("Installing Packages Now");
  const installerResponse = await npmInstall(cloneResponse.name);
  Prompt(
    installerResponse.code,
    installerResponse.message,
    installerResponse.output
  );
  if (installerResponse.code != 1) return;

  console.log("build cmd present");
  if (values.env) {
    const envResponse = await createEnv(cloneResponse.name, values.env);
    Prompt(envResponse.code, envResponse.message, envResponse.output);
    if (envResponse.code != 1) return;
  }
  let buildResponse;
  if (values.buildcommand) {
    console.log("build cmd present");
    buildResponse = await runBuild(cloneResponse.name, values.buildcommand);
  } else {
    console.log("build cmd not present");
    buildResponse = await runBuild(cloneResponse.name, "npm run build");
  }
  Prompt(buildResponse.code, buildResponse.message, buildResponse.output);
  if (buildResponse.code != 1) return;
  if (values.runcommand) {
  }
};
