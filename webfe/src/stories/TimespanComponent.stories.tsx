import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TimespanComponent } from '../scene/TimespanComponent';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'TimespanComponent',
  component: TimespanComponent,
} as ComponentMeta<typeof TimespanComponent>;

const Template: ComponentStory<typeof TimespanComponent> = (args) => <TimespanComponent {...args} />;

export const AllDay = Template.bind({});

AllDay.args = {
  start: undefined,
  end: undefined
};

export const NormalSpan = Template.bind({});

NormalSpan.args = {
  start: 1000,
  end: 1200
};

export const NoEnd = Template.bind({});

NoEnd.args = {
  start: 1000,
  end: undefined
};

