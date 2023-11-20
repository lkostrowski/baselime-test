import { NextApiRequest, NextApiResponse } from "next";
import { SpanStatusCode, trace } from "@opentelemetry/api";
import { startOtelSdk } from "../../lib/sdk";

startOtelSdk();

const tracer = trace.getTracer("otel-test-route");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const span = tracer.startSpan("test-route");

  console.log({ message: "test console log" });

  span?.setAttribute("query", JSON.stringify(req.query));

  span?.addEvent("start handler");

  span?.setStatus({ code: SpanStatusCode.OK });

  span?.end();

  return res.send("ok");
}
