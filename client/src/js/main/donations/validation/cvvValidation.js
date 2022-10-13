export const validateCvvCode = (cvv) => {
  if (cvv.length === 0) {
    return { message: "Cvv is required", success: false };
  } else if (cvv.length < 3) {
    return { message: "Enter your valid cvv.", success: false };
  } else {
    return { message: "", success: true };
  }
};
