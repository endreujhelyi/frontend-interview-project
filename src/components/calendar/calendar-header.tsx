import React, { FC } from 'react';
import { DateTime } from 'luxon';
import Avatar from '../avatar';
import { UserEvent } from './helper';
import styles from './calendar.module.scss';

interface Props {
  month: number | undefined;
  onLeftArrowClick: (event: UserEvent) => void;
  onRightArrowClick: (event: UserEvent) => void;
  year: number | undefined;
}

const CalendarHeader: FC<Props> = ({
  month,
  onLeftArrowClick,
  onRightArrowClick,
  year,
}) => {
  function onLeftArrowKeyDown(
    event: React.KeyboardEvent<HTMLSpanElement>,
  ): void {
    if (event.key === 'Enter') {
      onLeftArrowClick(event);
    }
  }

  function onRightArrowKeyDown(
    event: React.KeyboardEvent<HTMLSpanElement>,
  ): void {
    if (event.key === 'Enter') {
      onLeftArrowClick(event);
    }
  }

  return (
    <div className={styles.header}>
      <span
        className={styles.icon}
        onClick={onLeftArrowClick}
        onKeyDown={onLeftArrowKeyDown}
        role="button"
        tabIndex={0}
      >
        <Avatar iconKey="arrow-left" color="#7BC4A9" />
      </span>
      <span className={styles.month}>
        {`${DateTime.fromObject({ month }).toFormat('LLLL')} `}
        {`'${DateTime.fromObject({ year }).toFormat('yy')}`}
      </span>

      <span
        className={styles.icon}
        onClick={onRightArrowClick}
        onKeyDown={onRightArrowKeyDown}
        role="button"
        tabIndex={0}
      >
        <Avatar iconKey="arrow-right" color="#7BC4A9" />
      </span>
    </div>
  );
};

function isEqual(prevProps: Props, nextProps: Props): boolean {
  return (
    prevProps.month === nextProps.month && prevProps.year === nextProps.year
  );
}

export default React.memo(CalendarHeader, isEqual);
