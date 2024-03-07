/* 
    Lowdb is used as a lightway data storage.
    A real database should be used in a real application.
*/

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

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

interface DbSchema {
  pageViewData: PageViewRecord[];
  eventData: EventRecord[];
}

const adapter = new JSONFile<DbSchema>("db.json");
const db = new Low<DbSchema>(adapter, {
  pageViewData: [],
  eventData: [],
});

export const getPageViewData = (): PageViewRecord[] => db.data.pageViewData;
export const pushPageViewData = (record: PageViewRecord): void => {
  db.data.pageViewData.push(record);
  db.write();
};

export const getEventData = (): EventRecord[] => db.data.eventData;
export const pushEventData = (record: EventRecord): void => {
  db.data.eventData.push(record);
  db.write();
};
