import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Component } from "react"; 

import { LoginPage } from "./scene/LoginPage";
import { RegisterPage } from "./scene/RegisterPage";
import { AddVenuePage } from "./scene/AddVenuePage";
import { HomePage } from "./scene/HomePage";

export class App extends Component<{}> {
  render() {
    return <ChakraProvider theme={theme}>
      {this.router()}
    </ChakraProvider>
  }

  router() {
    return <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/addvenue" element={<AddVenuePage />} />
      </Routes>
    </Router>
  }

}
