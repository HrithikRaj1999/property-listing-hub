import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, label, printf, prettyPrint } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const fileRotateTransport = new DailyRotateFile({
  filename: "logs/rotate-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});
export const logger = createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint({ colorize: true })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/backend_logs.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
    fileRotateTransport,
  ],
});
