import { configurationProvider } from "configuration-provider";

export const info = (message) => {
  console.log("💪", configurationProvider.get("logger.level"));
};

export const error = (message) => {
  console.error(message);
};
