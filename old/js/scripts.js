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

    // Run ear flick animation loop
    earFlickAnimation();
}

function earFlickAnimation() {

    var dog = document.getElementById("bear-mid");

    setInterval(function() {

        // Switch to dog ear
        dog.src = "media/bear-ear.png";

        //switch back to normal after 1s
        setTimeout(() => {
            dog.src = "media/bear.png";

        }, 50);
    }, 4000);
}

function doggoClicked() {
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
        200);


}

var send;
var taskInput;
window.onload = function () {
    reportWindowSize();
    //alert("window w: " + window.innerWidth + " h: " + window.innerHeight)
    window.onresize = reportWindowSize;


    var dog = document.getElementById("bear-right");
    dog.addEventListener(
        "click",
        function () {
            doggoClicked();
        }
    );


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
    snd = new Audio("media/woof.wav");

}

