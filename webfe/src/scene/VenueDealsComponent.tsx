import React, { Component } from "react"; 
import { DayOfWeek } from '../model/DayOfWeek';
import { DaysComponent } from './DaysComponent';
import { VenueDeals } from "../model/Deal";

export class VenueDealsComponent extends Component<{deals:VenueDeals}> {
    constructor(props: {deals:VenueDeals}) {
        super(props);
    }

    render() {
        return <div>
            <DaysComponent days={this.days()} />
        </div>
    }

    days(): DayOfWeek[] {
        return []
    }
}

