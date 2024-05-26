const localStorageKey = 'to-do-list-gn';

// Valida se já existe uma nova tarefa com o mesmo nome
function validateIfExistsNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById('new-task').value;
  let exists = values.find(x => x.name === inputValue);
  return !!exists;
}

// Adiciona uma nova tarefa
function newTask() {
  let input = document.getElementById('new-task');
  input.style.border = '';

  // Validação
  if (!input.value) {
    input.style.border = '1px solid red';
    alert('Digite algo para inserir em sua lista');
  } else if (validateIfExistsNewTask()) {
    alert('Já existe uma task com essa descrição');
  } else {
    // Incrementa no localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({ name: input.value });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
  input.value = '';
}

// remove as tarefas
function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let list = document.getElementById('todo-list');
  list.innerHTML = '';
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i]['name']}<button class='btn-remove' onclick='removeItem("${values[i]['name']}")'>x</button></li>`;
  }
}

// remove as tarefas
function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex(x => x.name === data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();
}

// carrega as tarefas
document.addEventListener('DOMContentLoaded', () => {
  showValues();

  const todoForm = document.getElementById('todo-form');
  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newTask();
  });
});
