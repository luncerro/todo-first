//dane
const input = document.querySelector(".search"); // pole wyszukiwania
const ul = document.querySelector(".tasklist"); // lista ul
const form = document.querySelector("form"); // formularz
const taskNumber = document.querySelector("h1 span"); //licznik zadań
const liItems = document.getElementsByClassName("task"); //ilość zadań
const toDoList = []; // lista wszystkich zadań

//przyciski usuwanie i przekreślanie

const doneTask = (e) => {
  if (e.target.parentNode.style.textDecoration == "line-through") {
    e.target.parentNode.style.textDecoration = "none";
    e.target.parentNode.style.color = "#dad8d7";
    e.target.parentNode.style.borderBottom = "2px solid #fdd400";
  } else {
    e.target.parentNode.style.textDecoration = "line-through";
    e.target.parentNode.style.color = "green";
    e.target.parentNode.style.borderBottom = "2px solid green";
  }
  taskNumber.textContent = liItems.length;
};
const removeTask = (e) => {
  e.target.parentNode.remove();
  const index = e.target.parentNode.dataset.key;
  toDoList.splice(index, 1);
  taskNumber.textContent = liItems.length;
  renderList();
};
// document.querySelectorAll('ul li .done').forEach(item => item.addEventListener('click', doneTask));
// document.querySelectorAll('ul li .remove').forEach(item => item.addEventListener('click', removeTask));

//wyszukiwarka

const searchTask = (e) => {
  const text = e.target.value.toLowerCase();
  let tasks = toDoList;
  tasks = tasks.filter((task) => task.textContent.toLowerCase().includes(text));
  ul.textContent = "";
  tasks.forEach((task) => ul.appendChild(task));
};

//dodawanie elementów

const addTask = (e) => {
  e.preventDefault();
  const input = document.querySelector("form input");
  const titleTask = input.value;
  if (titleTask === "" || titleTask.length > 120) {
    if (titleTask === "") return;
    return alert("Zbyt duża ilość znaków (max 120)!");
  }
  const newTask = document.createElement("li");
  newTask.className = "task";
  newTask.dataset.key = liItems.length;
  newTask.innerHTML = `${titleTask} 
    <button class="done">V</button><button class="remove">X</button>`;
  toDoList.push(newTask);
  renderList();
  ul.appendChild(newTask);
  input.value = "";
  newTask.querySelector(".done").addEventListener("click", doneTask);
  newTask.querySelector(".remove").addEventListener("click", removeTask);
  taskNumber.textContent = liItems.length;
};

const renderList = () => {
  ul.textContent = "";
  toDoList.forEach((toDoElement, key) => {
    toDoElement.dataset.key = key;
    ul.appendChild(toDoElement);
  });
};
//eventlistenery

form.addEventListener("submit", addTask);
input.addEventListener("input", searchTask);

//data
const poleData = document.querySelector("span.date");
const poleHour = document.querySelector(".hour");

zegar();
calendar();
setInterval(zegar, 1000);

function zegar() {
  let dzisiaj = new Date();
  poleHour.textContent = `${
    dzisiaj.getHours() < 10 ? "0" + dzisiaj.getHours() : dzisiaj.getHours()
  }:${
    dzisiaj.getMinutes() < 10
      ? "0" + dzisiaj.getMinutes()
      : dzisiaj.getMinutes()
  }`;
}

function calendar() {
  let dzisiaj = new Date();
  poleData.textContent = `${
    dzisiaj.getDate() < 10 ? "0" + dzisiaj.getDate() : dzisiaj.getDate()
  }.${
    dzisiaj.getMonth() + 1 < 10
      ? "0" + dzisiaj.getMonth() + 1
      : dzisiaj.getMonth() + 1
  }.${dzisiaj.getFullYear()}`;
}
