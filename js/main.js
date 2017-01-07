// Get the system info:
function getSystem(systemName, success) {
    var xhr = new XMLHttpRequest();
    var url = "universe/" + systemName + ".json";
    if (!("withCredentials" in xhr)) xhr = new XDomainRequest(); // fix IE8/9
    xhr.open("GET", url);
    xhr.onload = success;
    xhr.send();
    return xhr;
}

// Time variables
var t, timeDisplay;
var planets = [];
// Init function
function init() {

    var systemInfo;
    getSystem("system1", function(request) {
        var response = request.currentTarget.response || request.target.responseText;
        systemInfo = JSON.parse(response);
        console.log(systemInfo);
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

        var uiLayer;
        var systemContainer = new createjs.Container();
        stage.addChild(systemContainer);
        systemContainer.x = Reality.width / 2;
        systemContainer.y = Reality.height / 2;


        // Create sun
        var sun = new Star(systemInfo.star, systemContainer);
        sun.attributes.size = parseInt(systemInfo.star.size);

        sun.buildBody();

        // var planets = [];
        // Create planets
        for (let i = 0; i < systemInfo.planets.length; i++) {
            let newPlanet = new OrbitalBody(systemInfo.planets[i], sun.influence);
            newPlanet.buildBody();
            planets.push(newPlanet);

        };

        console.log(planets);

        createjs.Ticker.addEventListener("tick", handleTick);

        function handleTick() {
            t += Reality.timeC;
            // update time display
            timeDisplay.innerHTML = t;

            for (let i = 0; i < planets.length; i++) {
                planets[i].updateBody(t);
            };
            stage.update();
        }

        // Interaction

        sun.uiCircle.addEventListener("click", function(event) {
            console.log(event);
        });
        for (let i = 0; i < planets.length; i++) {
            planets[i].uiCircle.addEventListener("click", function(event) {
                console.log(event.target);
            });;
        };


        var mouseDownLocation = false;
        stage.on("stagemousedown", function(evt) {
            mouseDownLocation = {
                x: evt.stageX,
                y: evt.stageY
            }
        });
        stage.on("stagemousemove", function(evt) {
            if (mouseDownLocation !== false) {
                movedX = evt.stageX - mouseDownLocation.x;
                movedY = evt.stageY - mouseDownLocation.y;

                systemContainer.x += movedX * 0.2;
                systemContainer.y += movedY * 0.2;
                mouseDownLocation = {
                    x: evt.stageX,
                    y: evt.stageY
                }
            }
        });
        stage.on("stagemouseup", function(evt) {
            mouseDownLocation = false;
        })

        // gameCanvas.addEventListener("mousewheel", function(event) {
        //     event.preventDefault();
        //     if (event.wheelDeltaY > 40 || event.wheelDeltaY < 40) {
        //         if (event.wheelDeltaY > 0) {
        //             Reality.scale = Reality.scale * 2;
        //         } else {
        //             Reality.scale = Reality.scale / 2;
        //         }
        //     }
        // });
    });
}