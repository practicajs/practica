import {configurationProvider} from "../configuration-provider";
import {PinoLogger} from './pino.logger';
import {LOG_LEVELS} from "./definition";

export default new PinoLogger(
    configurationProvider.get("logger.level") as LOG_LEVELS,
    configurationProvider.get("logger.prettyPrint"),
    configurationProvider.get('logger.destination') || undefined
)
