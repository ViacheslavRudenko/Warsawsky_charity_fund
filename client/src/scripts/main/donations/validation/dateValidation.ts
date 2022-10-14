import { ValidationData } from "./types";

export const validateExpiryDate = (expdate: string): ValidationData => {
  const dateArr: Array<string> = expdate.split("/");
  const date = new Date();
  const month: number = +dateArr[0];
  const year: number = +dateArr[1];

  const currentMonth: number = date.getMonth();
  const currentYear: number = date.getFullYear() - 2000;

  if (month.toString().length === 0 || year.toString().length === 0) {
    return { message: "Expiry date is required (MM/YY)", success: false };
  } else if (
    month > 13 ||
    year < currentYear ||
    year > currentYear + 10 ||
    (year === currentYear && month < currentMonth + 1)
  ) {
    return { message: "Enter your valid expiry date.", success: false };
  } else {
    return { message: "", success: true };
  }
};
