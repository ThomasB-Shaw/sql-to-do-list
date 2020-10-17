#### SQL TODO LIST

### SET UP
[X] Set up all Server Folders
    [X]  gitignore
    [X]  Front End
    [X]  Back End
    [X]  README

### FRONT END
    [X] Create a front end experience that allows a user to create a Task
        [X] Create Post function that takes in inputs from input field and appends it to the DOM in a list format at the bottom of the current list
    [] Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
        [] Create GET request that can be place at:
            [] Page Load
            [] POST, GET, DELETE, PUT functions
    [] Each Task should have an option to 'Complete' or 'Delete'.
        [] Append a complete and delete btn
    [] When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
        [] Add/Remove class function to affect background CSS Styling
        [] Put function to update the back end
    [] Deleting a Task should remove it from the front.
        [] Delete function completed on delete button click

### BACK END
    [X] When the Task is created, it should be stored inside of a database
        [X] Create POST route
    [] Whether or not a Task is complete should also be stored in the database.
        [] Own section in table, boolean
        [] PUT Route
    [] Deleting a Task should remove it from the Database.
        [] Delete Route

### Styling
    [X] Background color of the page
    [] Font family and size
    [] Text color & or background color of tasks to show whether or not they have been completed


### MISC
[] Read Instructions Over
    [X] Friday
    [] Saturday
    [] Sunday
[] Todo list finish, all task complete