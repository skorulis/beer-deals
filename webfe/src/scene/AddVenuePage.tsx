import { Button, Center, Text, Flex, Heading, Input } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";
import { GoogleAPI } from "../service/GoogleAPI";

type AddVenuePageState = {
    api: GoogleAPI
}

export class AddVenuePage extends Component<{}, AddVenuePageState> {


    constructor(props: {}) {
        super(props);
        this.state = {
            api: new GoogleAPI()
        }
        this.search = this.search.bind(this);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Center>
                <Flex direction="column">
                    <Heading>Add a new venue</Heading>
                    <Flex direction="row" gap={2}>
                        <Input placeholder="Venue name"></Input>
                        <Button onClick={this.search}><Text>Search</Text></Button>
                    </Flex>
                </Flex>
                
            </Center>
            
            
        </Flex>
    }

    search() {
        let result = this.state.api.autocomplete("test")
        result.then(output => {
            console.log(output)
        })
    }
}