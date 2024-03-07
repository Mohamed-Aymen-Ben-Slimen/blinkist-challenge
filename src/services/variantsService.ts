import variations from "@/lib/variations";

export const getVariantId = (): string => {
  // Check if the user has already been assigned a variation
  const storedVariationId = localStorage.getItem("variation");
  if (storedVariationId) {
    return storedVariationId;
  }

  // If not assigned, randomly assign a variation and store it
  const randomIndex = Math.floor(Math.random() * variations.length);
  const selectedVariationId = variations[randomIndex].id;
  localStorage.setItem("variation", selectedVariationId);
  return selectedVariationId;
};
