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
        if (array[i].status === true) {
            $(".outputField").append(`
        <li data-id=${array[i].id} class='taskComplete'>
        <p> ${array[i].task} </p>
        <button class="deleteBtn">DELETE</button>
        </li>
        `);
        } else {
        $(".outputField").append(`
        <li data-id=${array[i].id} class='taskIncomplete'>
        <p> ${array[i].task}: ${array[i].status} </p>
        <button class="completeBtn">Complete Task</button>
        <button class="deleteBtn">DELETE</button>
        </li>
        `);
        }
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
        $('#inputTask').val('');
        getTasks();
    }).catch(function(error){
        console.log(error);
    });
}

// Upon click from DOM, this function grabs the ID of the row it is in by the DATA set in <li> 
function completeClick() {
    console.log('click Complete');
    let taskID = $(this).closest('li').data('id');
    $.ajax({
        method: 'PUT',
        url: `/todo/status/${taskID}`,
        data: {status: true}
    }).then((response) => {
        console.log('Response PUT', response);
        getTasks();
    }).catch((error) => {
        console.log('ERROR IN PUT', error);
        alert('ERROR IN PUT', error);
    })
} // End of completeClick

// Upon click in the DOM, this function grabs the ID of the row it is in by the DATA set in the <li> and send that back to the router, to remove the row selected
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