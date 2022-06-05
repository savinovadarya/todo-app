const inputBox = document.querySelector('.add')
const addButton = document.querySelector('.add-btn')
const todoList = document.querySelector('.todolist')
const tasksCounter = document.querySelector('.task-number')
const removeTasks = document.querySelector('.remove')


inputBox.addEventListener('keyup', () => {
	let userTask = inputBox.value.trim()
	addButton.classList.toggle('active', userTask.length !== 0)
})
showUserTask()
setNumberOfTasks()

addButton.addEventListener('click', () => {
	let userTask = inputBox.value.trim()
	let arrayPreviousTask = parseData()
	arrayPreviousTask.push(userTask)
	localStorage.setItem('New Todo', JSON.stringify(arrayPreviousTask))
	showUserTask()
	setNumberOfTasks()
	inputBox.value = ''
})

removeTasks.addEventListener('click', () => {
	localStorage.clear()
	console.log(localStorage)
	showUserTask()
	setNumberOfTasks()
})

// - - - - - Functions
function parseData() {
	let getUserInfoToLocalStorage = localStorage.getItem('New Todo')
	let arrayPreviousTask
	if (getUserInfoToLocalStorage == null) {
		arrayPreviousTask = []
	} else {
		arrayPreviousTask = JSON.parse(getUserInfoToLocalStorage)
	}
	return arrayPreviousTask
}

function showUserTask() {
	let arrayPreviousTask = parseData()
	let newLiItem = []
	if (!arrayPreviousTask) return todoList.innerHTML = []
	for (let i = 0; i < arrayPreviousTask.length; i++) {
		newLiItem += `<li>${arrayPreviousTask[i]}<span onclick="deleteTask(${i})"><i class="fas fa-trash"></i></span></li>`
	}
	todoList.innerHTML = newLiItem
}

function setNumberOfTasks() {
	let numberOfTasks = `<span class="count-tasks">Tasks left: ${parseData().length}</span>`
	tasksCounter.innerHTML = numberOfTasks
}

function deleteTask(index) {
	let getLocalStorage = JSON.parse(localStorage.getItem('New Todo'))
	getLocalStorage.splice(index, 1)
	localStorage.setItem('New Todo', JSON.stringify(getLocalStorage))
	showUserTask()
	setNumberOfTasks()
}