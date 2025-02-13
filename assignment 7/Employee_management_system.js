var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Department = /** @class */ (function () {
    function Department() {
        this.employees = [];
    }
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.removeEmployee = function (id) {
        this.employees = this.employees.filter(function (employee) { return employee.id !== id; });
    };
    Object.defineProperty(Department.prototype, "TotalSalary", {
        get: function () {
            return this.employees.reduce(function (total, employee) { return total + employee.salary; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Department.prototype.ListEmployees = function () {
        this.employees.forEach(function (employee) {
            console.log("ID: ".concat(employee.id, ", Name: ").concat(employee.name, ", Position: ").concat(employee.position, ", Salary: ").concat(employee.salary));
        });
    };
    return Department;
}());
var GenericStorage = /** @class */ (function () {
    function GenericStorage() {
        this.items = [];
    }
    GenericStorage.prototype.add = function (item) {
        this.items.push(item);
    };
    GenericStorage.prototype.remove = function (item) {
        this.items = this.items.filter(function (i) { return i !== item; });
    };
    GenericStorage.prototype.getAll = function () {
        return this.items;
    };
    return GenericStorage;
}());
function updateSalary(employee, newSalary) {
    return __assign(__assign({}, employee), { salary: newSalary });
}
var employee1 = { id: 1, name: "srushti", position: "Developer", salary: 50000 };
var employee2 = { id: 2, name: "siddhi", position: "Designer", salary: 60000 };
var manager1 = { id: 3, name: "Akshada", position: "Manager", salary: 80000, teamSize: 5 };
var department = new Department();
department.addEmployee(employee1);
department.addEmployee(employee2);
department.addEmployee(manager1);
console.log("Employees in the department:");
department.ListEmployees();
console.log("Total salary of all employees:", department.TotalSalary);
department.removeEmployee(2);
console.log("After removing employee with ID 2:");
department.ListEmployees();
var updatedEmployee = updateSalary(employee1, 55000);
console.log("Updated employee:", updatedEmployee);
var employeeStorage = new GenericStorage();
employeeStorage.add(employee1);
employeeStorage.add(employee2);
console.log("All employees in storage:", employeeStorage.getAll());
