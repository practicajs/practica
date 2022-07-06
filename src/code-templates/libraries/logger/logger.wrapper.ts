import {Logger} from "./definition";


export class LoggerWrapper implements Logger {
    private underlyingLogger: Logger | null = null;

    setLogger(logger: Logger) {
        this.underlyingLogger = logger;
    }
    debug(message: string, ...args: any[]): void {
        this.underlyingLogger?.debug(message, ...args);;
    }

    error(message: string, ...args: any[]): void {
        this.underlyingLogger?.error(message, ...args);;
    }

    info(message: string, ...args: any[]): void {
        this.underlyingLogger?.info(message, ...args);;
    }

    warning(message: string, ...args: any[]): void {
        this.underlyingLogger?.warning(message, ...args);;
    }

}
