var tasks = [];

const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
taskInput.focus();

// Run ear flick animation loop
earFlickAnimation();

// add a few dummy tasks
addNewTask("Dig up a bone.");
addNewTask("Investigate fire hydrant.");

addButton.addEventListener("click", function () {
    event.preventDefault();

    taskInputClick();
    taskInput.focus();
});


function taskInputClick() {
    event.preventDefault();

    let taskDescription = taskInput.value.trim();


    // trim
    // source: https://www.w3schools.com/jsref/jsref_trim_string.asp;

    addNewTask(taskDescription);



}

function taskIsEmpty(newTask) {

    return newTask == "";
}


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


function drag(ev) {
    alert("oh");
    ev.dataTransfer.setData("text", ev.target.id);
}


function addNewTask(taskDescription) {



    // Task should not exist and task should not be empty
    if (taskExists(taskDescription) || taskIsEmpty(taskDescription)) {
        // Task is valid

        return;
    }
    tasks.push(taskDescription)

    taskInput.focus();
    taskInput.value = "";
    doggoClicked();


    // Create label
    let label = document.createElement("label");
    label.classList.add("label-li");

    // Label For attr: link to input
    // source: https://www.w3schools.com/jsref/prop_label_htmlfor.asp

    // Give a unique reference to the label
    var name = "current-" + (tasks.length - 1);
    label.htmlFor = name;
    label.id = name;

    // Make the label draggable so we can swap its positions with other labels
    // source: https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2
    label.draggable = "true";


    label.addEventListener("dragstart", function (ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        // drag1 = ev.target.id;
        // console.log(drag1);


    });

    label.addEventListener("dragover", function (e) {
        e.dataTransfer.setData("text2", e.target.id);
        drag1 = e.target.id;
        console.log("hello " + e.target.id);
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        return false;
    });
    label.addEventListener("drop", function (ev) {
        console.log(ev.dataTransfer.types);

        var data = ev.dataTransfer.getData("text");
        var data2 = ev.dataTransfer.getData("text2");

        console.log("starting index data: " + data);
        console.log("data2: " + data2);
        console.log("drag1: " + drag1);

        var x = document.getElementById(data)
        //ev.target.appendChild(x);

        let elem1 = document.getElementById(data).parentElement;
        let elem2 = document.getElementById(drag1).parentElement;

        // only swap if we have the same parent (same list)
        if (elem1.parentElement == elem2.parentElement) {
            swapElements(elem1, elem2);

        }



    });


    var drag1;





    let input = document.createElement("input");
    input.id = name;
    input.type = "checkbox";
    input.addEventListener("change", function () {
        if (this.checked == true) {
            //move to complete

            //disable checkbox
            input.disabled = true;

            // get li
            const li = document.getElementById(name).parentElement;
            // var li = 

            // get new location (complete list)

            //wait one second and then move
            setTimeout(function () {
                var completeList = document.getElementById("complete-list");

                completeList.appendChild(li);
                
            }, 600);
            // move li into loc
        } else {
            setTimeout(function () {
                var currentList = document.getElementById("current-list");
                currentList.appendChild(li);
            }, 600);
            //move to current
        }
    });
    let li = document.createElement("li");
    let imgDelete = document.createElement("img");
    let imgEdit = document.createElement("img");
    label.innerText = taskDescription;


    imgDelete.classList.add("bear");
    imgEdit.classList.add("bear");
    imgDelete.src = "media/bear-delete.png";

    //add hooks

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
        });




    });


    imgDelete.addEventListener("click", function () {


        //delete this item
        let item = imgDelete.parentElement;

        // Get label text. We need this to remove from the tasks array.
        var text = item.childNodes[3].innerText;

        li.remove();

        //remove from tasks array
        removeFromTasks(text);
    });

    imgDelete.classList.add("bear-small");
    imgEdit.classList.add("bear-small");
    imgEdit.classList.add("bear-edit");

    imgEdit.src = "media/bear-edit.png";

    li.appendChild(input);
    li.appendChild(imgDelete);
    li.appendChild(imgEdit);
    li.appendChild(label);

    // Get Current List
    let currentList = document.querySelector("#current-list");
    currentList.appendChild(li);

    return;
    var bears = document.querySelectorAll('.bear');
    alert(bears[0])
    for (bear in bears) {
        bear.classList.add("active");
        setTimeout(function () {
            bear.classList.remove("active");
        }, 550);
    }
}

function removeFromTasks(text) {

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i] == text) {

            tasks.splice(i, 1);
            break; // no need to continue in loop
        }
    }


}

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

function earFlickAnimation() {

    var dog = document.getElementById("bear-mid");

    setInterval(function () {

        // Switch to dog ear
        dog.src = "media/bear-ear.png";

        //switch back to normal after 1s
        setTimeout(() => {
            dog.src = "media/bear.png";

        }, 100);
    }, 5500);
}

function doggoClicked() {
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

    setTimeout(function () {
        dog.src = "media/bear-right.png";
        tooltip.style.visibility = "hidden";
    },
        410);


}




var dog = document.getElementById("bear-right");
dog.addEventListener(
    "click",
    function () {
        doggoClicked();
    }
);

// Execute a function when the user releases a key on the keyboard
taskInput.addEventListener("keyup", function (event) {
    event.preventDefault();

    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click

        document.getElementById("add-button").click();
    }
});

