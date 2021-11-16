export const scheduleValidation = (dateSchedule) => {
  const schedule = Date.parse(dateSchedule);
  const today = Date.parse(new Date().toLocaleString());

  return today > schedule;
};
