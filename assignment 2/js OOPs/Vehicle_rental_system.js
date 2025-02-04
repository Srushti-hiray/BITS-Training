class Vehicle {
    constructor(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }
    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}

class Car extends Vehicle {
    constructor(brand, model, rentPricePerDay) {
        super(brand, model, rentPricePerDay);
    }

    calculateRentalCost(days) {
        return (this.rentPricePerDay * days)+5;
    }
}

class Bike extends Vehicle {
    constructor(brand, model, rentPricePerDay) {
        super(brand, model, rentPricePerDay);
    }

    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}

class Truck extends Vehicle {
    constructor(brand, model, rentPricePerDay) {
        super(brand, model, rentPricePerDay);
    }

    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}


const car = new Car("Tata", "A", 50);
const bike = new Bike("Honda", "B", 30);
const truck = new Truck("bullet", "C", 100);

console.log(car.calculateRentalCost(5)); 
console.log(bike.calculateRentalCost(5)); 
console.log(truck.calculateRentalCost(5)); 