import fsExtra from "fs-extra";
import path from "path";

import generationOptions from "./generation-options";

export const generateApp = async (option: generationOptions) => {
  //console.log(`About to generate app with the following options: ${JSON.stringify(option)}`);
  await fsExtra.copy(path.join(__dirname, "../../code-templates/basic-app"), option.targetDirectory);
  //console.log(`App was generated successfully`);
  return;
};
