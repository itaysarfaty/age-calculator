export function getDaysInMonth(month: number): number {
  if (month < 1 || month > 12) return 31;

  const daysInMonth = [
    31, // January
    28, // February (assuming a non-leap year)
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
  ];

  // Adjust February for leap years (29 days)
  if (isLeapYear() && month === 2) {
    return 29;
  }

  return daysInMonth[month - 1];
}

function isLeapYear(): boolean {
  const year = new Date().getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
