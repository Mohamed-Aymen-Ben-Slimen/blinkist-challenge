## Getting Started

### Run the project locally

To run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployed project

- The project is deployed on Vercel on this link [https://blinkist-challenge.vercel.app](https://blinkist-challenge.vercel.app)
- You can see the calculated analytics on this link [https://blinkist-challenge.vercel.app/api/analytics](https://blinkist-challenge.vercel.app/api/analytics)

## Description

The project is realized with NextJS. 

### Frontend

- When the user visits the page, the app randomly picks one of the variants from `/src/lib/variants.ts` and displays it and saves the selected variant ID in LocalStorage. When the page is reloaded, the app checks for the saved variant ID and displays the variant component according to that.
- The app checks if the user has an ID in LocalStorage or not. If not, an ID is generated and saved in LocalStorage. User ID is used to ensure that the counts for CTR computation is unique per user. 
- When the page is displayed to the user, a request is sent to `/pageview` endpoint to record a page view.
- When a user clicks on the sign up button, a request is sent to `/event` endpoint to record a click.

* Is it easy for content editors to edit the variation components?
- Yes, variation components are in the `/src/components/` folder, content editors edit the JSX (HTML) files.
- They can edit the variation id for a specific component if needed in the `/src/lib/variants.ts` file.
- They can add a new component and add it to the list in `/src/lib/variants.ts`.

### Backend

I used the NextJS api feature to mimic the web analytics tool. 3 endpoints are implemented:
- `/pageview`: This endpoint that saves a record of a page view, this is the input of the endpoint:
```
{
  url: string; // URL of the page  visited by the user
  variationId: string; // ID of variation
  userId: string; // User ID
}
```
- `/event`: This endpoint that saves a record of events (clicks), this is the input of the endpoint:
```
{
  url: string; // URL of the page  visited by the user
  variationId: string; // ID of variation
  userId: string; // User ID
  eventName: string; // The name of the event
}
```
- `/analytics`: This endpoint returns the calculated analytics related to variants (number of views, number of clicks, CTR).
This endpoint is not efficient as it calculates the analytics when it is requested but it is implemented like that for simplicity to mimic the analytics tool.

* How is CTR calculated?
- We have records of all pages views and all clicks with data schema defined above.
- We filter event records to include only records where users clicked on the "Sign Up" button.
- Unique users who clicked the "Sign-Up" button and unique page views per variation ID are counted.
- For each variation ID, the number of unique clicks and unique page views are determined.
- CTR is calculated by dividing the number of unique clicks by the number of unique page views.


### Things I want to improve

- Integrate a solid database (PostgreSQL, MySQL, MongoDB, ...) instead of Vercel KV
- Add data validation in api routes.
- Add a web page to display the analytics like: the variant with the best CTR, the number of users that saw each variant, number of clicks, ...

