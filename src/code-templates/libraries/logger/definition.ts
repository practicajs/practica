export type  LOG_LEVELS = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface Logger {
    info(message: string, ...args: any[]): void;

    error(message: string, ...args: any[]): void;

    debug(message: string, ...args: any[]): void;

    warning(message: string, ...args: any[]): void;
}

export interface LoggerConfiguration{
    level: LOG_LEVELS;
    prettyPrint: boolean;
}
