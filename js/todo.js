const pendingList = document.getElementById("js-pending"),
  finishedList = document.getElementById("js-finished"),
  formTodo = document.getElementById("js-form__todo"),
  inputTodo = formTodo.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text
  };
}

function savePendingTask(task) {
  pendingTasks.push(task);
}

function findInFinished(taskId) {
  return finishedTasks.find(function(task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function(task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

function buildGenericLi(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  li.setAttribute("class", "todo-margin");
  deleteBtn.setAttribute("class", "btnTodo");
  span.innerText = task.text;
  span.style.wordBreak = "break-word";
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
  return li;
}

function paintPendingTask(task) {
  const genericLi = buildGenericLi(task);
  const completeBtn = document.createElement("button");
  completeBtn.setAttribute("class", "btnTodo");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
}

function paintFinishedTask(task) {
  const genericLi = buildGenericLi(task);
  const backBtn = document.createElement("button");
  backBtn.setAttribute("class", "btnTodo");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}

function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState() {
  pendingTasks.forEach(function(task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function(task) {
    paintFinishedTask(task);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const taskObj = getTaskObject(inputTodo.value);
  inputTodo.value = "";
  paintPendingTask(taskObj);
  savePendingTask(taskObj);
  saveState();
}

function init() {
  formTodo.addEventListener("submit", handleFormSubmit);
  loadState();
  restoreState();
}
init();