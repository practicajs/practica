import path from "node:path";
import * as replacementUtilities from "replace-in-file";

export async function replacePhraseInFile(
  path: string,
  whatToReplaceInRegex: string,
  replacement: string
) {
  await replacementUtilities.replaceInFile({
    files: path,
    from: new RegExp(whatToReplaceInRegex, "g"),
    to: replacement,
  });
}

export async function replacePhraseInAllFiles(
  pathToRoot: string,
  whatToReplaceInRegex: string,
  replacement: string
) {
  await replacementUtilities.replaceInFile({
    files: [`${pathToRoot}/**/*.*`],
    from: new RegExp(whatToReplaceInRegex, "g"),
    to: replacement,
  });
}

export function getMicroservicePath(rootPath: string) {
  return path.join(rootPath, "services", "order-service");
}
