import {
    Heading,
    Flex,
    Text
  } from "@chakra-ui/react";

import { Component } from "react"; 

export class PageHeader extends Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return <Flex justify="space-between" padding={6} bg="yellow.500" color="white" align="center">
            <Heading as="h1" size="lg" >
                BeerDeals
            </Heading>
            <Text>Login</Text>

        </Flex>
    }
}