export class OrderDto {
    readonly trID: number;
    readonly itemCode: string;
    readonly itemName: string;
    readonly orderDivision: string;
    readonly orderQuantity: string;
    readonly orderUnitPrice: string;

    constructor(body: any) {
        this.trID = body.trID;
        this.itemCode = body.itemCode;
        this.itemName = body.itemName;
        this.orderDivision = body.orderDivision;
        this.orderQuantity = body.orderQuantity;
        this.orderUnitPrice = body.orderUnitPrice;
    }
}
