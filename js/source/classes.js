class star {
    /**
     * Class for stars
     */
    constructor() {
        this.display = new createjs.Shape();

        this.system = new createjs.Container();

        this.size = 10;
        this.position;
        this.brightness = 100;
    }
    addToStage(thisStage) {
        this.position = {
            x: -this.size / 2,
            y: -this.size / 2
        }
        this.system.x = thisStage.canvas.width / 2;
        this.system.y = (thisStage.canvas.height / 2);

        this.display.graphics.beginFill("yellow").drawCircle(this.position.x, this.position.y, this.size);
        thisStage.addChild(this.system);
        this.system.addChild(this.display);
    }
}

class oribitalBody {
    /**
     * Class for obital bodies (planets moons etc)
     */
    constructor(info, orbitInfo) {

        this.display = new createjs.Shape(); // Planet circle
        this.displayOrbit = new createjs.Shape(); // Orbit ellipse

        this.size = 10; // default size
        this.colour = "red"; // default colour

        this.orbit = orbitInfo; // import orbit info

        this.currentLocation = {
            x: -(this.orbit.a),
            y: 0
        }; // Set start location

        if (typeof info === "object") {
            this.size = info.size || this.size;
            this.colour = info.colour || this.colour;
        }
    }
    addToStage(thisContainer) {
        // Add the planet and the orbit path to the container.

        // Update the position of the planet.
        this.updatePosition(window.t);

        // Draw Planet
        this.display.graphics.beginFill(this.colour).drawCircle(this.currentLocation.x, this.currentLocation.y, this.size)

        // Calc orbit ellipse
        let rmax = this.orbit.a;
        let rmin = this.orbit.a * (1 - this.orbit.e);
        let orbitWidth = rmax + rmin;
        let orbitHeight = 2 * Math.sqrt(rmax * rmin);

        // Draw orbit ellipse
        this.displayOrbit.graphics.beginStroke('purple').drawEllipse(
            (-rmax),
            (orbitHeight / -2),
            orbitWidth,
            orbitHeight
        );

        // Add shapes to parent
        thisContainer.addChild(this.display);
        thisContainer.addChild(this.displayOrbit);

    }
    updatePosition(time) {
        // Update location of the planet
    }
    checkValues() {
        // For debugging
        console.log(this);
        let rmax = this.orbit.a;
        let rmin = this.orbit.a * (1 - this.orbit.e);
        let orbitWidth = rmax + rmin;
        let orbitHeight = Math.sqrt(rmax * rmin);
        console.log(rmax, rmin, orbitHeight, orbitWidth);
    }
}