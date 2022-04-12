import * as logger from "logger";
import { initializeWebServer } from "./entry-points/api";
import { MessageQueueStarter } from "./entry-points/message-queue-starter";

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
