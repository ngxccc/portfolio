import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatCount = (count: number): string => {
  if (count < 5) return count.toString();
  return `${Math.floor(count / 5) * 5}+`;
};
