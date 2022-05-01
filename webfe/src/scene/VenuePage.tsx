import { Button, Heading, Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";
import { MainAPI } from "../service/MainAPI";
import { Venue } from "../shared/Venue";
import { Deal } from "../shared/Deal";

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
        let addURL = `/venue/${this.props.placeID}/adddeal`
        return <Flex direction="column" padding={4} gap={4}>
            <Heading>{venue.name}</Heading>
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

}