import { Quotations } from "../quotationsRepository";

export interface IQuotationsRepository {
    save(quotation: Quotations): Promise<void>;
}
