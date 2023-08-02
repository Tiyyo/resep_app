const getTodayDate = () => {
  const today = new Date();
  const todayFormated = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "Europe/Paris",
  }).format(today);
  return todayFormated;
};

export default getTodayDate;
