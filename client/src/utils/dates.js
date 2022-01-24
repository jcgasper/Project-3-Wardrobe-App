export const dateToDateString = (date) => {
  if (!date || !(date instanceof Date)) {
    return null;
  }

  return date.getFullYear() + '-' + getMonthAs2Digits(date) + '-' + getDayOfMonthAs2Digits(date)
}

export const getMonthAs2Digits = (date) => {
  const month = (date.getMonth() + 1).toString();
  return (month.length === 1) ? ('0' + month) : (month);
}

export const getDayOfMonthAs2Digits = (date) => {
  const day = date.getDate().toString();
  return (day.length === 1) ? ('0' + day) : (day);
}