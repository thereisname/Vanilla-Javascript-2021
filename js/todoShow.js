const todo = document.querySelector(".todo"), bars = document.querySelector(".bars"), statusBar = document.querySelector(".todo__status-bar");
 
function handleShow(event) {
    bars.classList.remove("show__status-bar");
    todo.classList.add("show__status-bar");
}

function handleHide(event) {
    todo.classList.remove("show__status-bar");
    bars.classList.add("show__status-bar");
}

function init() {
    const hide = statusBar.querySelector("button");
    const show = bars.querySelector("i");
    hide.addEventListener("click", handleHide);
    show.addEventListener("click", handleShow);
}
init();