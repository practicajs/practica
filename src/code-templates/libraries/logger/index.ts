import { context } from '@practica/request-context';
import { Logger, LoggerConfiguration } from './definition';
import PinoLogger from './pino.logger';

export class LoggerWrapper implements Logger {
  #underlyingLogger: Logger | null = null;

  #getInitializeLogger(): Logger {
    this.configureLogger({}, false);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#underlyingLogger!;
  }

  configureLogger(
    configuration: Partial<LoggerConfiguration>,
    overrideIfExists = true
  ): void {
    if (this.#underlyingLogger === null || overrideIfExists === true) {
      this.#underlyingLogger = new PinoLogger(
        configuration.level || 'info',
        configuration.prettyPrint || false
      );
    }
  }

  resetLogger() {
    this.#underlyingLogger = null;
  }

  debug(message: string, metadata?: object): void {
    this.#getInitializeLogger().debug(
      message,
      LoggerWrapper.#insertContextIntoMetadata(metadata)
    );
  }

  error(message: string, metadata?: object): void {
    this.#getInitializeLogger().error(
      message,
      LoggerWrapper.#insertContextIntoMetadata(metadata)
    );
  }

  info(message: string, metadata?: object): void {
    // If never initialized, the set default configuration
    this.#getInitializeLogger().info(
      message,
      LoggerWrapper.#insertContextIntoMetadata(metadata)
    );
  }

  warning(message: string, metadata?: object): void {
    this.#getInitializeLogger().warning(
      message,
      LoggerWrapper.#insertContextIntoMetadata(metadata)
    );
  }

  static #insertContextIntoMetadata(metadata?: object): object | undefined {
    const currentContext = context().getStore();

    // Doing this to avoid merging objects...
    if (currentContext == null) {
      return metadata;
    }

    if (metadata == null) {
      return currentContext;
    }

    // Metadata would override the current context
    return { ...currentContext, ...metadata };
  }
}

export const logger = new LoggerWrapper();
