import { HeaderInit } from "node-fetch";

export interface Option {
    method: string;
    headers: HeaderInit;
    body: JSON;
}
