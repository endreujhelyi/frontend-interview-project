import React from 'react';
import { DateTime } from 'luxon';
import { action } from '@storybook/addon-actions';
import Calendar from '../components/calendar';

export default {
  title: 'Calendar',
};

export const regular: React.FC = () => (
  <Calendar
    timemillis={DateTime.local().toMillis()}
    timezone={DateTime.local().toFormat('z')}
    onDateChange={action('onDateChange')}
  />
);
