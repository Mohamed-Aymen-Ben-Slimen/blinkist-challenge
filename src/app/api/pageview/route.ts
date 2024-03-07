import { pushPageViewData } from "../data";

export async function POST(req: Request) {
  const json = await req.json();

  pushPageViewData({
    ...json,
    timestamp: new Date().toISOString(),
  });

  return Response.json({ message: "Page view recorded" });
}
