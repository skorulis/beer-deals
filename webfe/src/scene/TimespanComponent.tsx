import { Component } from "react"; 
import { Text, Flex } from "@chakra-ui/react";

export class TimespanComponent extends Component<{start?: number, end?: number}> {
    constructor(props: {start?: number, end?: number}) {
        super(props);
    }

    render() {
        return <Flex>
            {this.maybeAllDay()}
            {this.maybeTimes()}
        </Flex>   
    }

    maybeAllDay() {
        if (this.isAllDay()) {
            return <Text>All day</Text>
        }
    }

    maybeTimes() {
        if (this.isAllDay()) {
            return null
        }
        let start = this.hoursToString(this.props.start) || "Open"
        let end = this.hoursToString(this.props.end) || "Close"
        return <Text>{start} - {end}</Text>
    }

    isAllDay() {
        return !this.props.start && !this.props.end
    }

    hoursToString(value?: number): string | undefined {
        if (!value) {
            return undefined
        }
        let hours = Math.floor(value / 60)
        let minutes = value - hours * 60;
        let hoursString = `${hours}`.padStart(2, "0")
        let minutesString = `${minutes}`.padStart(2, "0")
        return `${hoursString}:${minutesString}`;
    }

}
