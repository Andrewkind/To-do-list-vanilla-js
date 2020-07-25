function taskInputClick() {
    //alert("clicked");
    let x = document.getElementById("task-input");
    let taskDescription = x.value;
    addNewTask(taskDescription);

}

function addNewTask(taskDescription) {
    var text = taskInput.value;
    console.log(text);
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

function reportWindowSize() {
       console.log("window w: " + window.innerWidth + " h: " + window.innerHeight)

  }

var taskInput;
window.onload = function () {
    reportWindowSize();
    //alert("window w: " + window.innerWidth + " h: " + window.innerHeight)
    window.onresize = reportWindowSize;


    // Get the input field
    taskInput = document.getElementById("task-input");
    console.log(taskInput);
    // Execute a function when the user releases a key on the keyboard
    taskInput.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click

            document.getElementById("add-button").click();
        }
    });

}

