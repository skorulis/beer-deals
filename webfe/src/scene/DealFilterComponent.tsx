import { Button, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, MenuDivider, Text, Flex } from "@chakra-ui/react";
import { Component, MouseEventHandler } from "react"; 
import { DealFeature, featureText } from "../shared/deal/DealFeature"

export interface DealFilterState {
    selectedFeatures: DealFeature[]
}

interface DealFilterProps {
    onChange: (arg: DealFilterState) => void 
}

export class DealFilterComponent extends Component<DealFilterProps, DealFilterState> {
    constructor(props: DealFilterProps) {
        super(props);
        this.state = {selectedFeatures: []}
        this.optionChanged = this.optionChanged.bind(this)
    }

    render() {
        return <Flex direction="row" padding={4}>
        {this.menu()}
    </Flex>
    }

    menu() {
        return <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='blue'>
                {this.featureButtonText()}
            </MenuButton>
            <MenuList minWidth='240px'>
                <MenuOptionGroup  type='checkbox'>
                    {this.topOptions()}
                    <MenuDivider />
                    {this.bottomOptions()}
                </MenuOptionGroup>
            </MenuList>
            </Menu>
    }

    topOptions() {
        let items = this.allOptions().filter(x => x < 10)
        return items.map(x => this.menuOption(x))
    }

    bottomOptions() {
        let items = this.allOptions().filter(x => x >= 10)
        return items.map(x => this.menuOption(x))
    }

    menuOption(feature: DealFeature) {
        return <MenuItemOption 
            key={feature}
            value={featureText(feature)}
            onClick={this.optionChanged(feature)}
            isChecked={this.isSelected(feature)}
            >
                {featureText(feature)}
            </MenuItemOption>
    }

    isSelected(feature: DealFeature): boolean {
        return this.state.selectedFeatures.includes(feature)
    }

    optionChanged = (feature: DealFeature) => () => {
        let items = this.state.selectedFeatures;
        if (items.includes(feature)) {
            items = items.filter(x => x != feature)
        } else {
            items.push(feature)
        }
        this.setState({selectedFeatures: items})
        console.log(items)
    }

    allOptions(): DealFeature[] {
        return Object.keys(DealFeature).map(x => Number(x)).filter((x) => !isNaN(x))
    }

    featureButtonText(): string {
        let features = this.state.selectedFeatures
        if (features.length == 0) {
            return "All features"
        }
        let strings = features.map(x => featureText(x));
        return strings.join(", ")
    }

    componentDidUpdate() {
        this.props.onChange(this.state)
    }

}