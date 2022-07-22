import { logger } from '@practica/logger';
import * as Http from 'http';
import * as util from 'util';

let httpServerRef: Http.Server;

// This file simulates real-world error handler that makes this component observable
const errorHandler = {
  // Listen to the error events which won't be handled by programmer
  listenToErrorEvents: (httpServer: Http.Server, options?) => {
    httpServerRef = httpServer;
    process.on('uncaughtException', async (error) => {
      await errorHandler.handleError(error);
    });

    process.on('unhandledRejection', async (reason) => {
      await errorHandler.handleError(reason);
    });

    process.on('SIGTERM', async () => {
      logger.error(
        'App received SIGTERM event, try to gracefully close the server'
      );
      await terminateHttpServerAndExit();
    });

    process.on('SIGINT', async () => {
      logger.error(
        'App received SIGINT event, try to gracefully close the server'
      );
      await terminateHttpServerAndExit();
    });
  },

  handleError: (errorToHandle: AppError | Error | any) => {
    try {
      const appError: AppError = normalizeError(errorToHandle);
      logger.error(appError);
      metricsExporter.fireMetric('error', { errorName: appError.name }); // fire any custom metric when handling error
      // A common best practice is to crash when an unknown error (non-trusted) is being thrown
      if (!appError.isTrusted) {
        terminateHttpServerAndExit();
      }
    } catch (e) {
      process.stdout.write(
        'The error handler failed, here is the error handler specific error',
        e
      );
      process.stdout.write(
        'The error handler failed, here is the origin that it tried to handle',
        errorToHandle
      );
      // Should we crash here?
    }
  },
};

// better naming option - 'gracefullyExit' or something like that ?
const terminateHttpServerAndExit = async () => {
  // maybe implement more complex logic here (like using 'http-terminator' library)
  if (httpServerRef) {
    await httpServerRef.close();
  }
  process.exit();
};

// The input might won't be 'AppError' or even 'Error' instance, the output of this function will be - AppError.
const normalizeError = (errorToHandle: AppError | Error | any): AppError => {
  if (errorToHandle instanceof AppError) {
    return errorToHandle;
  }
  if (errorToHandle instanceof Error) {
    const appError = new AppError(errorToHandle.name, errorToHandle.message);
    appError.stack = errorToHandle.stack; // TODO - most primitive solution to keep stackTrace, any other options? maybe add property to AppError like ~'prevStackTrace'
    return appError;
  }
  // meaning it could e any type,
  const inputType = typeof errorToHandle;
  return new AppError(
    'general-error',
    `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(
      errorToHandle
    )}`
  );
};

class AppError extends Error {
  constructor(
    public name: string,
    public message: string,
    public HTTPStatus: number = 500, // TODO - do we want to provide any default value?
    public isTrusted = true,
    public cause?: Error | any
  ) {
    super(message);
  }
}

// This simulates a typical monitoring solution that allow firing custom metrics when
// like Prometheus, DataDog, CloudWatch, etc
const metricsExporter = {
  fireMetric: async (name, labels) => {
    console.log('In real production code I will really fire metrics');
  },
};

export { errorHandler, metricsExporter, AppError };
