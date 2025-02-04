class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    processPayment() {
        throw new Error("payment under processing...");
    }
}

class CreditCardPayment extends Payment {
    constructor(amount, date, cardNumber) {
        super(amount, date);
        this.#cardNumber = cardNumber; 
    }
    #cardNumber;

   
    processPayment() {
        const maskedCardNumber = this.#cardNumber.slice(-4).padStart(this.#cardNumber.length, '*');
        console.log(`Processing Credit Card Payment of ${this.amount} on ${this.date} with card ending in ${maskedCardNumber}`);
    }
}

class PayPalPayment extends Payment {
    constructor(amount, date, email) {
        super(amount, date);
        this.email = email;
    }
    processPayment() {
        console.log(`Processing PayPal Payment of ${this.amount} on ${this.date} with email ${this.email}`);
    }
}

class CryptoPayment extends Payment {
    constructor(amount, date, walletAddress) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }

    processPayment() {
        console.log(`Processing Crypto Payment of ${this.amount} on ${this.date} to wallet ${this.walletAddress}`);
    }
}

const creditCardPayment = new CreditCardPayment(1000, "2025-02-05", "1234567890123456");
const paypalPayment = new PayPalPayment(2000, "2025-02-05", "srushtihiray77@gmail.com");
const cryptoPayment = new CryptoPayment(300, "2025-02-05", "abcdefghijklmnop");

creditCardPayment.processPayment(); 
paypalPayment.processPayment(); 
cryptoPayment.processPayment(); 