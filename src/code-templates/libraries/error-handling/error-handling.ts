import * as logger from "../../libraries/logger/logger";

// This file simulates real-world error handler that makes this component observable
const errorHandler = {
  handleError: async (errorToHandle) => {
    try {
      logger.error(errorToHandle);
      metricsExporter.fireMetric("error", {
        errorName: errorToHandle.name || "generic-error",
      });

      // A common best practice is to crash when an unknown error (non-trusted) is being thrown
      decideWhetherToCrash(errorToHandle);
    } catch (e) {
      // Continue the code flow if failed to handle the error
      console.log(`handleError threw an error ${e}`);
    }
  },
};

const decideWhetherToCrash = (error) => {
  if (!error.isTrusted) {
    process.exit();
  }
};

class AppError extends Error {
  constructor(readonly name: string, readonly message: string, public readonly HTTPStatus, public readonly isTrusted = true) {
    super(message);
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
