import { Text, Flex, Button } from "@chakra-ui/react";
import { Component } from "react"; 
import { Deal } from '../shared/Deal';
import { DaysComponent } from "./DaysComponent";
import { TimespanComponent } from "./TimespanComponent";
import { MainAPI } from "../service/MainAPI";
import { AddReportRequest } from "../shared/AddReportRequest";

export class SingleDealComponent extends Component<{placeID: string, deal:Deal}> {
    constructor(props: {placeID: string, deal: Deal}) {
        super(props);
        this.postReport = this.postReport.bind(this);
    }

    render() {
        return <Flex direction="column" boxShadow='base' padding={2}>
            <Text>{this.props.deal.text}</Text>
            <TimespanComponent start={this.props.deal.timeStart} end={this.props.deal.timeEnd} />
            <DaysComponent days={this.props.deal.days} />
            <Button onClick={this.postReport}>Report</Button>
        </Flex>
    }

    async postReport() {
        let body: AddReportRequest = {
            placeID: this.props.placeID,
            dealID: this.props.deal.compoundID,
            reason: "Because I can"
        }
        let result = await MainAPI.shared.addReport(body)
        console.log(result)
    }
}