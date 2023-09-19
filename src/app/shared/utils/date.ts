export const convertDateToString = (date: any, separator: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const day = newDate.getDate().toString().padStart(2, '0');
  return `${day}${separator}${month}${separator}${year}`;
};
