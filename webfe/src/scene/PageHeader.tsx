import {
    Button,
    Heading,
    Flex,
    Link,
    Text
  } from "@chakra-ui/react";

  import {
    Link as RouteLink
  } from "react-router-dom";

import { Component } from "react"; 
import { AuthContext, IAuthContext } from "../service/AuthProvider"

export class PageHeader extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return <Flex justify="space-between" padding={6} bg="yellow.500" color="white" align="center">
            <RouteLink to="/">
                <Link>
                    <Heading as="h1" size="lg" >
                        MegaDeals
                    </Heading>
                </Link>
            </RouteLink>
            <AuthContext.Consumer>
                {value =>  this.profileButtons(value) }
            </AuthContext.Consumer>
        </Flex>
    }

    profileButtons(context: IAuthContext) {
        let token = context.auth
        if (token) {
            return <Flex gap="10px">
                <RouteLink to="/profile">
                    <Button colorScheme='blue'>
                        <Text>Profile</Text>
                    </Button>
                </RouteLink>
            </Flex>
        } else {
            return <Flex gap="10px">
                <RouteLink to="/login">
                    <Button colorScheme='blue'>
                        <Text>Login</Text>
                    </Button>
                </RouteLink>
                <RouteLink to="/register">
                    <Button colorScheme='blue'>
                        <Text>Signup</Text>
                    </Button>
                </RouteLink>
            </Flex>
        }
    }
}