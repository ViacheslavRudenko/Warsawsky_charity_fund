export const validateSum = (sum) => {
  if (sum.length === 0) {
    return { message: "Sum is required", success: false };
  } else if (sum < 5) {
    return { message: "The minimum donation amount is UAH 5", success: false };
  } else {
    return { message: "", success: true };
  }
};
