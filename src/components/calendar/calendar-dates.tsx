import React, { FC } from 'react';
import { DateTime } from 'luxon';
import classnames from 'classnames';
import {
  CalendarArray,
  CalendarObject,
  UserEvent,
  isSameDay,
  isSameMonth,
} from './helper';
import styles from './calendar.module.scss';

interface Props {
  date: CalendarArray;
  index: number;
  calendarDate: CalendarObject;
  onDateClick: (e: UserEvent, dateObject: DateTime) => void;
}

const CalendarDate: FC<Props> = ({
  date,
  index,
  calendarDate: { current, year, month },
  onDateClick,
}): JSX.Element => {
  const dateObject = DateTime.fromSQL(date.join('-'));

  const isSelected = isSameDay(dateObject, current);
  const isToday = isSameDay(dateObject, DateTime.local());

  const inMonth =
    month &&
    year &&
    isSameMonth(dateObject, DateTime.fromObject({ year, month, day: 1 }));

  function onKeyDown(e: React.KeyboardEvent<HTMLSpanElement>): void {
    if (e.key === 'Enter') {
      onDateClick(e, dateObject);
    }
  }

  const rootClass = classnames(styles.date, styles.gridItem, {
    [styles.dateInMonth]: inMonth,
    [styles.dateActive]: isSelected,
    [styles.dateToday]: isToday,
  });

  return (
    <span
      className={rootClass}
      key={index}
      onClick={(e): void => onDateClick(e, dateObject)}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
    >
      {dateObject.day}
    </span>
  );
};

export default CalendarDate;
