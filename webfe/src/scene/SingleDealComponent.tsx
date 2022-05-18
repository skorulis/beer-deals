import { Text, Flex, Button, HStack } from "@chakra-ui/react";
import { Component } from "react"; 
import { Deal } from '../shared/deal/Deal';
import { DaysComponent } from "./DaysComponent";
import { TimespanComponent } from "./TimespanComponent";
import { MainAPI } from "../service/MainAPI";
import { AddReportRequest } from "../shared/AddReportRequest";

export class SingleDealComponent extends Component<{placeID: string, deal:Deal}> {
    constructor(props: {placeID: string, deal: Deal}) {
        super(props);
        this.postReport = this.postReport.bind(this);
        this.delete = this.delete.bind(this);
    }

    render() {
        return <Flex direction="column" boxShadow='base' padding={2}>
            <Text>{this.props.deal.text}</Text>
            <TimespanComponent start={this.props.deal.timeStart} end={this.props.deal.timeEnd} />
            <DaysComponent days={this.props.deal.days} />
            <HStack>
                <Button onClick={this.postReport}>Report</Button>
                <Button onClick={this.delete} colorScheme="red" >Delete</Button>
            </HStack>
        </Flex>
    }

    async delete() {
        await MainAPI.shared.deleteDeal(this.props.placeID, this.props.deal.compoundID)
        window.location.reload()
    }

    async postReport() {
        let body: AddReportRequest = {
            placeID: this.props.placeID,
            dealID: this.props.deal.compoundID,
            reason: "Because I can"
        }
        let result = await MainAPI.shared.addReport(body)
    }
}