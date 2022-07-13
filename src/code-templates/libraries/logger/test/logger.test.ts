import logger, {configure} from "../logger";
import * as configurationProvider from "@practica/configuration-provider";

describe("logger", () => {
    configurationProvider.initialize({
        logger: {
            level: {
                doc: "Which type of logger entries should actually be written to the target medium (e.g., stdout)",
                format: ["debug", "info", "warn", "error", "critical"],
                default: "info",
                nullable: false,
                env: "LOGGER_LEVEL",
            },
            prettyPrint: {
                doc: "Weather the logger should be configured to pretty print the output",
                format: 'Boolean',
                default: true,
                nullable: false,
                env: "PRETTY_PRINT_LOG",
            },
            destination: {
                doc: "destination in which the logger should be written, empty value will be considered as stdout",
                format: '*',
                default: null,
                nullable: true,
                env: "LOGGER_DEST",
            }
        }
    })
    configure();
    test("test 1", async () => {
        logger.info("test 1");
    })
})
