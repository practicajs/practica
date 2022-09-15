import { Logger, LoggerConfiguration } from './definition';
import PinoLogger from './pino.logger';

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
    this.#underlyingLogger!.debug(message, metadata);
  }

  error(message: string, metadata?: object): void {
    this.configureLogger({}, false);
    this.#underlyingLogger!.error(message, metadata);
  }

  info(message: string, metadata?: object): void {
    // If never initialized, the set default configuration
    this.configureLogger({}, false);
    this.#underlyingLogger!.info(message, metadata);
  }

  warning(message: string, metadata?: object): void {
    this.configureLogger({}, false);
    this.#underlyingLogger!.warning(message, metadata);
  }
}

export const logger = new LoggerWrapper();
