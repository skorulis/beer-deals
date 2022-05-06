import { Button, Center, Text, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import { Component, KeyboardEventHandler } from "react"; 
import { PageHeader } from "./PageHeader";
import { MainAPI } from "../service/MainAPI";
import { GooglePlacePrediction } from "../model/GooglePlacePrediction";
import { VenueSearchRow } from "./VenueSearchRow";
import { MainContext } from "../service/MainProvider"


type AddVenuePageState = {
    query: string
    api: MainAPI
    results: GooglePlacePrediction[]
}

export class AddVenuePage extends Component<{}, AddVenuePageState> {
    static contextType = MainContext;

    constructor(props: {}) {
        super(props);
        this.state = {
            query: "",
            api: new MainAPI(),
            results: []
        }
        this.search = this.search.bind(this);
        this.queryChanged = this.queryChanged.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Center>
                <Flex direction="column">
                    <Heading>Add a new venue</Heading>
                    <Flex direction="row" gap={2}>
                        <Input value={this.state.query} onKeyUp={this.keyPressed} placeholder="Venue name" onChange={this.queryChanged}></Input>
                        <Button onClick={this.search}><Text>Search</Text></Button>
                    </Flex>
                    {this.results()}
                </Flex>
                
            </Center>
            
            
        </Flex>
    }

    results() {
        return <VStack pt={8}>
            {this.state.results.map(x => <VenueSearchRow key={x.place_id} venue={x} />) }
        </VStack>
    }

    queryChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ query: event.currentTarget.value })
    }

    keyPressed(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.key == "Enter") {
            this.search()
        }
    }

    search() {
        let loc = this.context.location;
        console.log(loc)
        let result = this.state.api.autocomplete(this.state.query, this.context.location)
        result.then(output => {
            this.setState({
                results: output.predictions
            })
            console.log(output)
        })
    }
}