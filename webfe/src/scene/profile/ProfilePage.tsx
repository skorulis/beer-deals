import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { Component, Context } from "react"; 
import { PageHeader } from "../PageHeader";
import { AuthContext } from "../../service/AuthProvider"
import { useNavigate, NavigateFunction } from "react-router-dom";

export default function ProfilePageHOC() {
    const navigation = useNavigate()
    return <ProfilePage navigation={navigation} />
}



export class ProfilePage extends Component<{navigation: NavigateFunction}, {}> {

    static contextType = AuthContext

    constructor(props: {navigation: NavigateFunction}) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Box textAlign="center" fontSize="xl">
                <Heading>Profile</Heading>
                <Button onClick={this.logout}>Logout</Button>
            </Box>
        </Flex>
    }

    logout() {
        this.context.setToken(null);
        this.props.navigation("/")
    }

    componentDidMount() {
        
    }
}