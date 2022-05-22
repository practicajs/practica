import * as logger from "logger";
import { initializeWebServer } from "./entry-points/api";

// ⚠️❗️ The example app is very simplistic now and contains many errors
// We're still crafting it
async function start() {
  return Promise.all([initializeWebServer()]);
}

start()
  .then((initializersResponse) => {
    logger.info("The app has started successfully");
  })
  .catch((error) => {
    logger.error("App error ocurred during startup");
    logger.error(error);
  });
