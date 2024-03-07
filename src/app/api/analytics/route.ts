import { getEventData, getPageViewData } from "../data";

interface CTR {
  [variationId: string]: {
    clicks: number;
    pageViews: number;
    ctr: number;
  };
}

export async function GET() {
  const ctrPerVariant = await calculateCTR();

  return Response.json({ ...ctrPerVariant });
}

async function calculateCTR(): Promise<CTR> {
  const pageViewData = await getPageViewData();
  const eventData = await getEventData();

  if (!pageViewData || !eventData) {
    return {};
  }

  const signUpClicks = eventData.filter(
    (event) => event.eventName === "Sign-Up-Click"
  );

  const uniqueUsers: { [variationId: string]: Set<string> } = {};
  const uniquePageViews: { [variationId: string]: Set<string> } = {};

  signUpClicks.forEach((event) => {
    uniqueUsers[event.variationId] =
      uniqueUsers[event.variationId] || new Set();
    uniqueUsers[event.variationId].add(event.userId);
  });

  pageViewData.forEach((pageView) => {
    uniquePageViews[pageView.variationId] =
      uniquePageViews[pageView.variationId] || new Set();
    uniquePageViews[pageView.variationId].add(pageView.userId);
  });

  const ctr: CTR = {};
  for (const variationId in uniqueUsers) {
    const clicks = uniqueUsers[variationId]?.size ?? 0;
    const pageViews = uniquePageViews[variationId]?.size ?? 0;
    ctr[variationId] = {
      clicks,
      pageViews,
      ctr: pageViews > 0 ? parseFloat((clicks / pageViews).toFixed(2)) : 0,
    };
  }

  return ctr;
}
