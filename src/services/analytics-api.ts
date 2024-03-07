import { getUserId } from "./userService";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const trackPageView = (params: {
  url: string;
  variationId: string;
}): Promise<Response> => {
  return fetch("/api/pageview", {
    headers,
    method: "POST",
    body: JSON.stringify({
      url: params.url,
      variationId: params.variationId,
      userId: getUserId(),
    }),
  });
};

export const trackEvent = (params: {
  url: string;
  eventName: string;
  variationId: string;
}) => {
  return fetch("/api/event", {
    headers,
    method: "POST",
    body: JSON.stringify({
      url: params.url,
      variationId: params.variationId,
      eventName: params.eventName,
      userId: getUserId(),
    }),
  });
};
