import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SingleDealComponent } from '../scene/SingleDealComponent';
import { DealStatus } from '../shared/deal/Deal';

export default {
  title: 'SingleDealComponent',
  component: SingleDealComponent,
} as ComponentMeta<typeof SingleDealComponent>;

const Template: ComponentStory<typeof SingleDealComponent> = (args) => <SingleDealComponent {...args} />;

export const Example1 = Template.bind({});

Example1.args = {
  placeID: "TEST",
  deal: {
    status: DealStatus.new,
    compoundID: "ABC",
    created: new Date(),
    days: [1,2],
    features: [1, 3],
    text: "12pm-4pm Tuesday and Wednesday - $18 250g Rump With your choice of two sides and sauce",
    timeStart: 100,
    timeEnd: 200
  }
};

