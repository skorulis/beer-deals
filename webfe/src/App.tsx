import React from 'react';
import { Box, Button, Heading, Grommet } from 'grommet';
import { Notification } from 'grommet-icons';
import { DealCard } from './scene/DealCard';
import { VenueDealsComponent } from './scene/VenueDealsComponent';
import { venueDeals1 } from './model/TestModels';


const theme = {
  global: {
    colors: {
      brand: '#ff8BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props: any) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
    />
  );

function App() {
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level='3' margin='none'>My App</Heading>
          
        </AppBar>
        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
          <Box flex align='center' justify='center'>
          <VenueDealsComponent deals={venueDeals1()} />
          <DealCard></DealCard>
          <DealCard></DealCard>
          </Box>
          <Box
            width='medium'
            background='light-2'
            elevation='small'
            align='center'
            justify='center'
          >
            sidebar
            </Box>
        </Box>
      </Box>
     
    </Grommet>
  );
}

export default App;
