// Array to hold all Tasks so they do not repeat themselves
var tasks = [];

// Input that holds the new task text
const taskInput = document.getElementById("task-input");

// Button to add New Task
const addButton = document.getElementById("add-button");
taskInput.focus();

// Run ear flick animation loop
earFlickAnimation();

// add a few dummy tasks with no animations/sounds
addNewTask("Dig up a bone.", false);
addNewTask("Investigate fire hydrant.", false);

// Add listener to button to allow tasks to be added.
addButton.addEventListener("click", function () {
    event.preventDefault();

    beginAddTask();

    // Refocus on input when done entering a previous input
    taskInput.focus();
});


// User has provided input. Begin to add the new task.
function beginAddTask() {
    event.preventDefault();

    // Clean up user input
    // trim
    // source: https://www.w3schools.com/jsref/jsref_trim_string.asp;
    let taskDescription = taskInput.value.trim();

    addNewTask(taskDescription, true);

}

// Returns true if task was empty
// Returns false if task was not empty
// Parameter: task to validate as string
function taskIsEmpty(newTask) {

    return newTask == "";
}

// Returns true if task is already in our tasks array
// Parameter: task to validate as string
function taskExists(newTask) {
    // Looping in javascript
    //source: https://stackoverflow.com/a/3010848  Sequential for loop
    var arrayLength = tasks.length;
    for (var i = 0; i < arrayLength; i++) {
        if (tasks[i] == newTask) {
            return true;
        }
    }
    return false;
}

