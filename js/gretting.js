const form = document.querySelector(".js-form"), input = form.querySelector("input"), greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", SHOWING_CN = "showing";

function saveName(text) { //새로고침을 해도 계속 저장할 수 있게 해주는 함수
  localStorage.setItem(USER_LS, text);
}

function handleSubmint(event) {
  event.preventDefault();
  const currentValue = input.value;
  // console.log(currentValue);
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmint)
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init(){
  loadName();
}

init();