import { Button, Checkbox, CheckboxGroup, Input, Heading, Stack, Text, Textarea, Flex } from "@chakra-ui/react";
import { Component } from "react"; 

import { PageHeader } from "./PageHeader";
import { DayOfWeek } from "../shared/DayOfWeek";
import { MainAPI } from "../service/MainAPI";
import { AddDealRequest } from "../shared/deal/AddDealRequest";

import { useNavigate, NavigateFunction } from "react-router-dom";


interface AddDealPageState {
    description: string
    days: DayOfWeek[]
    startHour: string
    startMinute: string
    endHour: string
    endMinute: string
}

export default function AddDealPageHOC(props: {placeID: string}) {
    const navigation = useNavigate()
    return <AddDealPage placeID={props.placeID} navigation={navigation} />
}

export class AddDealPage extends Component<{placeID:string, navigation: NavigateFunction}, AddDealPageState> {
    constructor(props: {placeID:string, navigation: NavigateFunction}) {
        super(props);
        this.state = {description: "", days: [], startHour: "00", startMinute: "00", endHour: "24", endMinute: "00"}
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.addPressed = this.addPressed.bind(this);
        this.daysChanged = this.daysChanged.bind(this);
        this.startHourChanged = this.startHourChanged.bind(this);
        this.startMinuteChanged = this.startMinuteChanged.bind(this);
        this.endHourChanged = this.endHourChanged.bind(this);
        this.endMinuteChanged = this.endMinuteChanged.bind(this);
    }

    render() {
        return <Flex direction="column" >
            <PageHeader />
            <Flex direction="column" padding={10} gap={4}>
                <Heading>Add a new deal</Heading>
                <Textarea 
                    placeholder='Description' 
                    value={this.state.description}
                    onChange={this.descriptionChanged}
                />
                {this.days()}
                {this.times()}
                <Button onClick={this.addPressed}><Text>Add</Text></Button>
            </Flex>
        </Flex>
    }

    days() {
        return <CheckboxGroup value={this.state.days} onChange={this.daysChanged}>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                <Checkbox value={DayOfWeek.MONDAY + 1}>Monday</Checkbox>
                <Checkbox value={DayOfWeek.TUESDAY + 1}>Tuesday</Checkbox>
                <Checkbox value={DayOfWeek.WEDNESDAY + 1}>Wednesday</Checkbox>
                <Checkbox value={DayOfWeek.THURSDAY + 1}>Thursday</Checkbox>
                <Checkbox value={DayOfWeek.FRIDAY + 1}>Friday</Checkbox>
                <Checkbox value={DayOfWeek.SATURDAY + 1}>Saturday</Checkbox>
                <Checkbox value={DayOfWeek.SUNDAY + 1}>Sunday</Checkbox>
            </Stack>
        </CheckboxGroup>
    }

    times() {
        return <Flex direction="column">
            <Flex direction="row" align="center" gap={1}>
                <Text>Start</Text>
                <Input htmlSize={2} width='auto' value={this.state.startHour} onChange={this.startHourChanged} />
                <Text>:</Text>
                <Input htmlSize={2} width='auto' value={this.state.startMinute} onChange={this.startMinuteChanged} />
            </Flex>

            <Flex direction="row" align="center" gap={1}>
                <Text>End</Text>
                <Input htmlSize={2} width='auto' value={this.state.endHour} onChange={this.endHourChanged} />
                <Text>:</Text>
                <Input htmlSize={2} width='auto' value={this.state.endMinute} onChange={this.endMinuteChanged} />
            </Flex>
        </Flex>
    }

    daysChanged(value: string[]) {
        console.log(value)
        let ints = value.map(x => parseInt(x))
        this.setState({days: ints})
        console.log(this.state)
    }

    startHourChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({startHour: event.currentTarget.value})
    }

    startMinuteChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({startMinute: event.currentTarget.value})
    }

    endHourChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({endHour: event.currentTarget.value})
    }

    endMinuteChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({endMinute: event.currentTarget.value})
    }

    addPressed() {
        let days = this.state.days.map(x => x - 1).sort();
        let timeStart = parseInt(this.state.startHour) * 60 + parseInt(this.state.startMinute);
        let timeEnd = parseInt(this.state.endHour) * 60 + parseInt(this.state.endMinute);
        let body: AddDealRequest = {
            placeID: this.props.placeID,
            text: this.state.description,
            days: days,
            timeStart: timeStart,
            timeEnd: timeEnd
        }

        MainAPI.shared.addDeal(body).then(x => {
            this.props.navigation(`/venue/${this.props.placeID}`)
        })
    }

    descriptionChanged(event: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({ description: event.currentTarget.value })
    }

    
}