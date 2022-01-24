export const dateToDateString = (date) => {
  if (!date || !(date instanceof Date)) {
    return null;
  }

  return date.toISOString().split('T')[0]
}
