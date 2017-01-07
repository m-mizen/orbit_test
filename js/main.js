// Get the system info:
function getSystem(systemName) {
    var xmlHttp = new XMLHttpRequest();
    var theUrl = "universe/" + systemName + ".json";
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
};

// Time variables
var t, timeDisplay;

// Init function
function init() {
    console.log(getSystem('system1'));

    t = 0;
    timeDisplay = document.getElementById("time");

    // Create stage
    var stage = new createjs.Stage("gameCanvas");

    // Add background to stage
    var bg = new createjs.Shape();
    stage.addChild(bg);
    bg.x = 0;
    bg.y = 0;
    bg.graphics.beginFill("black").drawRect(0, 0, stage.canvas.width, stage.canvas.height);


    // Create sun


    // Create planets


    // Start update loop
    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick() {
        // Add to time variable
        t++;
        // update time display
        timeDisplay.innerHTML = t;

        stage.update();
    }
}