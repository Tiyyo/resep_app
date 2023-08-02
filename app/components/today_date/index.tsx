import getTodayDate from "~/utils/get.today.date";

export default function TodayDate() {
  return <div className="text-11 font-bold">Today, {getTodayDate()}</div>;
}
