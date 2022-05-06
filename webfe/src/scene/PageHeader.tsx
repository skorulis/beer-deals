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

import { Component, Context } from "react"; 
import { AuthContext } from "../service/AuthProvider"

export class PageHeader extends Component<{}> {

    static contextType = AuthContext

    constructor(props: {}) {
        super(props);
    }

    render() {
        return <Flex justify="space-between" padding={6} bg="yellow.500" color="white" align="center">
            <RouteLink to="/">
                <Link>
                    <Heading as="h1" size="lg" >
                        BeerDeals
                    </Heading>
                </Link>
            </RouteLink>
            
            {this.profileButtons()}
            

        </Flex>
    }

    profileButtons() {
        let token = this.context.token
        
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