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

// if (inputValue.search(/^\s*$/) != -1) {
//     alert('Нельзя начать дело с пробелов, или добавить пустое дело');
// } else {

const refreshBtn = document.getElementById('refresh');
const list = document.getElementById('list');
const input = document.getElementById('field');
let li = document.createElement('li');
let div = document.createElement('div');
li.classList.add('li');
let inputValue = document.getElementById('field').value;
let text = document.createTextNode(inputValue);
let btn = document.createElement('button');
let LIST, id;

let data = localStorage.getItem('TODO');

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.id);
    });
}

refreshBtn.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});


function addToDo(id) {
    const position = 'beforeend';
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

        list.insertAdjacentHTML(position, item);
    }
}

    // add an item to the list user the enter key
    document.addEventListener("keyup", function (even) {
        if (event.keyCode == 13) {
            const toDo = input.value;

            // if the input isn't empty
            if (toDo) {
                addToDo(toDo, id, false);

                LIST.push({
                    name: toDo,
                    id: id,
                    done: false
                });

                // add item to localstorage ( this code must be added where the LIST array is updated)
                localStorage.setItem("TODO", JSON.stringify(LIST));

                id++;
                console.log(id)
            }
            input.value = "";
        }
    });


    // complete to do
    function completeToDo(element) {
        element.classList.toggle('li');
        element.classList.toggle('complete');
        console.log(element)
        LIST[element.id].done = LIST[element.id].done ? false : true;
    }

    // remove to do
    function removeToDo(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);

        LIST[element.id].trash = true;
    }

    // target the items created dynamically

    li.addEventListener("click", function (event) {
        const element = event.target; // return the clicked element inside list  // complete or delet
        completeToDo(element);
        // add item to localstorage ( this code must be added where the LIST array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));
    });


    pickDate();
    pickImages();
    setInterval(pickImages, 1000);
    setInterval(pickDate, 1000);