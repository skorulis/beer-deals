import { Button, Heading, Text, Flex, Image, HStack, VStack } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";
import { MainAPI } from "../service/MainAPI";
import { Venue } from "../shared/Venue";
import { Deal } from "../shared/deal/Deal";

import {
    Link as RouteLink
  } from "react-router-dom";
import { SingleDealComponent } from "./SingleDealComponent";

interface VenuePageState {
    venue?: Venue
    deals: Deal[]
}

export class VenuePage extends Component<{placeID:string}, VenuePageState> {
    constructor(props: {placeID:string}) {
        super(props);
        this.state = {venue: undefined, deals: []}
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
        console.log(this.state.venue);
        let addURL = `/venue/${this.props.placeID}/adddeal`
        return <Flex direction="column" padding={4} gap={4}>
            {this.header(venue)}
            <Flex direction="column" gap={2}>
            {this.dealList()}
            </Flex>
            <RouteLink to={addURL}>
                <Button colorScheme="blue">
                    <Text>Add Deal</Text>
                </Button>
            </RouteLink>
            
        </Flex>
    }

    header(venue: Venue) {
        return <HStack>
            {this.maybeImage()}
            <VStack alignItems="flex-start">
                <Heading>{venue.name}</Heading>
                <HStack>
                    {this.mapIcon(venue)}
                    {this.maybeWebIcon(venue)}
                </HStack>
            </VStack>
            
        </HStack>
    }

    mapIcon(venue: Venue) {
        let href = `https://www.google.com/maps/search/?api=1&query=${venue.lat}%2C${venue.lng}&query_place_id=${venue.placeID}`
        return <a href={href}>
            <Heading>🗺️</Heading>    
        </a>
    }

    maybeWebIcon(venue: Venue) {
        if (!venue.website) {
            return
        }
        return <a href={venue.website}>
            <Heading>🌐</Heading>    
        </a>
    }

    dealList() {
        return this.state.deals.map(x => {
            return <SingleDealComponent key={x.compoundID} placeID={this.props.placeID} deal={x} />
        })
    }

    componentDidMount() {
        MainAPI.shared.getVenue(this.props.placeID).then(x => {
            this.setState({venue: x.venue, deals: x.deals})
        })
    }

    maybeImage() {
        if (this.state.venue && this.state.venue.imageURL) {
            return <Image src={this.state.venue.imageURL} borderRadius='full' boxSize='150px' />
        }
    }

}