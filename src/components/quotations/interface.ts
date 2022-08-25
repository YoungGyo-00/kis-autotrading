export interface IQuotationsService {
    inquirePrice(access_token: string): Promise<void>;
    inquireDaily(access_token: string): Promise<void>;
}
