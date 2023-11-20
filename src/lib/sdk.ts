export const startOtelSdk = async () => {
  const { BaselimeSDK, VercelPlugin, BetterHttpInstrumentation } = await import(
    "@baselime/node-opentelemetry"
  );

  const sdk = new BaselimeSDK({
    serverless: true,
    service: "baselime-test.vercel.app", // hardcoded for log drain
    instrumentations: [
      new BetterHttpInstrumentation({
        plugins: [
          // Add the Vercel plugin to enable correlation between your logs and traces for projects deployed on Vercel
          new VercelPlugin(),
        ],
      }),
    ],
  });

  sdk.start();
};
