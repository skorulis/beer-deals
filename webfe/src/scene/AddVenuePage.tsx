import { Button, Center, Text, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";
import { MainAPI } from "../service/MainAPI";
import { GooglePlacePrediction } from "../model/GooglePlacePrediction";
import { VenueSearchRow } from "./VenueSearchRow";

type AddVenuePageState = {
    query: string
    api: MainAPI
    results: GooglePlacePrediction[]
}

export class AddVenuePage extends Component<{}, AddVenuePageState> {


    constructor(props: {}) {
        super(props);
        this.state = {
            query: "",
            api: new MainAPI(),
            results: []
        }
        this.search = this.search.bind(this);
        this.queryChanged = this.queryChanged.bind(this);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Center>
                <Flex direction="column">
                    <Heading>Add a new venue</Heading>
                    <Flex direction="row" gap={2}>
                        <Input value={this.state.query} placeholder="Venue name" onChange={this.queryChanged}></Input>
                        <Button onClick={this.search}><Text>Search</Text></Button>
                    </Flex>
                    {this.results()}
                </Flex>
                
            </Center>
            
            
        </Flex>
    }

    results() {
        return <VStack pt={8}>
            {this.state.results.map(x => <VenueSearchRow venue={x} />) }
        </VStack>
    }

    addVenue(venue: GooglePlacePrediction) {

    }

    queryChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ query: event.currentTarget.value })
    }

    search() {
        let result = this.state.api.autocomplete(this.state.query)
        result.then(output => {
            this.setState({
                results: output.predictions
            })
            console.log(output)
        })
    }
}