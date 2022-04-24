import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SingleDealComponent } from '../scene/SingleDealComponent';
import { DayOfWeek } from '../shared/DayOfWeek';

export default {
  title: 'SingleDealComponent',
  component: SingleDealComponent,
} as ComponentMeta<typeof SingleDealComponent>;

const Template: ComponentStory<typeof SingleDealComponent> = (args) => <SingleDealComponent {...args} />;

export const Example1 = Template.bind({});

Example1.args = {
  deal: {
    //placeID: "123",
    compoundID: "ABC",
    days: [1,2],
    text: "12pm-4pm Tuesday and Wednesday - $18 250g Rump With your choice of two sides and sauce",
    timeStart: 100,
    timeEnd: 200
  }
};

