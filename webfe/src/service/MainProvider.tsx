import React, { useState, FC, createContext, Component } from 'react';

import MainContext, { IMainContext } from "./MainContext";

export class MainProvider extends Component<{children: JSX.Element}, IMainContext> {
    constructor(props: {children: JSX.Element}) {
        super(props)
        this.state = {}
    }

    render() {
        return <MainContext.Provider value={this.state}>
            {this.props.children}
        </MainContext.Provider>
    }
}