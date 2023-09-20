export const convertDateToString = (date: any, separator: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const day = newDate.getDate().toString().padStart(2, '0');
  return `${day}${separator}${month}${separator}${year}`;
};

export const timeAgoFromDate = (inputDate: string): string => {
  const inputDateTime = new Date(inputDate);
  const currentDateTime = new Date();

  const timeDifference = currentDateTime.getTime() - inputDateTime.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference > 0) {
    return `${daysDifference}d${daysDifference > 1 ? 's' : ''} ago`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}h ago`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference}minute ago`;
  } else {
    return `just now`;
  }
};
