import {createContext, Component } from 'react';
import { AuthResponse } from '../shared/AuthResponse';
import { MainAPI } from './MainAPI';

export interface IAuthContext {
    readonly auth?: AuthResponse
    setToken(token?: AuthResponse): void
}

class AuthStore implements IAuthContext {

    auth?: AuthResponse

    constructor() {
        let authString = localStorage.getItem("authKey") || undefined
        console.log("Auth")
        console.log(authString)
        try {
            if (authString) {
                this.auth = JSON.parse(authString)
            }
        } catch(e) {
            console.log(e)
        }
        
        MainAPI.shared.token = this.auth?.token
    }

    setToken(auth?: AuthResponse) {
        console.log("Set auth");
        console.log(auth);
        this.auth = auth
        MainAPI.shared.token = auth?.token
        if (auth) {
            localStorage.setItem("authKey", JSON.stringify(auth));    
        } else {
            localStorage.removeItem("authKey");
        }
    }

    isLoggedIn(): Boolean {
        return !!this.auth
    }

    isAdmin(): Boolean {
        if (!this.auth) {
            return false
        }
        return this.auth.role == "admin"
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