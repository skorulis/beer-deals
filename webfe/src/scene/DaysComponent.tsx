import React, { Component } from "react"; 
import { DayOfWeek } from '../model/DayOfWeek';
import { Box, Text } from 'grommet';

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
            return <Text>Everyday</Text>
        } 
    }

    maybeSingleDay() {
        if (this.isSingleDay()) {
            let day = this.props.days[0];
            return <Text>{this.getWeekDays()[day]}</Text>
        }
    }

    maybeSeparateDays() {
        if (this.isEveryDay() || this.isSingleDay()) {
            return null;
        }
        let elements = [];
        for(let i = 0; i < 7; ++i) {
            let enabled = this.props.days.includes(i)
            elements.push(this.letterDay(i, enabled))
        }
        return <Box direction="row">{elements}</Box>
    }

    letterDay(day: DayOfWeek, enabled: Boolean) {
        let letter = this.getWeekDays()[day].charAt(0);
        let color = enabled ? "brand" : "gray"
        return <Box pad="xsmall">
                <Text color={color}>{letter}</Text>
            </Box>
    }

    isSingleDay() {
        return this.props.days.length == 1;
    }

    isEveryDay() {
        return this.props.days.length == 0 || this.props.days.length == 7
    }

    getWeekDays() {
        let locale = window.navigator.language;
        var baseDate = new Date("01/06/2020"); // just a Monday?
        var weekDays = [];
        for(let i = 0; i < 7; i++) {       
            weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
            baseDate.setDate(baseDate.getDate() + 1);       
        }
        return weekDays;
    }
}
