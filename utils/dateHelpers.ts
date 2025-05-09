import { format, isToday as isDateToday, isSameDay as isSameDayFns, isPast as isDatePast, addDays, startOfWeek, endOfWeek } from 'date-fns';

/**
 * Format a date using date-fns
 */
export function formatDate(date: Date, formatString: string): string {
  return format(date, formatString);
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isDateToday(date);
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return isSameDayFns(date1, date2);
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date): boolean {
  // Compare dates without time
  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  
  const todayWithoutTime = new Date();
  todayWithoutTime.setHours(0, 0, 0, 0);
  
  return dateWithoutTime < todayWithoutTime;
}

/**
 * Get an array of dates for the current week (Sunday to Saturday)
 */
export function getCurrentWeekDates(): Date[] {
  const today = new Date();
  
  const start = startOfWeek(today, { weekStartsOn: 0 }); // 0 = Sunday
  const end = endOfWeek(today, { weekStartsOn: 0 }); // End of week
  
  const dates: Date[] = [];
  let currentDate = start;
  
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return dates;
}

/**
 * Get the next 7 days starting from today
 */
export function getNext7Days(): Date[] {
  const today = new Date();
  
  const dates: Date[] = [];
  
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(today, i));
  }
  
  return dates;
}