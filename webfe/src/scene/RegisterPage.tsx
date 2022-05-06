import { Box, Button, Center, Flex, Heading, Input, InputGroup, InputRightElement,  Text } from "@chakra-ui/react";
import { Component } from "react"; 
import { PageHeader } from "./PageHeader";
import { MainAPI } from "../service/MainAPI"
import { AuthContext } from "../service/AuthProvider";

import { useNavigate, NavigateFunction } from "react-router-dom";

type RegisterPageState = {
    showPassword: Boolean
    name: string
    email: string
    password: string
    passwordRepeat: string
}

export function RegisterPageHOC() {
    const navigation = useNavigate()
    return <RegisterPage navigation={navigation} />
}

export class RegisterPage extends Component<{navigation: NavigateFunction}, RegisterPageState> {

    static contextType = AuthContext;

    constructor(props: {navigation: NavigateFunction}) {
        super(props);
        this.state = {showPassword: false, name: "", email: "", password: "", passwordRepeat: ""}
        this.handlePasswordClick = this.handlePasswordClick.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.passwordRepeatChanged = this.passwordRepeatChanged.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.register = this.register.bind(this);
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
            <Button colorScheme='blue' isDisabled={!this.canSubmit()} onClick={this.register}>
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
            isInvalid={this.hasPasswordMismatch()}
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

    hasPasswordMismatch() {
        let pw = this.state.password;
        let rpw = this.state.passwordRepeat;
        return pw.length > 0 && rpw.length > 0 && pw !== rpw;
    }

    canSubmit() {
        return this.state.email.length > 0 && 
        this.state.password.length > 0 &&
        this.state.passwordRepeat.length > 0 &&
        this.state.name.length > 0
    }

    async register() {
        if (this.hasPasswordMismatch()) {
            return;
        }
        let email = this.state.email
        let password = this.state.password
        let result = await MainAPI.shared.register(email, password)
        console.log(result)

        this.context.setToken(result.token);
        this.props.navigation("/");
    }
}