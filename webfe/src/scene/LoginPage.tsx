import { Alert, AlertIcon, Box, Button, Center, Flex, Heading, Input, InputGroup, InputRightElement, Link, Spacer, Text } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";

import {
    Link as RouteLink
  } from "react-router-dom";
import { MainAPI } from "../service/MainAPI";
import { AuthContext } from "../service/AuthProvider";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { BaseError } from "../shared/Error"

type LoginPageState = {
    showPassword: Boolean
    email: string
    password: string
    error?: BaseError
}

export default function LoginPageHOC() {
    const navigation = useNavigate()
    return <LoginPage navigation={navigation} />
}

export class LoginPage extends Component<{navigation: NavigateFunction}, LoginPageState> {

    static contextType = AuthContext;

    constructor(props: {navigation: NavigateFunction}) {
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

    maybeError() {
        if (!this.state.error) {
            return
        }
        return <Alert status='error'>
            <AlertIcon />
                {this.state.error.message}
        </Alert>
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
            {this.maybeError()}
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
        this.setState({ email: event.currentTarget.value, error: undefined})
    }

    passwordChanged(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ password: event.currentTarget.value, error: undefined})
    }

    handlePasswordClick() {
        let p = this.state.showPassword;
        this.setState({showPassword: !p})
    }

    async login() {
        let email = this.state.email
        let password = this.state.password
        try {
            let result = await MainAPI.shared.login(email, password)
            console.log("WE ARE DONE")
            console.log(result)
            this.context.setToken(result);
            this.props.navigation("/")
        } catch(e) {
            this.setState({error: e as BaseError})
            console.log(e)
            console.log("ASDASD" + e)
        }
    }
}