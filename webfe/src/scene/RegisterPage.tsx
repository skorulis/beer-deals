import { Box, Button, Center, Flex, Heading, Input, InputGroup, InputRightElement,  Text } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";

type RegisterPageState = {
    showPassword: Boolean
    name: string
    email: string
    password: string
    passwordRepeat: string
}

export class RegisterPage extends Component<{}, RegisterPageState> {

    constructor(props: {}) {
        super(props);
        this.state = {showPassword: false, name: "", email: "", password: "", passwordRepeat: ""}
        this.handlePasswordClick = this.handlePasswordClick.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.passwordRepeatChanged = this.passwordRepeatChanged.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.login = this.login.bind(this);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Center>
                <Flex direction="column" textAlign={"center"}>
                    <Heading>
                        Register
                    </Heading>
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
            {this.nameField()}
            {this.passwordField()}
            {this.passwordRepeatField()}
            <Button colorScheme='blue' isDisabled={!this.canSubmit()} onClick={this.login}>
                <Text>Register</Text>
            </Button>
        </Flex>
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

    nameField() {
        return <Input
            value={this.state.name}
            onChange={this.nameChanged}
            placeholder='First name'
        />
    }

    passwordRepeatField() {
        return <Input 
            placeholder='Confirm password' 
            value={this.state.passwordRepeat}
            type="password"
            onChange={this.passwordRepeatChanged}
        />
    }

    emailChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ email: event.currentTarget.value })
    }

    passwordRepeatChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ passwordRepeat: event.currentTarget.value })
    }

    nameChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ name: event.currentTarget.value })
    }

    passwordChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ password: event.currentTarget.value })
    }

    handlePasswordClick() {
        let p = this.state.showPassword;
        this.setState({showPassword: !p})
    }

    canSubmit() {
        return this.state.email.length > 0 && 
        this.state.password.length > 0 &&
        this.state.passwordRepeat.length > 0 &&
        this.state.name.length > 0
    }

    login() {
        let email = this.state.email
        let password = this.state.password
        console.log(email)
    }
}