import fetch from "node-fetch";

class OAuthService {
    constructor(private url: string, private options: Object) {}

    async token(): Promise<String> {
        const access_token: string = await fetch(this.url, this.options)
            .then(response => response.json())
            .then(data => {
                return data.access_token;
            })
            .catch(err => new Error(err));

        return access_token;
    }

    // async hash(): Promise<String> {
    //     const response = await fetch()
    // }
}

export { OAuthService };
