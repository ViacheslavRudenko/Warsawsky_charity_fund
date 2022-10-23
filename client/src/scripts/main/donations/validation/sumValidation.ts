import { ValidationData } from "./types";

export const validateSum = (sum: number): ValidationData => {
  if (sum.toString().length === 0) {
    return { message: "Sum is required", success: false };
  } else if (sum < 5) {
    return { message: "The minimum donation amount is UAH 5", success: false };
  } else {
    return { message: "", success: true };
  }
};
