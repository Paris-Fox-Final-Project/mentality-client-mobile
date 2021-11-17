import moment from "moment";
export const formatDate = (inputDate) => {
  const schedule = moment(inputDate);
  schedule.locale("ID");
  return schedule.format("lll");
};
