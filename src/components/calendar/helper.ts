/* @flow */

import { DateTime } from 'luxon';

export type CalendarArray = Array<number | string>;

export type UserEvent =
  | React.MouseEvent<HTMLSpanElement>
  | React.KeyboardEvent<HTMLSpanElement>;

export interface CalendarObject {
  current: DateTime;
  day: number;
  month: number;
  year: number;
}

export interface MonthObject {
  month: number;
  year: number;
}

const THIS_YEAR: number = DateTime.local().year;
const THIS_MONTH: number = DateTime.local().month;

const zeroPad = (value: number): string => `${value}`.padStart(2, '0');

const getMonthDays = (
  month: number = THIS_MONTH,
  year: number = THIS_YEAR,
): number => DateTime.local(year, month).daysInMonth;

const getMonthFirstDay = (
  month: number = THIS_MONTH,
  year: number = THIS_YEAR,
): number =>
  parseInt(DateTime.fromObject({ year, month, day: 1 }).toFormat('c'), 10);

export const isSameMonth = (
  currentDate: DateTime,
  basedate: DateTime,
): boolean => {
  if (!(currentDate.isValid && basedate.isValid)) {
    return false;
  }

  const basedateMonth = basedate.month;
  const basedateYear = basedate.year;

  const dateMonth = currentDate.month;
  const dateYear = currentDate.year;

  return basedateMonth === dateMonth && basedateYear === dateYear;
};

export const isSameDay = (
  currentDate: DateTime,
  basedate: DateTime,
): boolean => {
  if (!(currentDate.isValid && basedate.isValid)) {
    return false;
  }

  const basedateDay = basedate.day;
  const basedateMonth = basedate.month;
  const basedateYear = basedate.year;

  const dateDay = currentDate.day;
  const dateMonth = currentDate.month;
  const dateYear = currentDate.year;

  return (
    basedateDay === dateDay &&
    basedateMonth === dateMonth &&
    basedateYear === dateYear
  );
};

export const getPreviousMonth = (month: number, year: number): MonthObject => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month: number, year: number): MonthObject => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

const getWeeksToDisplay = (
  monthDays: number,
  monthFirstDay: number,
): number => {
  return Math.ceil((monthDays + monthFirstDay - 1) / 7);
};

export default (
  month: number = THIS_MONTH,
  year: number = THIS_YEAR,
): Array<CalendarArray> => {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    getWeeksToDisplay(monthDays, monthFirstDay) * 7 -
    (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year,
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((_n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth), zeroPad(day)];
  });

  const thisMonthDates = [...new Array(monthDays)].map((_n, index) => {
    const day = index + 1;
    return [year, zeroPad(month), zeroPad(day)];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((_n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth), zeroPad(day)];
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
