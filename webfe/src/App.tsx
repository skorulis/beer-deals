import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  Flex,
  theme,
} from "@chakra-ui/react"
import { Component } from "react"; 
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { PageHeader } from "./scene/PageHeader"

import { LoginPage } from "./scene/LoginPage";
import { RegisterPage } from "./scene/RegisterPage";

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
          <Route path="/" element={this.home()} />
      </Routes>
    </Router>
  }

  home() {
    return <Flex direction="column">
      <PageHeader />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
          </VStack>
        </Grid>
      </Box>
    </Flex>
  }

}
