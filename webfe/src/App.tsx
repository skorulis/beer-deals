import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams
} from "react-router-dom";

import {
  Flex,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react"
import { Component } from "react"; 

import LoginPageHOC from "./scene/LoginPage";
import { RegisterPageHOC } from "./scene/RegisterPage";
import { AddVenuePage } from "./scene/AddVenuePage";
import { HomePage } from "./scene/HomePage";
import { VenuePage } from "./scene/VenuePage";
import { MainProvider } from "./service/MainProvider";
import AddDealPageHOC from "./scene/AddDealPage";
import { ReportListPage } from "./scene/report/ReportListPage";
import { AuthProvider } from "./service/AuthProvider";
import ProfilePageHOC from "./scene/profile/ProfilePage";
import { MainAPI } from "./service/MainAPI";

import { ProtectedRoute } from "./scene/common/PrivateRoute"

const theme = extendTheme({
  colors: {
    secondary: "#555555"
  },
})

export class App extends Component<{}> {
  render() {
    return <ChakraProvider theme={theme}>
      <MainProvider>
        <AuthProvider>
          <Flex direction="column">
            {this.router()}
          </Flex>
        </AuthProvider>
      </MainProvider>
    </ChakraProvider>
  }

  router() {
    return <Router>
        <Routes>
          <Route path="/login" element={<LoginPageHOC />} />
          <Route path="/register" element={<RegisterPageHOC />} />
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute isLoggedIn={this.isAuthenticated()} />} >
            <Route path="/addvenue" element={<AddVenuePage />} />  
          </Route>
          <Route path="/venue/:id" element={<VenuePageWrapper />} />
          <Route path="/venue/:id/adddeal" element={<AddDealWrapper />} />
          <Route path="/reports" element={<ReportListPage />} />
          <Route path="/profile" element={<ProfilePageHOC />} />
      </Routes>
    </Router>
  }

  isAuthenticated(): Boolean {
    return MainAPI.shared.token != undefined
  }

}

function AddDealWrapper() {
  let { id } = useParams();

  return (
    <AddDealPageHOC placeID={id as string} />
  );
}

function VenuePageWrapper() {
  let { id } = useParams();

  return (
    <VenuePage placeID={id as string} />
  );
}