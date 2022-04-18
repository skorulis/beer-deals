import { Box, Button, Center, Flex, Heading, Input, InputGroup, InputRightElement,  Text } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";

type LoginPageState = {
    showPassword: Boolean
    email: string
    password: string
}

export class LoginPage extends Component<{}, LoginPageState> {

    constructor(props: {}) {
        super(props);
        this.state = {showPassword: false, email: "", password: ""}
        this.handlePasswordClick = this.handlePasswordClick.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
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
        return <Flex direction="column" textAlign={"center"} boxShadow='md' mt={4} p={4} gap={4}>
            <Input 
                placeholder='Email' 
                value={this.state.email}
                onChange={this.emailChanged}
            />
            {this.passwordField()}
            <Button colorScheme='blue' isDisabled={!this.canSubmit()}>
                <Text>Login</Text>
            </Button>
        </Flex>
    }

    canSubmit() {
        return this.state.email.length > 0 && this.state.password.length > 0
    }

    passwordField() {
        return <InputGroup size='md'>
            <Input
                value={this.state.password}
                onChange={this.passwordChanged}
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
    }

    emailChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ email: event.currentTarget.value })
    }

    passwordChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ password: event.currentTarget.value })
    }

    handlePasswordClick() {
        let p = this.state.showPassword;
        this.setState({showPassword: !p})
    }
}