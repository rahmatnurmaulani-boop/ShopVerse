export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://fakestoreapi.com";
export const TOAST_DURATION =
  Number(import.meta.env.VITE_TOAST_DURATION) || 3000;
export const BEST_SELLER_RATING_THRESHOLD =
  Number(import.meta.env.VITE_BEST_SELLER_RATING) || 4.0;
export const BEST_SELLER_LIMIT =
  Number(import.meta.env.VITE_BEST_SELLER_LIMIT) || 4;

export const ITEMS_PER_PAGE = 8;
