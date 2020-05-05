let images = [];

images[0] = 'morning.jpg';
images[1] = 'day.jpg';
images[2] = 'afternoon.jpg';
images[3] = 'night.jpg';

function pickImages() {
    let date = new Date();
    let hours = date.getHours();
    let i = 0;

    if (hours > 6 && hours < 12) i = 0;
    if (hours >= 12 && hours < 18) i = 1;
    if (hours >= 18 && hours < 0) i = 2;
    if (hours >= 0 && hours < 6) i = 3;
    document.getElementById("mainImg").src = images[i];
}

function pickDate() {
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    let date = new Date();
    let dateString = date.toLocaleDateString('ru', options);
    let upperDateString = dateString.split(' ');

    document.getElementById("span").textContent = `${upperDateString[0][0].toUpperCase()}${upperDateString[0].slice(1)} ${upperDateString[1]} ${upperDateString[2][0].toUpperCase()}${upperDateString[2].slice(1)}`;
}

function editElement() {
    let li = document.createElement('li');
    li.classList.add('li');
    let div = document.createElement('div');
    let btn = document.createElement('button');
    let inputValue = document.getElementById('field').value;
    let text = document.createTextNode(inputValue);
    let refreshBtn = document.getElementById('refresh');

    div.classList.add('toDo');
    li.appendChild(text);
    btn.classList.add('deleteButton');
    btn.textContent = '-';
    if (inputValue.search(/^\s*$/) != -1) {
        alert('Нельзя начать дело с пробелов, или добавить пустое дело');
    } else {
        div.appendChild(btn);
        div.appendChild(li);
        document.getElementById('list').appendChild(div);
        li.addEventListener('click', () => {
            li.classList.toggle('li');
            li.classList.toggle('completedTasks');
            console.log(li)
            saveToDos(li);
        })
        saveToDos(inputValue);
    }
    document.getElementById('field').value = '';
    refreshBtn.addEventListener('click', () => {
        div.remove();
        localStorage.clear();
    });
    btn.addEventListener('click', (e) => {
        const item = e.target;

        if (item.classList[0] === 'deleteButton') {
            const todo = item.parentElement;
            todo.remove();
            deleteToDos(todo);
        }
    })
}

document.addEventListener('DOMContentLoaded', getToDos);

function saveToDos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getToDos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        let li = document.createElement('li');
        li.classList.add('li');
        let div = document.createElement('div');
        let btn = document.createElement('button');
        let inputValue = todo;
        let text = document.createTextNode(inputValue);
        let refreshBtn = document.getElementById('refresh');
        

        div.classList.add('toDo');
        li.appendChild(text);
        btn.classList.add('deleteButton');
        btn.textContent = '-';
        if (inputValue == '') {
            alert('Нельзя добавить пустое дело.');
        } else {
            div.appendChild(btn);
            div.appendChild(li);
            document.getElementById('list').appendChild(div);
            li.addEventListener('click', () => {
                li.classList.toggle('li');
                li.classList.toggle('completedTasks');
            })
        }
        refreshBtn.addEventListener('click', () => {
            div.remove();
            localStorage.clear();
        });
        btn.addEventListener('click', (e) => {
            const item = e.target;

            if (item.classList[0] === 'deleteButton') {
                const todo = item.parentElement;
                todo.remove();
                deleteToDos(todo);
            }
        })
    });
}

function deleteToDos(todo) {
    let todos;

    console.log(todo)
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const toDoIndex = todo.children[1].textContent;
    todos.splice(todos.indexOf(toDoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}



pickDate();
pickImages();
setInterval(pickImages, 1000);
setInterval(pickDate, 1000);
