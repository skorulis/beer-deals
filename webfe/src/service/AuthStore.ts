
export class AuthStore {

    token?: string

    constructor() {

    }

    store(token: string) {
        this.token = token
    }
}