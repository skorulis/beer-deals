import { Box, Text } from "grommet";
import { Component } from "react"; 
import { Venue } from "../model/Venue";

export class VenueHeader extends Component<{venue:Venue}> {
    constructor(props: {venue: Venue}) {
        super(props);
    }

    render() {
        return <Box direction="row">
            <Box>
                <Text>{this.props.venue.name}</Text>
                <Text>{this.props.venue.suburb}</Text>
            </Box>
        </Box>
    }
}