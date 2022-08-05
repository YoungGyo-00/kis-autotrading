import fetch from "node-fetch";

class OAuthService {
    constructor(private url: string, private options: Object) {}

    async token(): Promise<String> {
        const response = await fetch(this.url, this.options);

        const access_token = await response.json().then(data => {
            return data.access_token;
        });

        return access_token;
    }

    // async hash(): Promise<String> {
    //     const response = await fetch()
    // }
}

export { OAuthService };
