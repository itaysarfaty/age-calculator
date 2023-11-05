// Calculate age today and return Years / Months / Days
export function calculateAge({
  month,
  day,
  year,
}: {
  month: number;
  day: number;
  year: number;
}) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // If the birth month is after the current month, subtract a year
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  // If the birth day is after the current day, subtract a month
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  return {
    years: years.toString(),
    months: months.toString(),
    days: days.toString(),
  };
}
