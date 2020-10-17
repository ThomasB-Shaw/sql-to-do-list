console.log('Hello From JS');

$(document).ready(onReady);

function onReady() {
    console.log('Hello from Jquery!');
    clickListener();
    getTasks();
}

// Call GET Route Server side, and appends all info rows from the Database to the DOM
function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then((response) => {
        console.log('GET Response', response);
        appendTasks(response);
    }).catch((error) => {
        console.log('GET Error', error);
    });
} // End of getTasks

// Appends information from Database to DOM || Must be used in tandem with GET request||
function appendTasks(array) {
    $('.outputField').empty();
    console.log('DataValues', array);
    for (let i = 0; i < array.length; i++) {
        $(".outputField").append(`
        <li data-id=${array[i].id}>
        <p> ${array[i].task}: ${array[i].status} </p>
        <button class="completeBtn">Complete Task</button>
        <button class="deleteBtn">DELETE</button>
        </li>
        `);
    } // End of FOR Loop
} // End of appendTasks

// Cluster of click listeners to avoid unnecessary noise in onReady Function
function clickListener() {
    $('.outputField').on('click', '.completeBtn', completeClick);
    $('.outputField').on('click', '.deleteBtn', deleteClick);
    $('#submitBtn').on('click', submitClick);
}

function submitClick() {
    console.log('click Submit');
    $('#inputTask').val('');
} // End of submitClick

function completeClick() {
    console.log('click Complete');
} // End of completeClick

function deleteClick() {
    console.log('click DELETE');
} // End of deleteClick