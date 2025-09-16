export const isStringValid = (str: string[]): boolean => {
  // return str && str.trim() !== "";
  for (const s of str) {
    if (!s || s.trim() === "") {
      return false;
    }
  }
  return true;
};
export const getFormattedPhoneNumber = (number: any) => {
  number = number.replace("+91", "");
  let num = "";
  for (const n of number) {
    if (n === "(" || n === ")" || n === "-" || n === " ") {
      continue;
    }
    num += n;
  }
  return num;
};
