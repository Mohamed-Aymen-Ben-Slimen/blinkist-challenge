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
  return (await kv.get("pageViewData")) ?? [];
};

export const pushPageViewData = async (record: PageViewRecord) => {
  console.log(kv);
  let pageViewData = await getPageViewData();
  pageViewData?.push(record);
  const res = await kv.set("pageViewData", pageViewData);
  console.log(res);
};

// Define functions to interact with eventData
export const getEventData = async (): Promise<EventRecord[]> => {
  return (await kv.get("eventData")) ?? [];
};

export const pushEventData = async (record: EventRecord) => {
  let eventData = await getEventData();
  eventData?.push(record);
  await kv.set("eventData", eventData);
};
