import {createContext, Component } from 'react';

export interface IAuthContext {
    readonly token?: string
    setToken(token?: string): void
}

class AuthStore implements IAuthContext {

    token?: string

    constructor() {
        this.token = localStorage.getItem("authKey") || undefined
    }

    setToken(token?: string) {
        this.token = token
        if (token) {
            localStorage.setItem("authKey", token);
        } else {
            localStorage.removeItem("authKey");
        }
    }
}

export const AuthContext = createContext<IAuthContext>(new AuthStore());

export class AuthProvider extends Component<{children: JSX.Element}, IAuthContext> {
    constructor(props: {children: JSX.Element}) {
        super(props)
        this.state = new AuthStore()
    }

    render() {
        return <AuthContext.Provider value={this.state}>
            {this.props.children}
        </AuthContext.Provider>
    }

}