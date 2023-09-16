export const convertDateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
};

export const convertDateToString = (date: any) => {
  const newDate = new Date(date);
  return newDate.getDate() + '-' + newDate.getMonth() + '-' + newDate.getFullYear();
};
