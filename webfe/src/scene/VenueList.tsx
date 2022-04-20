import { Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { Venue } from "../model/Venue";

export class VenueList extends Component<{venues:Venue[]}> {
    constructor(props: {venues: Venue[]}) {
        super(props);
    }

    render() {
        return <Flex direction="column">
                <Text>A list of venues</Text>
        </Flex>
    }
}