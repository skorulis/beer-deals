import { Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { Venue } from "../model/Venue";
import { GooglePlaceDetails } from "../shared/GooglePlaceDetails";

import {
    Link as RouteLink
  } from "react-router-dom";
import { PageHeader } from "./PageHeader";

export class AddDealPage extends Component<{placeID:string}> {
    constructor(props: {placeID:string}) {
        super(props);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Text>Hellow</Text>        
        </Flex>
    }

    
}