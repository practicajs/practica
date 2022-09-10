export type LOG_LEVELS = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface Logger {
  info(message: string, metadata?: Record<any, unknown>): void;
  error(message: string, metadata?: Record<any, unknown>): void;
  debug(message: string, metadata?: Record<any, unknown>): void;
  warning(message: string, metadata?: Record<any, unknown>): void;
}

export interface LoggerConfiguration {
  level: LOG_LEVELS;
  prettyPrint: boolean;
}
