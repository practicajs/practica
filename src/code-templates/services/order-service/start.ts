import * as logger from "logger";
import { initializeWebServer } from "./entry-points/api";
import { MessageQueueStarter } from "./entry-points/message-queue-starter";

// ⚠️❗️ The example app is very simplistic now and contains many errors
// We're still crafting it. There is no point in trying to learn from it
// how a production-ready should look like

async function start() {
  return Promise.all([
    initializeWebServer(),
    new MessageQueueStarter().start(),
  ]);
}

start()
  .then((initializersResponse) => {
    logger.info("The app has started successfully");
  })
  .catch((error) => {
    logger.error("App error ocurred during startup");
    logger.error(error);
  });
