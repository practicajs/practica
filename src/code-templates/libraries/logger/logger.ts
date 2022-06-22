import * as configurationProvider from "@practica/configuration-provider";

// example on how to read the level: configurationProvider.get("logger.level")
export const info = (message) => {
  console.log(message);
};

export const error = (message) => {
  console.error(message);
};
