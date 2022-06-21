import { Button, Text, Flex, VStack } from "@chakra-ui/react";
import { Component } from "react"; 
import { MainAPI } from "../service/MainAPI";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { VenueAutocomplete } from "../shared/venue/VenueAutocomplete";

export function VenueSearchRowHOC(props: {venue:VenueAutocomplete}) {
    const navigation = useNavigate()
    return <VenueSearchRow venue={props.venue} navigation={navigation} />
}

export class VenueSearchRow extends Component<{venue:VenueAutocomplete, navigation: NavigateFunction}> {
    constructor(props: {venue:VenueAutocomplete, navigation: NavigateFunction}) {
        super(props);
        this.addVenue = this.addVenue.bind(this);
    }

    render() {
        let address;
        if (this.props.venue.address) {
            address = <Text color="secondary" >{this.props.venue.address}</Text>
        }
        return <Flex align="center" direction="row" gap={2}>
            <VStack alignItems="flex-start">
                <Text>{this.props.venue.description}</Text>
                {address}
            </VStack>
            
            <Button onClick={this.addVenue}>Add</Button>
        </Flex>
    }

    async addVenue() {
        let result = await MainAPI.shared.addVenue(this.props.venue)
        this.props.navigation(`/venue/${result.placeID}`)
    }
}