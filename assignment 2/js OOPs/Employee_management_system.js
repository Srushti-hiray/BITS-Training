class Employee {
    constructor(name, id, salary) {
        this.name = name;
        this.id = id;
        this.#salary = salary; 
    }
    #salary;

    getSalary() {
        return this.#salary;
    }

    calculateBonus() {
        return 500; 
    }
}

class Manager extends Employee {
    constructor(name, id, salary) {
        super(name, id, salary);
    }
    calculateBonus() {
        return this.getSalary() * 0.1;
    }
}

class Engineer extends Employee {
    constructor(name, id, salary) {
        super(name, id, salary);
    }

    calculateBonus() {
        return this.getSalary() * 0.2; 
    }
}

class Intern extends Employee {
    constructor(name, id, salary) {
        super(name, id, salary);
    }
    calculateBonus() {
        return this.getSalary() * 0.05; 
    }
}

const manager = new Manager("srushti", 15, 600000);
const engineer = new Engineer("siddhi", 7, 40000);
const intern = new Intern("akshada", 4, 60000);

console.log(manager.calculateBonus()); 
console.log(engineer.calculateBonus()); 
console.log(intern.calculateBonus()); 