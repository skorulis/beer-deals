import { Button, Center, Text, Flex, Heading, VStack, HStack } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "../PageHeader";
import { MainAPI } from "../../service/MainAPI";
import MainContext from "../../service/MainContext";
import { Report } from "../../shared/Report";
import { VenueDeals } from "../../shared/Venue";
import { ReportCell } from "./ReportCell";

interface ReportListPageState {
    reports: Report[]
    venues: {[placeID: string]: VenueDeals}
}

export class ReportListPage extends Component<{}, ReportListPageState> {
    static contextType = MainContext;

    constructor(props: {}) {
        super(props);
        this.state = {
            reports: [],
            venues: {}
        }
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Center>
                <Flex direction="column">
                    <Heading>Deal Reports {this.state.venues.length}</Heading>
                    {this.results()}
                </Flex>
                
            </Center>
            
            
        </Flex>
    }

    results() {
        return <VStack pt={8}>
            {this.state.reports.map(x =>  this.singleReport(x))}
        </VStack>
    }

    singleReport(report: Report) {
        let place = this.state.venues[report.placeID]
        console.log(place)
        if (!place) {
            return undefined
        }
        let matchingDeals = place.deals.filter(x => x.compoundID == report.dealID)
        if (matchingDeals.length == 0) {
            return undefined
        }
        let deal = matchingDeals[0]

        return <VStack>
            <Text key={report.placeID} >{place.venue.name}</Text>
            <ReportCell venue={place.venue} deal={deal} report={report} />
        </VStack>
    }

    allPlaceIDs(): string[] {
        let ids: string[] = this.state.reports.map(x => x.placeID)
        return [...new Set(ids)]
    }

    async componentDidMount() {
        if (this.state.reports.length > 0) {
            return
        }
        let reports = await MainAPI.shared.getReports()
        this.setState({reports: reports})
    }

    async componentDidUpdate() {
        let newIds = this.allPlaceIDs();
        let missingIds = newIds.filter(x => this.state.venues[x] == undefined)
         
        for (let id of missingIds) {
            let result = await MainAPI.shared.getVenue(id)
            let venues = this.state.venues
            venues[result.venue.placeID] = result
            this.setState({venues: venues})
        }
    }

}