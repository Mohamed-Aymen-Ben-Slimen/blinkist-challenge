"use client";

import Image from "next/image";
import * as analyticsApi from "../services/analytics-api";
import { ReactElement, useEffect, useRef, useState } from "react";
import variations from "@/lib/variations";
import React from "react";
import { getVariantId } from "@/services/variantsService";

export default function Home() {
  const [assignedVariation, setAssignedVariation] =
    useState<string>("control-variation");
  const [assignedComponent, setAssignedComponent] = useState<ReactElement>();

  useEffect(() => {
    const selectedVariationId = getVariantId();

    console.log("selectedVariationId", selectedVariationId);

    setAssignedVariation(selectedVariationId);

    // Find the component to render based on assigned variation
    const assignedVariationObject = variations.find(
      (variation) => variation.id === selectedVariationId
    );

    if (assignedVariationObject) {
      setAssignedComponent(assignedVariationObject.component);
    } else {
      // If the component was not found, assign control variation which is the default component
      const controlVariationComponent = variations.find(
        (variation) => variation.id === "control-variation"
      )?.component;
      setAssignedComponent(controlVariationComponent);
    }

    // Communicate with the API to track page view when the page is displayed
    trackPageView(selectedVariationId);
  }, []);

  const trackPageView = (variationId: string) => {
    analyticsApi.trackPageView({
      url: window.location.href, // Current url
      variationId,
    });
  };

  const trackSignUpClick = (variationId: string) => {
    analyticsApi.trackEvent({
      url: window.location.href,
      eventName: "Sign-Up-Click",
      variationId,
    });
  };

  return (
    <main className="bg-white">
      {assignedComponent ? (
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Check out the Blinkist app
            </h1>
            <div className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-2xl">
              {assignedComponent}
            </div>

            <button
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
              onClick={() => trackSignUpClick(assignedVariation)}
            >
              Sign Up
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              width="500"
              height="200"
              src="/hero_image.jpg"
              alt="Check out the Blinkist app"
            />
          </div>
        </div>
      ) : (
        <div className="text-center w-full fixed top-1/2 -translate-y-1/2">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </main>
  );
}
