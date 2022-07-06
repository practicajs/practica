import {generationOptions} from "./generation-options";
import * as path from "path";
import * as fs from "fs";
import {promisify} from 'util';
import fsExtra from "fs-extra";

type GenerateMonorepoToolOptions = {
    monorepoTool: generationOptions['monorepoTool'];
    dest: string;
    source: string;
}

async function addWorkspaceConfigToPkgJson(path: string) {
    try {
        const contentsAsString = (await promisify(fs.readFile)(path)).toString();
        const contentsAsJson = JSON.parse(contentsAsString);
        contentsAsJson.workspaces = ["libraries/**/*", "services/**/*"];
        await promisify(fs.writeFile)(path, JSON.stringify(contentsAsJson, undefined, 4));
    } catch (e: any) {
        throw new Error(`Failed to add "workspaces" configuration to package.json file at ${path}. Cause: ${e?.message}`);
    }
}

type AddTurboRepoConfigFile = {
    dest: string,
    source: string,
}

async function addTurboRepoConfigFile(params: AddTurboRepoConfigFile) {
    const sourceFile = path.join(params.source, 'optionalAdditions', 'turbo.json');
    const targetFile = path.join(params.dest, 'turbo.json');
    await fsExtra.copy(sourceFile, targetFile);
}

export async function generateMonorepoTool(options: GenerateMonorepoToolOptions) {
    const {monorepoTool, dest} = options;
    if (monorepoTool !== 'turborepo') {
        return;
    } else {
        const pkgJsonPath = path.join(dest, 'package.json');
        await addWorkspaceConfigToPkgJson(pkgJsonPath);
        await addTurboRepoConfigFile(options);
    }
}