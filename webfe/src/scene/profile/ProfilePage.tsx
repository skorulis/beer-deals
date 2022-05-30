import { Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import { Component, Context } from "react"; 
import { PageHeader } from "../PageHeader";
import { AuthContext } from "../../service/AuthProvider"
import { useNavigate, NavigateFunction } from "react-router-dom";
import { MainAPI } from "../../service/MainAPI";
import { ProfileModel } from "../../shared/ProfileModel";

export default function ProfilePageHOC() {
    const navigation = useNavigate()
    return <ProfilePage navigation={navigation} />
}



export class ProfilePage extends Component<{navigation: NavigateFunction}, {profile?: ProfileModel}> {

    static contextType = AuthContext

    constructor(props: {navigation: NavigateFunction}) {
        super(props);
        this.state = {}
        this.logout = this.logout.bind(this);
    }

    render() {
        return <Flex direction="column">
            <PageHeader />
            <Box textAlign="center" fontSize="xl">
                <Heading>Profile</Heading>
                <Button onClick={this.logout}>Logout</Button>
                {this.maybeDetails()}
            </Box>
        </Flex>
    }

    maybeDetails() {
        if (this.state.profile) {
            return  <Text>{this.state.profile.name}</Text>
        }
    }

    logout() {
        this.context.setToken(null);
        this.props.navigation("/")
    }

    async componentDidMount() {
        let result = await MainAPI.shared.getProfile()
        this.setState({
            profile: result
        })
    }
}