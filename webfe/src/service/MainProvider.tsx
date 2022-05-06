import {createContext, Component } from 'react';
import { AuthStore } from './AuthStore';

export interface IMainContext {
    location?: GeolocationCoordinates
    authStore: AuthStore
}

const defaultState = {
    location: undefined,
    authStore: new AuthStore()
}

export const MainContext = createContext<IMainContext>(defaultState);

export class MainProvider extends Component<{children: JSX.Element}, IMainContext> {
    constructor(props: {children: JSX.Element}) {
        super(props)
        this.state = {
            authStore: new AuthStore()
        }
    }

    render() {
        return <MainContext.Provider value={this.state}>
            {this.props.children}
        </MainContext.Provider>
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({location: position.coords})
            console.log(position.coords)
        })
    }
}