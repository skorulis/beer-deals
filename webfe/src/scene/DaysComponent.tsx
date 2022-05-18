import { Component } from "react"; 
import { DayOfWeek } from '../shared/DayOfWeek';
import { Box, Text, Flex } from "@chakra-ui/react";

export class DaysComponent extends Component<{days:DayOfWeek[]}> {
    constructor(props: {days: DayOfWeek[]}) {
        super(props);
    }

    render() {
        return <div>
            {this.content()}
        </div>   
    }

    content() {
        if (this.isEveryDay()) {
            return <Text><b>Everyday</b></Text>
        } else if (this.isSingleDay()) {
            return this.singleDay()
        } else if (this.isRunningDays()) {
            return <Text><b>{this.getWeekDays()[this.minDay()]}</b> to <b>{this.getWeekDays()[this.maxDay()]}</b></Text>
        } else {
            return this.separateDays();
        }
    }

    singleDay() {
        let day = this.props.days[0];
            return <Text><b>{this.getWeekDays()[day]}</b></Text>
    }

    separateDays() {
        let elements = [];
        for(let i = 0; i < 7; ++i) {
            let enabled = this.props.days.includes(i)
            elements.push(this.letterDay(i, enabled))
        }
        return <Flex direction="row">{elements}</Flex>
    }

    letterDay(day: DayOfWeek, enabled: Boolean) {
        let letter = this.getWeekDays()[day].charAt(0);
        let color = enabled ? "yellow.300" : "gray"
        return <Box padding={1} key={day}>
                <Text color={color}>{letter}</Text>
            </Box>
    }

    isSingleDay() {
        return this.props.days.length == 1;
    }

    isEveryDay() {
        return this.props.days.length == 0 || this.props.days.length == 7
    }

    maxDay() {
        return this.props.days.reduce(function(a, b) {
            return Math.max(a, b);
        }, DayOfWeek.MONDAY);
    }

    minDay() {
        return this.props.days.reduce(function(a, b) {
            return Math.min(a, b);
        }, DayOfWeek.SUNDAY);
    }

    isRunningDays() {
        let gap = this.maxDay() - this.minDay();
        return gap == (this.props.days.length - 1);
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
