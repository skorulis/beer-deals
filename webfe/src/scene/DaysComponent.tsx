import React, { Component } from "react"; 
import { DayOfWeek } from '../model/DayOfWeek';

export class DaysComponent extends Component<{days:DayOfWeek[]}> {
    constructor(props: {days: DayOfWeek[]}) {
        super(props);
    }
    
    render() {
        return <p>M T W T F S S</p>
    }
}
