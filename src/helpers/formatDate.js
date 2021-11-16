export const formatDate = (inputDate) => {
  const date = inputDate.split("T")[0];
  const time = inputDate.split("T")[1].split(".")[0];
  return `${date} ${time}`;
};
