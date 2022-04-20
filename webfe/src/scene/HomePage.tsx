import { Box, Grid, Text, Flex, VStack } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";
import { VenueList } from "./VenueList";

export class HomePage extends Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return <Flex direction="column">
        <PageHeader />
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
                <VenueList venues={[]} />
            </VStack>
            </Grid>
        </Box>
    </Flex>
    }
}