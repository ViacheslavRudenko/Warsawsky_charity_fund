export const validateExpiryDate = (month, year) => {
  const date = new Date();
  console.log(date.getMonth());
  if (month.length === 0 || year.length === 0) {
    return { message: "Expiry date is required", success: false };
  } else if (
    month > 13 ||
    year < date.getFullYear() ||
    (year == date.getFullYear() && month < date.getMonth() + 1)
  ) {
    return { message: "Enter your valid expiry date.", success: false };
  } else {
    return { message: "", success: true };
  }
};
