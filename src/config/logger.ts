import log4js from 'log4js';
import path from 'path';

log4js.configure({
  appenders: {
    app: {
      type: 'file',
      filename: path.dirname(path.dirname(__dirname)) + `/logs/log.log`,
    },
    stdout: { type: 'stdout' },
  },
  categories: { default: { appenders: ['app', 'stdout'], level: 'info' } },
});

export const logger = log4js.getLogger();
