export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./lib/sdk").then((sdk) => {
      sdk.startOtelSdk();
    });
  }
}
