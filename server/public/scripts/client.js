console.log('Hello From JS');

$(document).ready(onReady);

function onReady() {
    console.log('Hello from Jquery!');
    clickListener();
    getTasks();
} // End of onReady function


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
    $('#submitBtn').on('click', submitTask);
}

// Connects to POST Route on click of submit, POSTS new row to Database
// Then Re - GETs, to append new row to the DOM
function submitTask(){
    let newTask = $('#inputTask').val();
    $.ajax({
        method: 'POST',
        url:`/todo`,
        data: {task: newTask}
    }).then(function(response){
        console.log(response);
        getTasks();
    }).catch(function(error){
        console.log(error);
    });
}

function completeClick() {
    console.log('click Complete');
} // End of completeClick

function deleteClick() {
    console.log('click DELETE');
    let taskID = $(this).closest('li').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/todo/${taskID}`
    }).then((response) => {
        console.log('In DELETE', response);
        getTasks();
    }).catch((error) => {
        console.log('Error DELETE', error);
        alert('Error in DELETE!', error);
    });
} // End of deleteClick