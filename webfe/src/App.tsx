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
import { PageHeader } from "./scene/PageHeader";

export class App extends Component<{}> {
  render() {
    return <ChakraProvider theme={theme}>
      <Flex direction="column">
        {this.router()}
      </Flex>
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
      </Routes>
    </Router>
  }

}

function VenuePageWrapper() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <VenuePage placeID={id as string} />
  );
}