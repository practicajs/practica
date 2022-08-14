import path from "path";
import { runServer } from "verdaccio";
import { ConfigYaml } from "@verdaccio/types";
import * as testHelpers from "./test-helpers";
import fsExtra from "fs-extra";
import { name as packageName } from "../package.json";

let portNumber: number | undefined;
let verdaccioInstance: any;
let verdaccioDataFolder: string | undefined;

function getNpmEnvironmentVariables(port: number): NodeJS.ProcessEnv {
  return {
    // This is used in the .npmrc file
    VERDACCIO_RANDOM_PORT: port.toString(),

    // This is to require the npm operations to use our local registry
    npm_config_registry: `http://localhost:${port}`,
  };
}

export async function setupVerdaccio(): Promise<{
  npmEnvironmentVars: NodeJS.ProcessEnv;
}> {
  if (verdaccioInstance) {
    if (portNumber === undefined || verdaccioDataFolder === undefined) {
      throw new Error("verdaccio initiated but no port or data folder exist");
    }

    return {
      npmEnvironmentVars: getNpmEnvironmentVariables(portNumber),
    };
  }

  verdaccioDataFolder = await testHelpers.createUniqueFolder();

  const config: ConfigYaml = {
    // Where verdaccio will store its data
    storage: path.join(verdaccioDataFolder, "storage"),

    packages: {
      // Making our application only go to verdaccio registry and not to the default one,
      // which also prevent it from being published to npm
      [packageName]: {
        access: ["$anonymous"],

        // Allowing the package to be published without user
        publish: ["$anonymous"],
      },

      // Have access to external packages
      "@*/*": {
        access: ["$all"],
        proxy: ["npmjs"],
      },
      "**": {
        access: ["$all"],
        proxy: ["npmjs"],
      },
    },

    // External Registries
    uplinks: {
      npmjs: {
        url: "https://registry.npmjs.org/",
      },
    },

    logs: {
      type: "stdout",
      format: "pretty",

      // For debugging, you may want to change this to `http`
      level: "fatal",
    },

    // @ts-expect-error (TS2322: [...] 'self_path' does not exist in type 'ConfigYaml'.)
    // Required otherwise we would get
    // Error: self_path is required, please provide a valid root path for storage
    self_path: verdaccioDataFolder,
    security: undefined as any,
  };

  verdaccioInstance = await runServer(config);
  await new Promise<void>((resolve, reject) => {
    // Port 0 means any available local port
    const result = verdaccioInstance.listen(0, (err) =>
      err ? reject(err) : resolve()
    );

    portNumber = result.address().port;
  });

  return {
    npmEnvironmentVars: getNpmEnvironmentVariables(portNumber!),
  };
}

export async function teardownVerdaccio() {
  if (verdaccioInstance) {
    await verdaccioInstance.close();
    verdaccioInstance = undefined;
  }

  if (verdaccioDataFolder) {
    await fsExtra.remove(verdaccioDataFolder);
    verdaccioDataFolder = undefined;
  }

  portNumber = undefined;
}
