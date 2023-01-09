export class TickerDto {
    readonly itemCode: string;
    readonly itemName: string;

    constructor(itemCode: string, itemName: string) {
        this.itemCode = itemCode;
        this.itemName = itemName;
    }
}
