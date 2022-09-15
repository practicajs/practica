export type LOG_LEVELS = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface Logger {
  info(message: string, metadata?: object): void;
  error(message: string, metadata?: object): void;
  debug(message: string, metadata?: object): void;
  warning(message: string, metadata?: object): void;
}

export interface LoggerConfiguration {
  level: LOG_LEVELS;
  prettyPrint: boolean;
}
