import { Logger, LoggerConfiguration } from './definition'
import { PinoLogger } from './pino.logger'

export class LoggerWrapper implements Logger {
  private underlyingLogger: Logger | null = null

  configureLogger(
    configuration: Partial<LoggerConfiguration>,
    overrideIfExists: boolean = true
  ): void {
    if (this.underlyingLogger === null || overrideIfExists === true) {
      this.underlyingLogger = new PinoLogger(
        configuration.level || 'info',
        configuration.prettyPrint || false,
        undefined
      )
    }
  }

  resetLogger() {
    this.underlyingLogger = null
  }

  debug(message: string, ...args: any[]): void {
    this.configureLogger({}, false)
    this.underlyingLogger?.debug(message, ...args)
  }

  error(message: string, ...args: any[]): void {
    this.configureLogger({}, false)
    this.underlyingLogger?.error(message, ...args)
  }

  info(message: string, ...args: any[]): void {
    // If never initialized, the set default configuration
    this.configureLogger({}, false)
    this.underlyingLogger?.info(message, ...args)
  }

  warning(message: string, ...args: any[]): void {
    this.configureLogger({}, false)
    this.underlyingLogger?.warning(message, ...args)
  }
}

export const logger = new LoggerWrapper()
