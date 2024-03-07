/* 
    Variables in this file used to mimic a database.
    A real database should be used in a real application.
*/

interface PageViewRecord {
  url: string;
  variationId: string;
  userId: string;
  timestamp: Date;
}

let pageViewData: PageViewRecord[] = [];

export const getPageViewData = () => pageViewData;
export const pushPageViewData = (record: PageViewRecord) =>
  pageViewData.push(record);

interface EventRecord {
  url: string;
  eventName: string;
  variationId: string;
  userId: string;
  timestamp: Date;
}

let eventData: EventRecord[] = [];

export const getEventData = () => eventData;
export const pushEventData = (record: EventRecord) => eventData.push(record);
