import {configurationProvider} from "../configuration-provider";
import {pino} from "pino";


const logFile = configurationProvider.get("logger.destination");
export default pino(
    {
        level: configurationProvider.get("logger.level"),
        prettyPrint: {
            colorize: true, // colorizes the log
            levelFirst: true,
            translateTime: 'yyyy-dd-mm, h:MM:ss TT',
        },
    },
    pino.destination(logFile == 'stdout' ? undefined: `${__dirname}/${logFile}`)
)
