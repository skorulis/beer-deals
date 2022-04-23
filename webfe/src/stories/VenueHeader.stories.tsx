import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VenueHeader } from '../scene/VenueHeader';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'VenueHeader',
  component: VenueHeader,
} as ComponentMeta<typeof VenueHeader>;

const Template: ComponentStory<typeof VenueHeader> = (args) => <VenueHeader {...args} />;

export const Venue1 = Template.bind({});

Venue1.args = {
    venue: {
        placeID: "ABC",
        compoundID:"PLACE#ABC",
        address: "Some place",
        name: "Rose",
        lat: 1,
        lng: 1,
        suburb: "Erskineville"
    }
};
