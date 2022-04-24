import { Text, Flex } from "@chakra-ui/react";
import { Component } from "react"; 
import { Deal } from '../shared/Deal';
import { DaysComponent } from "./DaysComponent";
import { TimespanComponent } from "./TimespanComponent";

export class SingleDealComponent extends Component<{deal:Deal}> {
    constructor(props: {deal: Deal}) {
        super(props);
    }

    render() {
        return <Flex direction="column" boxShadow='base' padding={2}>
            <Text>{this.props.deal.text}</Text>
            <TimespanComponent start={this.props.deal.timeStart} end={this.props.deal.timeEnd} />
            <DaysComponent days={this.props.deal.days} />
            
        </Flex>
    }
}