import { ValidationData } from "./types";

export const validateCvvCode = (cvv: number): ValidationData => {
  if (cvv.toString().length === 0) {
    return { message: "Cvv is required", success: false };
  } else if (cvv.toString().length < 3) {
    return { message: "Enter your valid cvv.", success: false };
  } else {
    return { message: "", success: true };
  }
};
