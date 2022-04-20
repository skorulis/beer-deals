import { Button, Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";
import { MainAPI } from "../service/MainAPI";
import { GooglePlaceDetails } from "../shared/GooglePlaceDetails";

import {
    Link as RouteLink
  } from "react-router-dom";

interface VenuePageState {
    venue?: GooglePlaceDetails
}

export class VenuePage extends Component<{placeID:string}, VenuePageState> {
    constructor(props: {placeID:string}) {
        super(props);
        this.state = {venue: undefined}
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            {this.maybeDetails()}
        </Flex>
    }

    maybeDetails() {
        let venue = this.state.venue
        if (!venue) {
            return undefined
        }
        let addURL = `/venue/${this.props.placeID}/adddeal`
        return <Flex direction="column">
            <Text>{venue.name}</Text>
            <RouteLink to={addURL}>
                <Button colorScheme="blue">
                    <Text>Add Deal</Text>
                </Button>
            </RouteLink>
            
        </Flex>
    }

    componentDidMount() {
        MainAPI.shared.getVenue(this.props.placeID).then(x => {
            this.setState({venue: x})
        })

    }

}