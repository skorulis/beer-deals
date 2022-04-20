import { Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { Venue } from "../model/Venue";
import { GooglePlaceDetails } from "../shared/GooglePlaceDetails";

import {
    Link as RouteLink
  } from "react-router-dom";

export class VenueList extends Component<{venues:GooglePlaceDetails[]}> {
    constructor(props: {venues: GooglePlaceDetails[]}) {
        super(props);
    }

    render() {
        return <Flex direction="column">
                {this.props.venues.map(x => this.row(x))}
        </Flex>
    }

    row(venue: GooglePlaceDetails) {
        let link = `/venue/${venue.place_id}`
        return <RouteLink to={link} key={venue.place_id}>
            <Text>{venue.name}</Text>
        </RouteLink>
        
    }
}