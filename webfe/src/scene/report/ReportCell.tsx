import { Button, Center, Text, Flex, Heading, VStack, HStack } from "@chakra-ui/react";
import { Component } from "react"; 

import MainContext from "../../service/MainContext";
import { Report, ReportStatus } from "../../shared/Report";
import { SingleDealComponent } from "../SingleDealComponent";
import {Deal} from "../../shared/Deal"
import { Venue } from "../../shared/Venue"
import { MainAPI } from "../../service/MainAPI";
import { ActionReportRequest } from "../../shared/AddReportRequest"

interface ReportCellState { }

interface ReportCellProps { 
    venue: Venue,
    report: Report, 
    deal: Deal
}

export class ReportCell extends Component<ReportCellProps, ReportCellState> {
    static contextType = MainContext;

    constructor(props: ReportCellProps) {
        super(props);
        this.state = { }
        this.ignore = this.ignore.bind(this);
        this.accept = this.accept.bind(this);
        this.acceptDelete = this.acceptDelete.bind(this);
    }

    render() {
        return <VStack>
            <SingleDealComponent placeID={this.props.venue.placeID} deal={this.props.deal} />
            <Text>{this.props.report.reason}</Text>
            <HStack>
                <Button onClick={this.ignore}>Ignore</Button>
                <Button onClick={this.accept}>Accept</Button>
                <Button onClick={this.acceptDelete}>Accept and delete</Button>
            </HStack>
        </VStack>
    }

    ignore() {
        this.send(ReportStatus.ignored)
    }

    accept() {
        this.send(ReportStatus.agreed)
    }

    acceptDelete() {
        this.send(ReportStatus.agreed)
    }

    async send(status: ReportStatus) {
        let body: ActionReportRequest = {
            reportID: this.props.report.reportID,
            status: status

        }
        console.log("BODY ")
        console.log(body)
        let result = await MainAPI.shared.actionReport(body)
        console.log(result);
    }

}