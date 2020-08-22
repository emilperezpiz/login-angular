export class PaymentCard {
    public cardNumber: number;
    public name: string;
    public surname: string;
    public expiry: any;
    public cvc: number;
    public ultimateCardDigit?: any;
    public credit: string;
    public billingAddress: string;

    constructor() {
        this.credit = "S";
    }
}