import * as logger from "@practica/logger";
import * as Http from "http";

let httpServerRef: Http.Server;

// This file simulates real-world error handler that makes this component observable
const errorHandler = {
  // Listen to the error events which won't be handled by programmer
  listenToErrorEvents: (httpServer: Http.Server, options?) => {
    httpServerRef = httpServer;
    process.on("uncaughtException", async (error) => {
      await errorHandler.handleError(error);
    });

    process.on("unhandledRejection", async (reason) => {
      await errorHandler.handleError(reason);
    });

    process.on("SIGTERM", async () => {
      logger.error(
        "App received SIGTERM event, try to gracefully close the server"
      );
      await terminateHttpServer();
    });

    process.on("SIGINT", async () => {
      logger.error(
        "App received SIGINT event, try to gracefully close the server"
      );
      await terminateHttpServer();
    });
  },

  handleError: (errorToHandle: any) => {
    try {
      const appError: AppError = normalizeError(errorToHandle);
      logger.error(appError);
      metricsExporter.fireMetric("error", { errorName: appError.name });
      // A common best practice is to crash when an unknown error (non-trusted) is being thrown
      if (!appError.isTrusted) {
        terminateHttpServer();
      }
    } catch (e) {
      logger.error("Error Handler failed to handleError properly");
      logger.error(e);
      // Should we crash here?
    }
  },
};

const terminateHttpServer = async () => {
  // maybe implement more complex logic here (like using 'http-terminator' library)
  if (httpServerRef) {
    await httpServerRef.close();
  }
  process.exit();
};

// The input might won't be 'AppError' or even 'Error' instance, the output of this function will be - AppError.
const normalizeError = (errorToHandle: any): AppError => {
  if (errorToHandle instanceof AppError) {
    return errorToHandle;
  }
  if (errorToHandle instanceof Error) {
    return new AppError(errorToHandle.name, errorToHandle.message);
  }
  // meaning it could e any type,
  const inputType = typeof errorToHandle;
  return new AppError(
    "general-error",
    `Error Handler received a none error instance with type - ${inputType}, value - ${errorToHandle}`
  );
};

class AppError extends Error {
  constructor(
    name,
    message,
    public cause?: Error | any,
    public HTTPStatus?,
    public isTrusted = true
  ) {
    super(message);
    this.name = name;
    this.cause = cause;
    this.HTTPStatus = HTTPStatus;
    this.isTrusted = isTrusted;
  }
}

// This simulates a typical monitoring solution that allow firing custom metrics when
// like Prometheus, DataDog, CloudWatch, etc
const metricsExporter = {
  fireMetric: async (name, labels) => {
    console.log("In real production code I will really fire metrics");
  },
};

export { errorHandler, metricsExporter, AppError };
