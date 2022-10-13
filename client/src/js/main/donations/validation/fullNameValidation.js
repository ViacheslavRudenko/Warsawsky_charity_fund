export const validateFullName = (name) => {
  const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (name.length === 0) {
    return { message: "Full Name is required", success: false };
  } else if (!regName.test(name)) {
    return { message: "Enter your valid full name.", success: false };
  } else {
    return { message: "", success: true };
  }
};
