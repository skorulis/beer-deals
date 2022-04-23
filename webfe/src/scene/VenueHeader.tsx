import { Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { Venue } from "../shared/Venue";

export class VenueHeader extends Component<{venue:Venue}> {
    constructor(props: {venue: Venue}) {
        super(props);
    }

    render() {
        return <Flex direction="column">
                <Text>{this.props.venue.name}</Text>
                <Text>{this.props.venue.suburb}</Text>
        </Flex>
    }
}