export const formatDate = (inputDate) => {
  const [date, time] = new Date(inputDate).toString().split("GMT+0700 (WIB)");
  return `${date} ${time}`;
};
