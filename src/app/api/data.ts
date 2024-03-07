/* 
    Lowdb is used as a lightway data storage.
    A real database should be used in a real application.
*/

import { kv } from "@vercel/kv";

interface PageViewRecord {
  url: string;
  variationId: string;
  userId: string;
  timestamp: Date;
}

interface EventRecord {
  url: string;
  eventName: string;
  variationId: string;
  userId: string;
  timestamp: Date;
}

export const getPageViewData = async (): Promise<PageViewRecord[]> => {
  const res = await kv.get<PageViewRecord[]>("pageViewData");
  return res ?? [];
};

export const pushPageViewData = async (record: PageViewRecord) => {
  let pageViewData = await getPageViewData();
  pageViewData?.push(record);
  console.log("pageViewData", record, pageViewData);
  await kv.set("pageViewData", pageViewData);
};

export const getEventData = async (): Promise<EventRecord[]> => {
  const res = await kv.get<EventRecord[]>("eventData");
  return res ?? [];
};

export const pushEventData = async (record: EventRecord) => {
  let eventData = await getEventData();
  eventData?.push(record);
  await kv.set("eventData", eventData);
};
