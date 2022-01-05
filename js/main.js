let todos = [
    { id: 1, title: "Wake up", completed: true },
    { id: 2, title: "Go to mosque", completed: true },
    { id: 3, title: "Go to work", completed: false },
    { id: 4, title: "Have breakfast", completed: false },
];

let isEdit = false;
let whichEl = null;

// constants
const todos_ul = document.querySelector(".card-body ul");
const form = document.querySelector("#form");
const title_in = document.getElementById("title");

const WriteTodos = () => {
    todos_ul.innerHTML = "";
    todos.map((todo, index) => {
        if (todo.completed) {
            todos_ul.innerHTML += `<li>
                <span class="completed">
                    <input onchange="ChangeCompleted(${todo.id})" type="checkbox" checked> &nbsp;
                    ${index + 1}. ${todo.title}
                </span>
                <span>
                    <i onclick="EditStarted(${todo.id})" class="bi bi-pencil-square"></i>
                    <i onclick="DeleteTodo(${todo.id})" class="bi bi-trash"></i>
                </span>
            </li>`
        } else {
            todos_ul.innerHTML += `<li>
                <span>
                    <input onchange="ChangeCompleted(${todo.id})" type="checkbox"> &nbsp;
                    ${index + 1}. ${todo.title}
                </span>
                <span>
                    <i onclick="EditStarted(${todo.id})" class="bi bi-pencil-square"></i>
                    <i onclick="DeleteTodo(${todo.id})" class="bi bi-trash"></i>
                </span>
            </li>`
        }
    })
}

form.onsubmit = (e) => {
    e.preventDefault();
    let new_todo = {
        id: Date.now(),
        title: e.target[0].value,
        completed: false
    };

    if (new_todo.title !== "") {
        if (!isEdit) {
            // todos.push(new_todo);
            todos = [...todos, new_todo];
        } else {
            let nArr = [];
            todos.map(todo => {
                if (todo.id === whichEl) {
                    todo.title = new_todo.title;
                }
                nArr.push(todo);
            })
            todos = nArr;
            isEdit = false;
            whichEl = null;
            title_in.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add'
        }
        WriteTodos();
        form.reset();
    } else {
        alert("Fill the gap!");
    }

}

const DeleteTodo = (id) => {
    let confirmation = window.confirm("Are you sure to delete this todo?");
    if (confirmation) {
        let nArr = [];
        todos.map(todo => {
            if (todo.id !== id) {
                nArr.push(todo);
            }
        })
        todos = nArr;
        WriteTodos();
    }
}

const ChangeCompleted = (id) => {
    let nArr = [];
    todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        nArr.push(todo);
    })

    todos = nArr;
    WriteTodos();
}

const EditStarted = (id) => {
    isEdit = true;
    whichEl = id;
    todos.map(todo => {
        if (todo.id === id) {
            title_in.value = todo.title;
        }
    });
    title_in.nextElementSibling.innerHTML = '<i class="bi bi-pencil-square"></i> Edit'
}

window.onload = () => WriteTodos();