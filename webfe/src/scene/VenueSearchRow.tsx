import { Button, Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { GooglePlacePrediction } from "../model/GooglePlacePrediction";
import { Venue } from "../model/Venue";
import { MainAPI } from "../service/MainAPI";

export class VenueSearchRow extends Component<{venue:GooglePlacePrediction}> {
    constructor(props: {venue:GooglePlacePrediction}) {
        super(props);
        this.addVenue = this.addVenue.bind(this);
    }

    render() {
        return <Flex align="center" direction="row" gap={2}>
            <Text>{this.props.venue.description}</Text>
            <Button onClick={this.addVenue}>Add</Button>
        </Flex>
    }

    addVenue() {
        MainAPI.shared.addVenue(this.props.venue).then(output =>
            console.log(output)
        )
    }
}