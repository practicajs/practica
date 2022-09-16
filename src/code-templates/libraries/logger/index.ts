import { Logger, LoggerConfiguration } from './definition';
import PinoLogger from './pino.logger';
import { context } from '@practica/async-local-storage';

export class LoggerWrapper implements Logger {
  #underlyingLogger: Logger | null = null;

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
    this.configureLogger({}, false);
    this.#underlyingLogger!.debug(message, this.#mergeMetadata(metadata));
  }

  error(message: string, metadata?: object): void {
    this.configureLogger({}, false);
    this.#underlyingLogger!.error(message, this.#mergeMetadata(metadata));
  }

  info(message: string, metadata?: object): void {
    // If never initialized, the set default configuration
    this.configureLogger({}, false);
    this.#underlyingLogger!.info(message, this.#mergeMetadata(metadata));
  }

  warning(message: string, metadata?: object): void {
    this.configureLogger({}, false);
    this.#underlyingLogger!.warning(message, this.#mergeMetadata(metadata));
  }

  #mergeMetadata(metadata?: object): object | undefined {
    const currentContext = context().getStore();

    // Doing this to avoid merging objects...
    if (currentContext == null) {
      return metadata;
    }

    if (metadata == null) {
      return currentContext;
    }

    // Metadata would override the current context
    return Object.assign({}, currentContext, metadata);
  }
}

export const logger = new LoggerWrapper();
