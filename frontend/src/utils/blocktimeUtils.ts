// Converts block time to string MMM/YYYY
export const blocktimeToDate = (e: number): string => {
  var a = new Date(e * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    a.getDate().toString() +
    " " +
    months[a.getMonth()] +
    " " +
    a.getFullYear().toString()
  );
};

// Calculates the number of days since a blocktime.
// Rounds down, so a blocktime 23 hours ago returns 0.
export const daysSinceBlocktime = (e: number): number => {
  const currentDate = new Date();
  const epocDate = new Date(e * 1000);
  const dayDiff = Math.abs(currentDate.getTime() - epocDate.getTime()) / 1000;
  return Math.floor(dayDiff / 86400);
};

// Converts seconds to a time string.
// If time is >= 1 minute, returns hours, minutes. For example 5h 37m.
// If time is >= 1 minute and < 1 hour, returns minutes and seconds. For example 5m 12s.
// If time is < 1 minute, returns seconds. For example 45s.
export const secondsToTime = (e: number): string => {
  var h = Math.floor(e / 3600).toString(),
    m = Math.floor((e % 3600) / 60).toString(),
    s = Math.floor(e % 60).toString();

  if (h === "0" && m === "0") {
    return s + "s";
  } else if (h === "0" && m !== "0") {
    return m + "m " + s + "s";
  } else {
    return h + "h " + m + "m";
  }
};
