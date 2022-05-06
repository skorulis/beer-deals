import {createContext, Component } from 'react';
import { AuthStore } from './AuthStore';

export interface IAuthContext {
    token?: string
}

const defaultState = {
    
}

export const AuthContext = createContext<IAuthContext>(defaultState);

export class AuthProvider extends Component<{children: JSX.Element}, IAuthContext> {
    constructor(props: {children: JSX.Element}) {
        super(props)
        this.state = {
            token: undefined
        }
    }

    render() {
        return <AuthContext.Provider value={this.state}>
            {this.props.children}
        </AuthContext.Provider>
    }

}