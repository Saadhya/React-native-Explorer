export const isStringValid = (str: string[]): boolean => {
  // return str && str.trim() !== "";
  for (const s of str) {
    if (!s || s.trim() === "") {
      return false;
    }
  }
  return true;
};
