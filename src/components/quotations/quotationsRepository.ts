import { Service } from "typedi";

import { Quotations } from "@entities/Quotations";
import { IQuotationsRepository } from "./interface/IQuotationsRepository";

@Service()
export class QuotationsRepository implements IQuotationsRepository {
    async save(quotation: Quotations): Promise<void> {
        try {
            await Quotations.save(quotation);
            console.log("저장 완료");
        } catch (err: any) {
            console.error(err);
        }
    }
}

export { Quotations };
