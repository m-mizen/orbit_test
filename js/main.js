// This info would be brought in from somewhere else. Maybe stored in a database or an external json file.
var systemInfo = {
    systemName: "Test system",
    star: {
        type: "blue giant"
    },
    planets: [{
            name: "test planet 1",
            colour: "red",
            size: 8,
            orbit: {
                a: 200, // semi-major axis
                e: 0.1, //eccentricity  
            }
        },
        {
            name: "test planet 2",
            colour: "blue",
            size: 5,
            orbit: {
                a: 400, // semi-major axis
                e: 0.01, //eccentricity  
            }
        }
    ]
};

// Time variables
var t, timeDisplay;

// Init function
function init() {
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
    var sun = new star();
    sun.addToStage(stage);

    // Create planets
    var planets = [];
    for (let i = 0; i < systemInfo.planets.length; i++) {
        let thisPlanetInfo = systemInfo.planets[i];
        planets[i] = new oribitalBody({
                size: thisPlanetInfo.size,
                colour: thisPlanetInfo.colour,
            },
            systemInfo.planets[i].orbit
        );
        planets[i].addToStage(sun.system);
        planets[i].checkValues();
    }


    // Start update loop
    createjs.Ticker.addEventListener("tick", handleTick);

    var scaleSystem = 1;

    function handleTick() {
        // Add to time variable
        t++;
        // update time display
        timeDisplay.innerHTML = t;

        // Zoom out on page
        scaleSystem = 1 - ((t % 80) / 100);

        sun.system.scaleX = scaleSystem
        sun.system.scaleY = scaleSystem

        stage.update();
    }
}