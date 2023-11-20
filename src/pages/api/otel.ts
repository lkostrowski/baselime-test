import { NextApiRequest, NextApiResponse } from "next";
import { SpanStatusCode, trace } from "@opentelemetry/api";
import { startOtelSdk } from "../../lib/sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startOtelSdk();

  console.log({
    message: trace.getActiveSpan()?.spanContext(),
  });

  const tracer = trace.getTracer("otel-test-route");
  const span = tracer.startSpan("test-route");

  console.log({ message: "test console log" });

  console.log({
    message: trace.getActiveSpan()?.spanContext(),
  });

  span?.setAttribute("query", JSON.stringify(req.query));

  span?.addEvent("start handler");

  span?.setStatus({ code: SpanStatusCode.OK });

  span?.end();

  return res.send("ok");
}
