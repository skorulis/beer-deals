import { Button, Center, Text, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";
import { MainAPI } from "../service/MainAPI";
import { VenueSearchRowHOC } from "./VenueSearchRow";
import { MainContext } from "../service/MainProvider"
import { VenueAutocomplete } from "../shared/venue/VenueAutocomplete";


type AddVenuePageState = {
    query: string
    api: MainAPI
    results: VenueAutocomplete[]
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
            {this.state.results.map(x => <VenueSearchRowHOC key={x.place_id} venue={x} />) }
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

    async search() {
        let loc = this.context.location;
        let result = await this.state.api.autocomplete(this.state.query, loc)
        this.setState({results: result.predictions})
    }
}