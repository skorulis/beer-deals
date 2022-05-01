import { Box, Grid, Text, Flex, VStack } from "@chakra-ui/react";
import { Component } from "react"; 
import { MainAPI } from "../service/MainAPI";
import { Venue } from "../shared/Venue";
import { PageHeader } from "./PageHeader";
import { VenueList } from "./VenueList";

interface HomePageState {
    venues: Venue[]
}

export class HomePage extends Component<{}, HomePageState> {
    constructor(props: {}) {
        super(props);
        this.state = {venues: []}
    }

    render() {
        return <Flex direction="column">
        <PageHeader />
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
                <VenueList venues={this.state.venues} />
            </VStack>
            </Grid>
        </Box>
    </Flex>
    }

    componentDidMount() {
        MainAPI.shared.getVenues().then(response => {
            let venues = response.map(x => x.venue)
            this.setState({venues: venues})
        })

    }
}