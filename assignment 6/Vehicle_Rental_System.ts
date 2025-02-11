class Vehical{
    constructor(public brand:string,public model:string,public rentPricePerDay:number){}
        calculateRentalCost(days:number):number{
            return days*this.rentPricePerDay;
        
        }

}
class Car extends Vehical{
    calculateRentalCost(days:number):number{
        return (days*this.rentPricePerDay) * 0.1;
    
    }
}

class Bike extends Vehical{
    calculateRentalCost(days:number):number{
        return (days*this.rentPricePerDay) * 0.4;
    
    }


}
class Truck extends Vehical{
    calculateRentalCost(days:number):number{
        return (days*this.rentPricePerDay) * 0.5;
    
    }


}
const car = new Car("Toyota", "A", 50);
console.log(`Car Rental Cost for 5 days: ${car.calculateRentalCost(5)}`);

const bike = new Bike("Tata", "B", 20);
console.log(`Bike Rental Cost for 5 days: ${bike.calculateRentalCost(5)}`);

const truck = new Truck("XUV", "C", 100);
console.log(`Truck Rental Cost for 5 days: ${truck.calculateRentalCost(5)}`);

//output:
// Car Rental Cost for 5 days: 25
// Bike Rental Cost for 5 days: 40
// Truck Rental Cost for 5 days: 250
