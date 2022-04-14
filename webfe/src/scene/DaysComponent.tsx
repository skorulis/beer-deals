import React, { Component } from "react"; 
import { DayOfWeek } from '../model/DayOfWeek';

export class DaysComponent extends Component<{days:DayOfWeek[]}> {
    constructor(props: {days: DayOfWeek[]}) {
        super(props);
    }

    render() {
        return <div>
            {this.maybeAllDays()}
            {this.maybeSingleDay()}
            {this.maybeSeparateDays()}
        </div>   
    }

    maybeAllDays() {
        if (this.isEveryDay()) {
            return <p>Everyday</p>
        } 
    }

    maybeSingleDay() {
        if (this.isSingleDay()) {
            let day = this.props.days[0];
            return <p>{this.getWeekDays()[day]}</p>
        }
    }

    maybeSeparateDays() {
        if (this.isEveryDay() || this.isSingleDay()) {
            return null;
        }
        return <p>M T W T F S S</p>
    }

    isSingleDay() {
        return this.props.days.length == 1;
    }

    isEveryDay() {
        return this.props.days.length == 0 || this.props.days.length == 7
    }

    getWeekDays() {
        let locale = window.navigator.language;
        var baseDate = new Date("01/05/2020"); // just a Monday
        var weekDays = [];
        for(let i = 0; i < 7; i++) {       
            weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
            baseDate.setDate(baseDate.getDate() + 1);       
        }
        return weekDays;
    }
}
