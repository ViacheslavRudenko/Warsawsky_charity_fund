export const validateExpiryDate = (expdate) => {
  const dateArr = expdate.split("/");
  const date = new Date();
  const month = dateArr[0];
  const year = dateArr[1];

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear() - 2000;

  if (month.length === 0 || year.length === 0) {
    return { message: "Expiry date is required (MM/YY)", success: false };
  } else if (
    month > 13 ||
    year < currentYear ||
    year > currentYear + 10 ||
    (year == currentYear && month < currentMonth + 1)
  ) {
    return { message: "Enter your valid expiry date.", success: false };
  } else {
    return { message: "", success: true };
  }
};