// Main Function to add new tasks to current list
// Parameter1 taskDescription: new task in string
// Parameter2 animate: to animate/play sound as bool
function addNewTask(taskDescription, animate) {

    // Task should not exist and task should not be empty
    if (taskExists(taskDescription) || taskIsEmpty(taskDescription)) {
        // Task is invalid
        // Todo: Provide error message
        return;
    }

    // Add task to array
    tasks.push(taskDescription)

    // Refocus on task input
    taskInput.focus();

    // Clear task input
    taskInput.value = "";

    // If we are animating, play animation and sound
    if (animate == true) {
        playDog();

    }

    //If we had label indicating curent list is empty, remove it
    let emptyLabel = document.querySelector(".label-empty");
    if (emptyLabel != undefined) {
        emptyLabel.remove();
    }

    // Create label to add to current list
    let label = document.createElement("label");
    label.classList.add("label-li");

    // Label For attr: link to input
    // source: https://www.w3schools.com/jsref/prop_label_htmlfor.asp

    // Give a unique reference to the label
    var name = "current-" + (tasks.length - 1);
    label.htmlFor = name;
    label.id = name;

    // DRAG AND DROP FEATURE
    // Make the label draggable so we can swap its positions with other labels
    // source: https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondrop_addeventlistener
    // https://www.w3schools.com/jsref/event_ondrop.asp
    // https://stackoverflow.com/questions/28487352/dragndrop-datatransfer-getdata-empty
    label.draggable = "true";

    // Fires when we begin dragging a draggable object
    label.addEventListener("dragstart", function (ev) {

        // Save source ID
        ev.dataTransfer.setData("text", ev.target.id);

    });

    // Fires as we hover over object. Enables Drop.
    label.addEventListener("dragover", function (e) {

        // Save destination ID
        dropId = e.target.id;
        if (e.preventDefault) {
            e.preventDefault(); // Enable Drop
        }
        return false;
    });

    // Fires when draggable object is dropped
    // dropId stores destination
    var dropId;
    label.addEventListener("drop", function (ev) {

        // This is needed for Firefox or else we get problems (window redirection to element name)
        event.preventDefault();
        // Get source ID
        var data = ev.dataTransfer.getData("text");

        let elem1 = document.getElementById(data).parentElement;
        let elem2 = document.getElementById(dropId).parentElement;

        // only swap if we have the same parent (same list)
        // make sure the two elements aren't the same
        if (elem1.parentElement == elem2.parentElement && elem1 != elem2) {
            swapElements(elem1, elem2);
        }
    });

    // Begin creating new item
    let input = document.createElement("input");
    input.id = name;
    input.type = "checkbox";

    // Add event when the list item's checkbox is changed
    input.addEventListener("change", function () {
        if (this.checked == true) {
            //move to complete

            //disable checkbox
            // source: https://www.w3schools.com/jsref/prop_checkbox_disabled.asp
            input.disabled = true;

            // get li
            const li = document.getElementById(name).parentElement;


            //wait one second and then move list item to completed items
            setTimeout(function () {

                // Get Complete List
                var completeList = document.getElementById("complete-list");

                // Add Completed timestamp
                let completedLabel = document.createElement("label");
                completedLabel.classList.add("label-date");

                var d = new Date().toLocaleString();
                completedLabel.innerText = "\nCompleted: " + d;
                li.appendChild(completedLabel);

                completeList.appendChild(li);

                // Check if we currently have no list items in current list
                var currentList = document.getElementById("current-list");
                var childCount = currentList.childNodes.length - 1;
                if (childCount < 1) {

                    // We have no items in current list so add an empty label
                    let emptyLabel = document.createElement("label");
                    emptyLabel.classList.add("label-empty");
                    emptyLabel.innerText = "You have no Current Barks!";
                    currentList.appendChild(emptyLabel);
                }
            }, 600); // delay by 600ms
        } else {
            // Checkbox is now disabled, so we cannot switch back, but the code is here in case we ever want to switch back
            setTimeout(function () {
                var currentList = document.getElementById("current-list");
                currentList.appendChild(li);
            }, 600);
        }
    });

    // Create list item and its parts
    let li = document.createElement("li");

    // Delete image
    let imgDelete = document.createElement("img");

    // Edit image
    let imgEdit = document.createElement("img");

    // Set input text as label text
    label.innerText = taskDescription;

    // Set up image buttons
    // Add classes
    imgDelete.classList.add("bear");
    imgEdit.classList.add("bear");
    imgDelete.classList.add("bear-small");
    imgEdit.classList.add("bear-small");
    imgEdit.classList.add("bear-edit");

    // setup sources
    imgDelete.src = "media/bear-delete.png";
    imgEdit.src = "media/bear-edit.png";

    //add event listeners to buttons
    // Edit event
    imgEdit.addEventListener("click", function () {

        //source: https://www.w3schools.com/jsref/tryit.asp?filename=try_dom_body_contenteditable

        // Get the label
        let label = imgEdit.nextSibling

        // Make the label editable
        label.contentEditable = true;

        // Remove its For attr so we can edit the text without conflict
        var labelFor = label.htmlFor;
        label.htmlFor = "";


        // Focus the label ... is this needed?
        label.focus();

        // When we unfocus the label (blur), we must reset its For attr
        label.addEventListener("blur", function () {
            label.htmlFor = labelFor;

            // Stop editing label
            label.contentEditable = false;

            // Update edit timestamp
            let li = label.parentElement;

            // Check if we already have a label


            if (li.childNodes[5] != undefined && li.childNodes[5].classList.contains("edit-label")) {
                let oldLabel = li.childNodes[5];
                // We have a label, must check if it is not the Complete, then we know it's the edit label
                // we already have an edit date
                var d = new Date().toLocaleString();
                oldLabel.innerText = "\nLast Edit: " + d;
            }
            else if (li.childNodes[6] != undefined && li.childNodes[6].classList.contains("edit-label")) {
                let oldLabel = li.childNodes[6];
                // We have a label, must check if it is not the Complete, then we know it's the edit label
                // we already have an edit date
                var d = new Date().toLocaleString();
                oldLabel.innerText = "\nLast Edit: " + d;

            }
            else {
                // we must create an edit date
                let createdDate = document.createElement("label");
                createdDate.classList.add("label-date");
                createdDate.classList.add("edit-label");

                var d = new Date().toLocaleString();
                createdDate.innerText = "\nLast Edit: " + d;
                li.appendChild(createdDate);
            }

        });
    });

    //Delete event
    imgDelete.addEventListener("click", function () {

        //delete this item
        let item = imgDelete.parentElement;

        // Get label text. We need this to remove from the tasks array.
        var text = item.childNodes[3].innerText;

        li.remove();

        //remove from tasks array
        removeFromTasks(text);
    });


    // Create item
    li.appendChild(input);
    li.appendChild(imgDelete);
    li.appendChild(imgEdit);
    li.appendChild(label);

    // Get right now time
    // source: https://www.w3schools.com/js/js_dates.asp
    // https://www.w3schools.com/js/js_date_formats.asp

    let createdDate = document.createElement("label");
    createdDate.classList.add("label-date");
    createdDate.classList.add("created-label");

    var d = new Date().toLocaleString();
    createdDate.innerText = "\nCreated: " + d;
    li.appendChild(createdDate);

    // Get Current List
    let currentList = document.querySelector("#current-list");

    // Finally add item to list
    currentList.appendChild(li);
}

