document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const deleteAllButton = document.getElementById("delete-all-todo"); // New Delete All button
    const ulTodo = document.getElementById("ul-todo");
  
    let editMode = false;
    let editElement = null;
    
    buttonTodo.addEventListener("click", () => {
      const text = inputTodo.value;
      if (editMode) {
        editElement.querySelector(".text-todo").textContent = text;
        editMode = false;
        editElement = null;
        buttonTodo.textContent = "Add";
      } else {
        createTodo(text);
      }
      inputTodo.value = "";
      saveAllTodo();
    });
  
    const createTodo = (task) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-start";
  
      li.innerHTML = `<span class="text-todo">${task}</span>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-danger edit-btn">Edit</button>
        <button type="button" class="btn btn-warning delete-btn">Delete</button>
      </div>`;
      ulTodo.appendChild(li);
    };
  
    ulTodo.addEventListener("click", (e) => {
      const li = e.target.closest(".list-group-item");
  
      if (e.target.classList.contains("delete-btn")) {
        
        li.remove();
        saveAllTodo();
      }
  
      if (e.target.classList.contains("edit-btn")) {
       
        const textSpan = li.querySelector(".text-todo");
        const taskText = textSpan.textContent;
  
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = taskText;
        inputField.className = "form-control";
        textSpan.replaceWith(inputField);
  
        e.target.textContent = "Save";
        e.target.classList.remove("btn-danger", "edit-btn");
        e.target.classList.add("btn-success", "save-btn");
  
        inputField.focus();
  
        const saveText = () => {
          const newText = inputField.value.trim();
          if (newText) {
            const newTextSpan = document.createElement("span");
            newTextSpan.className = "text-todo";
            newTextSpan.textContent = newText;
            inputField.replaceWith(newTextSpan);
  
            e.target.textContent = "Edit";
            e.target.classList.remove("btn-success", "save-btn");
            e.target.classList.add("btn-danger", "edit-btn");
  
            saveAllTodo();
          }
        };
  
        inputField.addEventListener("keypress", (event) => {
          if (event.key === "Enter") {
            saveText();
          }
        });
  
        e.target.onclick=() =>{
            saveText();
        }
      }
    });
  
    deleteAllButton.addEventListener("click", () => {
      const confirmDelete = confirm("Are you sure you want to delete all tasks?");
      if (confirmDelete) {
        ulTodo.innerHTML = ""; 
        localStorage.removeItem("allTodos"); 
      }
    });
  
    const loadAllTodo = () => {
      const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
      allTodos.forEach((task) => createTodo(task));
    };
  
    const saveAllTodo = () => {
      const allTodos = [...document.querySelectorAll(".text-todo")].map(
        (task) => task.textContent
      );
      localStorage.setItem("allTodos", JSON.stringify(allTodos));
    };
  
    loadAllTodo();
  });
  