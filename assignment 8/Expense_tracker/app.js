var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["Food"] = "Food";
    ExpenseCategory["Travel"] = "Travel";
    ExpenseCategory["Bills"] = "Bills";
    ExpenseCategory["Shopping"] = "Shopping";
    ExpenseCategory["Other"] = "Other";
})(ExpenseCategory || (ExpenseCategory = {}));
var expenseForm = document.getElementById("expenseForm");
var amountInput = document.getElementById("amount");
var categorySelect = document.getElementById("category");
var dateInput = document.getElementById("date");
var descriptionInput = document.getElementById("description");
var expenseBody = document.getElementById("expenseBody");
var filterCategory = document.getElementById("filterCategory");
var filterStartDate = document.getElementById("filterStartDate");
var filterEndDate = document.getElementById("filterEndDate");
var applyFiltersButton = document.getElementById("applyFilters");
var expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function renderExpenses(filteredExpenses) {
    var expensesToRender = filteredExpenses || expenses;
    expenseBody.innerHTML = expensesToRender
        .map(function (expense) { return "\n        <tr>\n          <td>".concat(expense.amount, "</td>\n          <td>").concat(expense.category, "</td>\n          <td>").concat(expense.date, "</td>\n          <td>").concat(expense.description, "</td>\n        </tr>\n      "); })
        .join("");
}
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var newExpense = {
        amount: +amountInput.value,
        category: categorySelect.value,
        date: dateInput.value,
        description: descriptionInput.value,
    };
    expenses.push(newExpense);
    saveExpenses();
    renderExpenses();
    expenseForm.reset();
});
applyFiltersButton.addEventListener("click", function () {
    var category = filterCategory.value;
    var startDate = filterStartDate.value;
    var endDate = filterEndDate.value;
    var filteredExpenses = expenses.filter(function (expense) {
        var matchesCategory = category ? expense.category === category : true;
        var matchesDateRange = (!startDate || expense.date >= startDate) &&
            (!endDate || expense.date <= endDate);
        return matchesCategory && matchesDateRange;
    });
    renderExpenses(filteredExpenses);
});
renderExpenses();
