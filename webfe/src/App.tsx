import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams
} from "react-router-dom";

import {
  Flex,
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Component } from "react"; 

import { LoginPage } from "./scene/LoginPage";
import { RegisterPage } from "./scene/RegisterPage";
import { AddVenuePage } from "./scene/AddVenuePage";
import { HomePage } from "./scene/HomePage";
import { VenuePage } from "./scene/VenuePage";
import { AddDealPage } from "./scene/AddDealPage";
import { MainProvider } from "./service/MainProvider";
import AddDealPageHOC from "./scene/AddDealPage";

export class App extends Component<{}> {
  render() {
    return <ChakraProvider theme={theme}>
      <MainProvider>
        <Flex direction="column">
          {this.router()}
        </Flex>
      </MainProvider>
    </ChakraProvider>
  }

  router() {
    return <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/addvenue" element={<AddVenuePage />} />
          <Route path="/venue/:id" element={<VenuePageWrapper />} />
          <Route path="/venue/:id/adddeal" element={<AddDealWrapper />} />
      </Routes>
    </Router>
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