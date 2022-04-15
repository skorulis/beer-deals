import React, { Component } from "react"; 
import { DayOfWeek } from '../model/DayOfWeek';
import { DaysComponent } from './DaysComponent';
import { VenueDeals } from "../model/Deal";
import { SingleDealComponent } from "./SingleDealComponent";

export class VenueDealsComponent extends Component<{deals:VenueDeals}> {
    constructor(props: {deals:VenueDeals}) {
        super(props);
    }

    render() {
        return <div>
            {this.dealList()}
            <DaysComponent days={this.days()} />
        </div>
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

