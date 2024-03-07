import { getEventData, getPageViewData } from "../data";

interface CTR {
  [variationId: string]: {
    clicks: number;
    pageViews: number;
    ctr: number;
  };
}

export async function GET() {
  const ctrPerVariant = calculateCTR();

  return Response.json({ ...ctrPerVariant });
}

function calculateCTR(): CTR {
  const pageViewData = getPageViewData();
  const eventData = getEventData();

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
    const clicks = uniqueUsers[variationId].size;
    const pageViews = uniquePageViews[variationId].size;
    ctr[variationId] = {
      clicks,
      pageViews,
      ctr: pageViews > 0 ? parseFloat((clicks / pageViews).toFixed(2)) : 0,
    };
  }

  return ctr;
}
