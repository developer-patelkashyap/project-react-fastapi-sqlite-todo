// minimum length 8
export const atLeastMinimumLength = (password) =>
  new RegExp(/(?=.{8,})/).test(password);

// atleast one uppercase letter
export const atLeastOneUppercaseLetter = (password) =>
  new RegExp(/(?=.*?[A-Z])/).test(password);

// atleast one lowercase letter
export const atLeastOneLowercaseLetter = (password) =>
  new RegExp(/(?=.*?[a-z])/).test(password);

// atleast one number
export const atLeastOneNumber = (password) =>
  new RegExp(/(?=.*?[0-9])/).test(password);

// atleast on special character
export const atLeastOneSpecialChar = (password) =>
  new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);
