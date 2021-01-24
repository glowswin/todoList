const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finList = document.querySelector(".js-FinishList");

const TODOS_LS = "toDos";
const FINISH_LS = "finL";

let toDos = [];
let fins = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== li.id;
  });
  toDos = cleanToDos;
  saveToDos();
}
function deleteFinList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finList.removeChild(li);
  const cleanFinList = fins.filter(function (fin) {
    return fin.id !== li.id;
  });
  fins = cleanFinList;
  saveFinList();
}
function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.firstChild;
  paintFinList(li.id, span.innerText);
  deleteToDo(event);
}
function backFinList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.firstChild;
  paintToDo(li.id, span.innerText);
  deleteFinList(event);
}
function saveToDos() {
  console.log("aa" + JSON.stringify(toDos));
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveFinList() {
  console.log("bb" + JSON.stringify(fins));
  localStorage.setItem(FINISH_LS, JSON.stringify(fins));
}

function paintToDo(id, text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  span.innerText = text;
  delBtn.innerText = "❌";
  checkBtn.innerText = "✅";
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.addEventListener("click", finishToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = id;
  toDoList.appendChild(li);
  const toDoObj = {
    id: id,
    text: text
  };
  toDos.push(toDoObj);
  saveToDos();
}
function paintFinList(id, text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  span.innerText = text;
  delBtn.innerText = "❌";
  backBtn.innerText = "⏪";
  delBtn.addEventListener("click", deleteFinList);
  backBtn.addEventListener("click", backFinList);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = id;
  finList.appendChild(li);
  const finishObj = {
    id: id,
    text: text
  };
  fins.push(finishObj);
  saveFinList();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const ndate = new Date();
  paintToDo(ndate.getTime() + "", currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.id, toDo.text);
    });
  }
}
function loadFinList() {
  const loadedFinList = localStorage.getItem(FINISH_LS);
  if (loadedFinList !== null) {
    const parsedFinList = JSON.parse(loadedFinList);
    parsedFinList.forEach(function (fin) {
      paintFinList(fin.id, fin.text);
    });
  }
}

function init() {
  loadToDos();
  loadFinList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();