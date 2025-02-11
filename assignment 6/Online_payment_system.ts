abstract class Payment{
    constructor(public amount:number,public date:string){}

    abstract processPayment():void;
}
class CreditCardPayment extends Payment{
    private cardNumber:string;
    constructor(public amount:number,public date:string,cardNumber:string){
        super(amount,date);
        this.cardNumber=cardNumber;

    }
    processPayment(): void {
        console.log(`Processing Credit Card Payment of ${this.amount} amount on ${this.date}`);
    }

}
class PayPalPayment extends Payment {
    constructor(amount: number, date: string, private email: string) {
        super(amount, date);
    }

    processPayment(): void {
        console.log(`Processing PayPal Payment of ${this.amount} amount from ${this.email} on ${this.date}`);
    }
}
class CryptoPayment extends Payment {
    constructor(amount: number, date: string, private walletAddress: string) {
        super(amount, date);
    }

    processPayment(): void {
        console.log(`Processing Crypto Payment of ${this.amount} amount to wallet ${this.walletAddress} on ${this.date}`);
    }
}

const creditPayment = new CreditCardPayment(1000, "2025-02-11", "123456qwert");
creditPayment.processPayment();

const paypalPayment = new PayPalPayment(550, "2025-02-11", "srushtihiray77@gmail.com");
paypalPayment.processPayment();

const cryptoPayment = new CryptoPayment(250, "2025-02-11", "098765poiuyt");
cryptoPayment.processPayment();
//output
// Processing Credit Card Payment of 1000 amount on 2025-02-11
// Processing PayPal Payment of 550 amount from srushtihiray77@gmail.com on 2025-02-11
// Processing Crypto Payment of 250 amount to wallet 098765poiuyt on 2025-02-11