// Remove task from array
// parameter: task to remove as string
function removeFromTasks(text) {

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i] == text) {

            tasks.splice(i, 1);
            break; // no need to continue in loop
        }
    }
}

// Swap two siblings by position
// source: https://stackoverflow.com/a/10717422
// parameter1: first object to swap 
// parameter2: second object to swap
function swapElements(obj1, obj2) {
    // save the location of obj2
    var parent2 = obj2.parentNode;
    var next2 = obj2.nextSibling;
    // special case for obj1 is the next sibling of obj2
    if (next2 === obj1) {
        // just put obj1 before obj2
        parent2.insertBefore(obj1, obj2);
    } else {
        // insert obj2 right before obj1
        obj1.parentNode.insertBefore(obj2, obj1);

        // now insert obj1 where obj2 was
        if (next2) {
            // if there was an element after obj2, then insert obj1 right before that
            parent2.insertBefore(obj1, next2);
        } else {
            // otherwise, just append as last child
            parent2.appendChild(obj1);
        }
    }
}

// Run ear flicking animation
function earFlickAnimation() {

    var dog = document.getElementById("bear-mid");
    setInterval(function () {

        // Switch to dog ear
        dog.src = "media/bear-ear.png";

        //switch back to normal after 1s
        setTimeout(() => {
            dog.src = "media/bear.png";

        }, 100);
    }, (Math.floor(Math.random() * 10) + 2) * 1000); // 2 to 11 seconds
    //source: https://www.w3schools.com/js/js_random.asp
}

// Play animation (dog speaking) and dog sound (dog talking) from top-right logo
function playDog() {
    var snd = new Audio("media/woof.wav");
    snd.play();

    // switch doggo to animate for a second
    let dog = document.getElementById("bear-right");

    // change img source
    // source: https://www.w3schools.com/jsref/prop_img_src.asp

    dog.src = "media/bear-right-talk.png";

    let tooltip = document.getElementById("tooltip-bark");
    tooltip.style.visibility = "visible";
    // Set a timer to reset animation
    // need a timeout function
    // source: https://www.w3schools.com/jsref/met_win_settimeout.asp

    // after a small delay, switch animation back
    setTimeout(function () {
        dog.src = "media/bear-right.png";
        tooltip.style.visibility = "hidden";
    },
        410); 

}

// Add event listener to right dog in nav
// to allow user to click on it to play animation / play sound
var dog = document.getElementById("bear-right");
dog.addEventListener(
    "click",
    function () {
        playDog();
    }
);

// Execute a function when the user releases a key on the keyboard
// source: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// If user presses the enter key, simulate pressing the Add Button
taskInput.addEventListener("keyup", function (event) {
    event.preventDefault();

    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click

        document.getElementById("add-button").click();
    }
});

