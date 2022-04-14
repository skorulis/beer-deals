import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DaysComponent } from '../scene/DaysComponent';
import { DayOfWeek } from '../model/DayOfWeek';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'DaysComponent',
  component: DaysComponent,
} as ComponentMeta<typeof DaysComponent>;

const Template: ComponentStory<typeof DaysComponent> = (args) => <DaysComponent {...args} />;

export const AllDays = Template.bind({});

AllDays.args = {
  days: []
};

export const Monday = Template.bind({});

Monday.args = {
  days: [DayOfWeek.MONDAY]
};

export const ThursdaySaturday = Template.bind({});

ThursdaySaturday.args = {
  days: [DayOfWeek.THURSDAY, DayOfWeek.SATURDAY]
};

export const RunningDays = Template.bind({});

RunningDays.args = {
  days: [DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY]
};