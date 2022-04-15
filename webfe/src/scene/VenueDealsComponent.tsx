import { Component } from "react"; 
import { Box, Text, Card } from "grommet";
import { DayOfWeek } from '../model/DayOfWeek';
import { VenueDeals } from "../model/Deal";
import { SingleDealComponent } from "./SingleDealComponent";
import { VenueHeader } from "./VenueHeader";

export class VenueDealsComponent extends Component<{deals:VenueDeals}> {
    constructor(props: {deals:VenueDeals}) {
        super(props);
    }

    render() {
        return <Card direction="column" pad="medium">
            <VenueHeader venue={this.props.deals.venue} />
            {this.dealList()}
        </Card>
    }

    dealList() {
        let dealList = []
        for (let deal of this.props.deals.deals) {
            dealList.push(<SingleDealComponent deal={deal} />)
        }
        return dealList
    }

    days(): DayOfWeek[] {
        return []
    }
}

