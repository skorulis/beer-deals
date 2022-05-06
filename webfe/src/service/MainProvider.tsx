import {createContext, Component } from 'react';

export interface IMainContext {
    location?: GeolocationCoordinates
}

const defaultState = {
    location: undefined
}

export const MainContext = createContext<IMainContext>(defaultState);

export class MainProvider extends Component<{children: JSX.Element}, IMainContext> {
    constructor(props: {children: JSX.Element}) {
        super(props)
        this.state = {
            
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