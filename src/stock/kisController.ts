import fetch from "node-fetch";

class KisController {
    constructor(private url: string, private options: Object) {}

    async start() {
        const response = await fetch(this.url, this.options);

        await response.json().then(data => console.log(data));
    }
}

export { KisController };
