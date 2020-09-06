import React, { FC } from 'react';
import { DateTime } from 'luxon';
import classnames from 'classnames';
import styles from './calendar.module.scss';

const CalendarDayLabel: FC = () => {
  const dayNumbers = Array(7)
    .fill(0)
    .map((_item, index) => index + 1);

  const rootClass = classnames([styles.weekday], [styles.gridItem]);

  return (
    <>
      {dayNumbers.map((weekday) => (
        <div className={rootClass} key={weekday}>
          {DateTime.fromObject({ weekday })
            .toFormat('ccc')
            .toUpperCase()}
        </div>
      ))}
    </>
  );
};

export default React.memo(CalendarDayLabel);
