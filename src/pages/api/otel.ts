import { NextApiRequest, NextApiResponse } from "next";
import { SpanStatusCode, trace } from "@opentelemetry/api";

const tracer = trace.getTracer("otel-test-route");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const span = trace.getActiveSpan();

  span?.setAttribute("query", JSON.stringify(req.query));

  span?.addEvent("start handler");

  span?.setStatus({ code: SpanStatusCode.OK });

  span?.end();

  return res.send("ok");
}
