export type LOG_LEVELS = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface Logger {
  info(message: string, metadata?: Record<any, any>): void;
  error(message: string, metadata?: Record<any, any>): void;
  debug(message: string, metadata?: Record<any, any>): void;
  warning(message: string, metadata?: Record<any, any>): void;
}

export interface LoggerConfiguration {
  level: LOG_LEVELS;
  prettyPrint: boolean;
}
