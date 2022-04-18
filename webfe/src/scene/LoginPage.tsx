import { Box, Button, Center, Flex, Heading, Input, InputGroup, InputRightElement,  Text } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";

export class LoginPage extends Component<{}, {showPassword: Boolean}> {

    constructor(props: {}) {
        super(props);
        this.state = {showPassword: false}
        this.handlePasswordClick = this.handlePasswordClick.bind(this);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Center>
                <Flex direction="column" textAlign={"center"}>
                    <Heading>
                        Login
                    </Heading>
                    <Text>Don't have an account? sign up</Text>
                    {this.form()}
                </Flex>
            </Center>
            
        </Flex>
    }

    form() {
        return <Flex direction="column" textAlign={"center"} boxShadow='md' mt={4} p={4}>
            <Text>Form here</Text>
            <Input placeholder='Email' />
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={this.state.showPassword ? 'text' : 'password'}
                    placeholder='Password'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={this.handlePasswordClick}>
                    {this.state.showPassword ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
                </InputGroup>

        </Flex>
    }

    handlePasswordClick() {
        let p = this.state.showPassword;
        this.setState({showPassword: !p})
    }
}