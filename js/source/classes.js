class star {
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
    constructor(info, orbitInfo) {
        this.display = new createjs.Shape();
        this.displayOrbit = new createjs.Shape();

        this.size = 10;
        this.colour = "red";

        this.orbit = orbitInfo;

        this.currentLocation = {
            x: -(this.orbit.a),
            y: 0
        };

        if (typeof info === "object") {
            this.size = info.size || this.size;
            this.colour = info.colour || this.colour;
        }
    }
    addToStage(thisContainer) {

        this.updatePosition(window.t);

        this.display.graphics.beginFill(this.colour).drawCircle(this.currentLocation.x, this.currentLocation.y, this.size)

        let rmax = this.orbit.a;
        let rmin = this.orbit.a * (1 - this.orbit.e);
        let orbitWidth = rmax + rmin;
        let orbitHeight = 2 * Math.sqrt(rmax * rmin);


        this.displayOrbit.graphics.beginStroke('purple').drawEllipse(
            (-rmax),
            (orbitHeight / -2),
            orbitWidth,
            orbitHeight
        );

        thisContainer.addChild(this.display);
        thisContainer.addChild(this.displayOrbit);

    }
    updatePosition(time) {

    }
    checkValues() {
        console.log(this);
        let rmax = this.orbit.a;
        let rmin = this.orbit.a * (1 - this.orbit.e);
        let orbitWidth = rmax + rmin;
        let orbitHeight = Math.sqrt(rmax * rmin);
        console.log(rmax, rmin, orbitHeight, orbitWidth);
    }
}