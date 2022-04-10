import { initializeWebServer } from "./entry-points/api";
import { MessageQueueStarter } from "./entry-points/message-queue-starter";

async function start() {
  return await Promise.all([
    initializeWebServer,
    new MessageQueueStarter().start(),
  ]);
}

start()
  .then((initializersResponse) => {
    const [apiInitializerResponse, MQInitializerResponse] =
      initializersResponse;
    console.log("The app has started successfully", initializersResponse[0]);
  })
  .catch((error) => {
    console.log("App error ocurred during startup", error);
  });
