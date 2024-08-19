import { context } from '@practica/global-context';
import { Logger, LoggerConfiguration } from './definition';
import PinoLogger from './pino.logger';

export class LoggerWrapper implements Logger {
  #underlyingLogger: Logger | null = null;

  #getInitializeLogger(): Logger {
    this.configureLogger({}, false);
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

    if (currentContext === null || typeof currentContext !== 'object') {
      return metadata;
    }

    if (metadata == null) {
      return currentContext;
    }

    return { ...currentContext, ...metadata };
  }
}

export const logger = new LoggerWrapper();
