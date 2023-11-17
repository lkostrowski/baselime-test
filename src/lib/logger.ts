import pino from "pino";

export const logger = pino({
  transport: {
    target: "@baselime/pino-transport",
    options: { baselimeApiKey: process.env.NEXT_PUBLIC_BASELIME_KEY as string },
  },
});
