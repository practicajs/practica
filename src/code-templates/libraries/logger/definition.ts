export type LOG_LEVELS = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface Logger {
  info(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
  warning(message: string, ...args: unknown[]): void;
}

export interface LoggerConfiguration {
  level: LOG_LEVELS;
  prettyPrint: boolean;
}
