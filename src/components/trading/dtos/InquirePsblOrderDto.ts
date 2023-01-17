export class InquirePsblOrderDto {
    readonly trID: number;
    readonly itemCode: string;
    readonly itemName: string;
    readonly orderDivision: string;
    readonly orderUnitPrice: string;

    constructor(body: any) {
        this.trID = body.trID;
        this.itemCode = body.itemCode;
        this.itemName = body.itemName;
        this.orderDivision = body.orderDivision;
        this.orderUnitPrice = body.orderUnitPrice;
    }
}
