const pino = require("pino");

const t = pino.transport({
  target: "@baselime/pino-transport",
  options: { baselimeApiKey: process.env.NEXT_PUBLIC_BASELIME_KEY as string },
});

export const logger = pino(
  t
);
