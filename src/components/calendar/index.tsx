import React, { FC, useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import classnames from 'classnames';
import CalendarHeader from './calendar-header';
import CalendarDayLabel from './calendar-day-label';
import CalendarDates from './calendar-dates';
import calendar, {
  CalendarObject,
  UserEvent,
  isSameDay,
  getNextMonth,
  getPreviousMonth,
} from './helper';
import styles from './calendar.module.scss';

interface DateObject {
  day: number;
  month: number;
  year: number;
}

interface Props {
  className?: string;
  onDateChange: (selectedDate: DateObject) => void;
  timemillis: number;
  timezone: string;
}

const initialState: CalendarObject = {
  current: DateTime.local(),
  day: DateTime.local().day,
  month: DateTime.local().month,
  year: DateTime.local().year,
};

const Calendar: FC<Props> = ({
  className,
  onDateChange,
  timemillis,
  timezone,
  ...otherProps
}) => {
  const [state, setState] = useState<CalendarObject>(initialState);

  function getDateObject(date: DateTime): CalendarObject {
    return {
      current: date,
      day: date.day,
      month: date.month,
      year: date.year,
    };
  }

  const getCalendarDates = (): Array<Array<number | string>> => {
    const { current, month, year } = state;
    const calendarMonth = month || current.month;
    const calendarYear = year || current.year;

    return calendar(calendarMonth, calendarYear);
  };

  useEffect(() => {
    setState(
      getDateObject(DateTime.fromMillis(timemillis, { zone: timezone })),
    );
  }, [timemillis, timezone]);

  useEffect(() => {
    onDateChange(state.current);
  }, [state]);

  const onDateClick = (event: UserEvent, date: DateTime): void => {
    event.preventDefault();
    const { current } = state;
    const isTheSameDay: boolean = isSameDay(date, current);

    if (!(current && isTheSameDay)) {
      setState(getDateObject(date));
    }
  };

  const goToPreviousMonth = (event: UserEvent): void => {
    event.preventDefault();
    const { month, year } = state;
    setState((s) => ({ ...s, ...getPreviousMonth(month, year) }));
  };

  const goToNextMonth = (event: UserEvent): void => {
    event.preventDefault();
    const { month, year } = state;
    setState((s) => ({ ...s, ...getNextMonth(month, year) }));
  };

  const rootClass = classnames(styles.calendar, className);

  return (
    <div className={rootClass} {...otherProps}>
      <CalendarHeader
        month={state.month}
        year={state.year}
        onLeftArrowClick={goToPreviousMonth}
        onRightArrowClick={goToNextMonth}
      />
      <div className={styles.grid}>
        <CalendarDayLabel />
        {getCalendarDates().map(
          (date: Array<number | string>, index: number) => (
            <CalendarDates
              calendarDate={state}
              date={date}
              index={index}
              key={date.toString()}
              onDateClick={onDateClick}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Calendar;
