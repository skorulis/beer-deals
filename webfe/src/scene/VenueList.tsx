import { Text, Flex, VStack, Image } from "@chakra-ui/react";
import { Component } from "react"; 
import { Venue } from "../shared/Venue";


import {
    Link as RouteLink
  } from "react-router-dom";

export class VenueList extends Component<{venues:Venue[]}> {
    constructor(props: {venues: Venue[]}) {
        super(props);
    }

    render() {
        return <Flex direction="column">
                {this.props.venues.map(x => this.row(x))}
        </Flex>
    }

    row(venue: Venue) {
        let link = `/venue/${venue.placeID}`
        return <RouteLink to={link} key={venue.placeID}>
            <VStack>
                {this.maybeImage(venue)}
                <Text>{venue.name}</Text>
            </VStack>
            
        </RouteLink>
    }

    maybeImage(venue: Venue) {
        if (venue.imageURL) {
            return <Image src={venue.imageURL} borderRadius='full' boxSize='150px' />
        }
    }
}