import * as configurationProvider from "@practica/configuration-provider";
import {PinoLogger} from './pino.logger';
import {LOG_LEVELS, Logger} from "./definition";
import {LoggerWrapper} from "./logger.wrapper";

let logger: LoggerWrapper  = new LoggerWrapper();

export function configure() {
    logger.setLogger(new PinoLogger(
        configurationProvider.getValue("logger.level") as LOG_LEVELS,
        configurationProvider.getValue("logger.prettyPrint"),
        configurationProvider.getValue('logger.destination') || undefined
    ))
}

export default logger;
