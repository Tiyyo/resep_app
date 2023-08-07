const formatDate = (date: Date) => {
  const newDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(date));
  return newDate;
};

export default formatDate;
