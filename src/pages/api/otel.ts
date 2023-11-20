import { NextApiRequest, NextApiResponse } from "next";
import { SpanStatusCode, trace } from "@opentelemetry/api";
import { startOtelSdk } from "../../lib/sdk";
import { logger } from "../../lib/logger";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startOtelSdk();

  const tracer = trace.getTracer("otel-test-route");
  const span = tracer.startSpan("test-route");

  logger.log("test console log");

  logger.log("trace data", trace.getActiveSpan()?.spanContext());

  span?.setAttribute("query", JSON.stringify(req.query));

  span?.addEvent("start handler", {
    foo: "Bar",
  });

  span?.setStatus({ code: SpanStatusCode.OK });

  span?.end();

  return res.send("ok");
}
