function renderTodos(todoArray) {
  const newTodoElements = todoArray.map(todo => {
    const liElement = document.createElement("li");
    liElement.setAttribute("id", todo.id);
    liElement.classList.add("todo");
    if (todo.completed) {
      liElement.classList.add("todo--completed");
    }

    liElement.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""}>

      <span>${todo.taskName}</span>

      <button>
        <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M18 6l-12 12"></path>
          <path d="M6 6l12 12"></path>
        </svg>
      </button>
    `;

    liElement.querySelector("input").addEventListener("change", toggleCompletedTodo);
    liElement.querySelector("button").addEventListener("click", deleteTodo);

    return liElement;
  });

  todoListElement.replaceChildren(...newTodoElements);
  totalTodos.innerHTML = `${todoArray.filter(todo => todo.completed === true).length}/${todoArray.length} TODOs`;
}

function addNewTodo(event) {
  event.preventDefault();

  const { searchText } = Object.fromEntries(new FormData(event.target).entries());
  
  if (searchText === "") {
    alert("Porfavor dale un nombre a la tarea");
    return;
  }

  const newTodo = document.createElement("li");
  const newId = crypto.randomUUID();
  newTodo.setAttribute("id", newId);
  newTodo.classList.add("todo");

  newTodo.innerHTML = `
    <input type="checkbox">

    <span>${searchText}</span>

    <button>
      <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M18 6l-12 12"></path>
        <path d="M6 6l12 12"></path>
      </svg>
    </button>
  `;

  newTodo.querySelector("input").addEventListener("change", toggleCompletedTodo);
  newTodo.querySelector("button").addEventListener("click", deleteTodo);

  TODO_LIST.push(
    {
      id: newId,
      completed: false,
      taskName: searchText
    }
  );

  todoListElement.append(newTodo);
  totalTodos.innerHTML = `${TODO_LIST.filter(todo => todo.completed === true).length}/${TODO_LIST.length} TODOs`;
  event.target.querySelector("input").value = "";
}

function toggleCompletedTodo(event) {
  const newValue = event.target.checked;
  const id = event.target.closest(".todo").getAttribute("id");

  const todoIndex = TODO_LIST.findIndex(todo => todo.id === id);

  TODO_LIST[todoIndex].completed = newValue;

  document.getElementById(`${id}`).classList.toggle("todo--completed");
  totalTodos.innerHTML = `${TODO_LIST.filter(todo => todo.completed === true).length}/${TODO_LIST.length} TODOs`;
}

function deleteTodo(event) {
  const id = event.target.closest(".todo").getAttribute("id");
  const todoToDelete = document.getElementById(id);

  const todoIndex = TODO_LIST.findIndex(todo => todo.id === id);

  TODO_LIST.splice(todoIndex, 1);
  todoToDelete.remove();
  totalTodos.innerHTML = `${TODO_LIST.filter(todo => todo.completed === true).length}/${TODO_LIST.length} TODOs`;
}

function deleteCompletedTodos(event) {
  TODO_LIST = TODO_LIST.filter(todo => todo.completed !== true);
  renderTodos(TODO_LIST);
}

let TODO_LIST = [
  {
    id: crypto.randomUUID(),
    completed: true,
    taskName: "Crear la base de datos"
  },
  {
    id: crypto.randomUUID(),
    completed: false,
    taskName: "Programar la interfaz"
  },
  {
    id: crypto.randomUUID(),
    completed: false,
    taskName: "Hacer del deploy"
  },
  {
    id: crypto.randomUUID(),
    completed: false,
    taskName: "Recoger la ropa"
  },
  {
    id: crypto.randomUUID(),
    completed: false,
    taskName: "Terminar la tarea"
  }
];

const totalTodos = document.querySelector("#totalTodos");

const deleteCompletedTodosBtn = document.querySelector("#deleteCompletedTodos");
deleteCompletedTodosBtn.addEventListener("click", deleteCompletedTodos)

const todoListElement = document.querySelector(".todo-list");

const formAddTodo = document.querySelector("#addTodoForm");
formAddTodo.addEventListener("submit", addNewTodo);

renderTodos(TODO_LIST);