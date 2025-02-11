class Employee {

    constructor(public name: string, public id: number, private salary: number) {}

    calculateBonus(): number {
        return 0; 
    }
    getSalary(): number{
        return this.salary;
    }
}

class Manager extends Employee {

    calculateBonus(): number {
        return this.getSalary() * 0.3;
    }
}

class Engineer extends Employee {
    calculateBonus(): number {
        return this.getSalary()* 0.25; 
}
}

class Intern extends Employee {
    calculateBonus(): number {
        return this.getSalary() * 0.05; 
    }
}


const manager = new Manager("Srushti", 1, 60000);
console.log(`Manager Bonus: ${manager.calculateBonus()}`);

const engineer = new Engineer("akshada", 2, 50000);
console.log(`Engineer Bonus: ${engineer.calculateBonus()}`);

const intern = new Intern("siddhi", 3, 40000);
console.log(`Intern Bonus: ${intern.calculateBonus()}`);

//output:
// Manager Bonus: 18000
// Engineer Bonus: 12500
// Intern Bonus: 2000
