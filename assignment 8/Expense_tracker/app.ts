
interface Expense {
    amount: number;
    category: string;
    date: string;
    description: string;
  }
  
  enum ExpenseCategory {
    Food = "Food",
    Travel = "Travel",
    Bills = "Bills",
    Shopping = "Shopping",
    Other = "Other",
  }
  
  const expenseForm = document.getElementById("expenseForm") as HTMLFormElement;
  const amountInput = document.getElementById("amount") as HTMLInputElement;
  const categorySelect = document.getElementById("category") as HTMLSelectElement;
  const dateInput = document.getElementById("date") as HTMLInputElement;
  const descriptionInput = document.getElementById("description") as HTMLInputElement;
  const expenseBody = document.getElementById("expenseBody") as HTMLTableSectionElement;
  const filterCategory = document.getElementById("filterCategory") as HTMLSelectElement;
  const filterStartDate = document.getElementById("filterStartDate") as HTMLInputElement;
  const filterEndDate = document.getElementById("filterEndDate") as HTMLInputElement;
  const applyFiltersButton = document.getElementById("applyFilters") as HTMLButtonElement;
  
  let expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");
  
  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
 
  function renderExpenses(filteredExpenses?: Expense[]) {
    const expensesToRender = filteredExpenses || expenses;
    expenseBody.innerHTML = expensesToRender
      .map(
        (expense) => `
        <tr>
          <td>${expense.amount}</td>
          <td>${expense.category}</td>
          <td>${expense.date}</td>
          <td>${expense.description}</td>
        </tr>
      `
      )
      .join("");
  }
  
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const newExpense: Expense = {
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
  
  applyFiltersButton.addEventListener("click", () => {
    const category = filterCategory.value;
    const startDate = filterStartDate.value;
    const endDate = filterEndDate.value;
  
    const filteredExpenses = expenses.filter((expense) => {
      const matchesCategory = category ? expense.category === category : true;
      const matchesDateRange =
        (!startDate || expense.date >= startDate) &&
        (!endDate || expense.date <= endDate);
      return matchesCategory && matchesDateRange;
    });
  
    renderExpenses(filteredExpenses);
  });
  
  
  renderExpenses();