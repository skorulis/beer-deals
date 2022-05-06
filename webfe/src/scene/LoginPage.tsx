import { Box, Button, Center, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";

import {
    Link as RouteLink
  } from "react-router-dom";
import { MainAPI } from "../service/MainAPI";

import { MainContext } from "../service/MainProvider"
import { AuthContext } from "../service/AuthProvider";

type LoginPageState = {
    showPassword: Boolean
    email: string
    password: string
}

export class LoginPage extends Component<{}, LoginPageState> {

    static contextType = AuthContext;

    constructor(props: {}) {
        super(props);
        this.state = {showPassword: false, email: "", password: ""}
        this.handlePasswordClick = this.handlePasswordClick.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.login = this.login.bind(this);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Center>
                <Flex direction="column" textAlign={"center"}>
                    <Heading>
                        Login
                    </Heading>
                    <Text>Don't have an account? {this.signupLink()}</Text>
                    {this.form()}
                </Flex>
            </Center>
            
        </Flex>
    }

    signupLink() {
        return <RouteLink to="/register">
            <Link color="blue.700">sign up</Link>
        </RouteLink>
    }

    form() {
        return <Flex direction="column" textAlign={"center"} boxShadow='md' mt={4} p={4} gap={4}>
            <Input 
                placeholder='Email' 
                value={this.state.email}
                onChange={this.emailChanged}
            />
            {this.passwordField()}
            <Button colorScheme='blue' isDisabled={!this.canSubmit()} onClick={this.login}>
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

    async login() {
        let email = this.state.email
        let password = this.state.password
        let result = await MainAPI.shared.login(email, password)
        console.log(result)
        this.context.token = result.token;
        
        //this.context.authStore.store(result.token)
    }
}