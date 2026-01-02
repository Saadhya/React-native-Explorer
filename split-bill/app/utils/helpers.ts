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
export const activityTextGenerator = ( expenseFor: string, expenseId: number, amount: number, groupId: number|null, userIds: string[]) => {
    if(expenseFor === "GROUP"){
        return `Expense with id ${expenseId} added in group ${groupId} amount ₹${amount}`;
    }
    else{
        return `Expense with id ${expenseId} is shared with user ids ${userIds[0]} and ${userIds[1]}, Amount ${amount}`;
    }
}