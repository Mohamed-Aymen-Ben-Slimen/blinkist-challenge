import { pushEventData } from "../data";

export async function POST(req: Request) {
  const json = await req.json();

  pushEventData({
    ...json,
    timestamp: new Date().toISOString(),
  });

  return Response.json({ message: "Event recorded" });
}
