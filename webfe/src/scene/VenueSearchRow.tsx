import { Button, Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { GooglePlacePrediction } from "../model/GooglePlacePrediction";
import { Venue } from "../shared/Venue";
import { MainAPI } from "../service/MainAPI";
import { useNavigate, NavigateFunction } from "react-router-dom";

export function VenueSearchRowHOC(props: {venue:GooglePlacePrediction}) {
    const navigation = useNavigate()
    return <VenueSearchRow venue={props.venue} navigation={navigation} />
}

export class VenueSearchRow extends Component<{venue:GooglePlacePrediction, navigation: NavigateFunction}> {
    constructor(props: {venue:GooglePlacePrediction, navigation: NavigateFunction}) {
        super(props);
        this.addVenue = this.addVenue.bind(this);
    }

    render() {
        return <Flex align="center" direction="row" gap={2}>
            <Text>{this.props.venue.description}</Text>
            <Button onClick={this.addVenue}>Add</Button>
        </Flex>
    }

    async addVenue() {
        let result = await MainAPI.shared.addVenue(this.props.venue)
        this.props.navigation(`/venue/${result.placeID}`)
    }
}