class SpacialBody {

    constructor(options, parent) {

        // The body this object is in orbit around
        this.parent = parent;

        // The cartisian co-ordinates of the body
        this.position = {
            x: 0,
            y: 0
        };

        // The circle that appears around the object at all zoom levels;
        this.uiCircle;
        this.uiCircleSize = 12;

        // The actual body image (real size)
        this.bodyCircle;

        // Attributes for the planet
        this.attributes = {
            scale: Reality.scale,
            mass: options.mass,
            colour: options.colour
        };

        // A container that objects which orbit this body reside within.
        this.influence;

        this.influenceRange;

        this.velocity = new Vector(0, 0);

    }

    buildBody(time) {
        // Build the body. Run when building the system

        this.influence = new createjs.Container();
        this.influence.x = this.position.x;
        this.influence.y = this.position.y;
        this.influence.mass = this.attributes.mass;

        this.parent.addChild(this.influence);


        this.uiCircle = new createjs.Shape();
        this.uiCircle.graphics.beginStroke("white").drawCircle(
            ((-this.position.x) * Reality.scale),
            ((-this.position.y) * Reality.scale),
            this.uiCircleSize
        );

        this.parent.addChild(this.uiCircle);

        this.bodyCircle = new createjs.Shape();

        this.bodyCircle.x = (this.position.x * Reality.scale);
        this.bodyCircle.y = (this.position.y * Reality.scale);
        this.bodyCircle.graphics.beginFill(this.attributes.colour).drawCircle(
            ((-this.position.x) * Reality.scale),
            ((-this.position.y) * Reality.scale),
            Reality.scale * this.attributes.size
        );
        this.parent.addChild(this.bodyCircle);

    }

    updateBody(time) {
        // Update the body. Every time something interacts with the body that is dependant upon time this function is called.
    }

    bodyInfo(attribute) {
        if (typeof attribute === string) {
            if (typeof this[attribute] !== "undefined") {
                return this[attribute];
            } else {
                return attribute + " doesn't exist";
            }
        } else {
            return this.attributes;
        }
    }

    get speed() {
        return this.velocity.length;
    }

    get distaceToParent() {
        return ((this.position.x + this.position.y) / 2);
    }

}

class Star extends SpacialBody {
    constructor(options, parent) {
        super(options, parent);
    }
}

class OrbitalBody extends SpacialBody {
    constructor(options, parent) {
        super(options, parent);

        this.orbitinfo = {
            a: parseInt(options.orbit.a) * Reality.AU,
            e: options.orbit.e,
            w: options.orbit.w,
            t: 0,
            t0: parseFloat(options.orbit.start),
            force: 0,
            period: 0
        };
        this.orbitinfo.force = Reality.G * this.parent.mass / this.orbitinfo.a
        this.orbitinfo.period = (2 * Math.PI) * Math.sqrt(((this.orbitinfo.a * 1000) ** 3) / this.orbitinfo.force);
        this.orbitinfo.t0 = this.orbitinfo.t0 * this.orbitinfo.period;

        this.orbitPath;
        this.attributes.name = options.name;

    }
    buildBody(time) {
        time = time || 0;
        // Build the body. Run when building the system
        this.updateOrbit(time);

        this.influence = new createjs.Container();
        this.influence.x = this.position.x * Reality.scale;
        this.influence.y = this.position.y * Reality.scale;

        this.uiCircle = new createjs.Shape();
        this.uiCircle.graphics.beginStroke("white").drawCircle(
            ((this.position.x) * Reality.scale),
            ((this.position.y) * Reality.scale),
            this.uiCircleSize
        );
        this.parent.addChild(this.uiCircle);

        this.bodyCircle = new createjs.Shape();
        this.bodyCircle.x = (this.position.x * Reality.scale);
        this.bodyCircle.y = (this.position.y * Reality.scale);
        this.bodyCircle.graphics.beginFill(this.attributes.colour).drawCircle(
            ((this.position.x) * Reality.scale),
            ((this.position.y) * Reality.scale),
            Reality.scale * this.attributes.size
        );
        this.parent.addChild(this.bodyCircle);

        this.orbitPath = new createjs.Shape();
        this.orbitPath.graphics.beginStroke("white").drawCircle(0, 0, this.orbitinfo.a * Reality.scale);
        this.parent.addChild(this.orbitPath);
    }

    updateBody(time) {
        time = time || 0;
        // Update the body. Every time something interacts with the body that is dependant upon time this function is called.
        this.updateOrbit(time);

        this.influence.x = this.uiCircle.x = this.bodyCircle.x = this.position.x * Reality.scale - this.orbitinfo.a * Reality.scale;
        // this.influence.x = this.uiCircle.x = this.bodyCircle.x = this.position.x * Reality.scale;
        this.influence.y = this.uiCircle.y = this.bodyCircle.y = this.position.y * Reality.scale;

    }

    updateOrbit(time) {
        time = time || 0;
        // Calculate the current orbit location and velocity
        this.orbitinfo.t = time;
        this.position.x = this.orbitinfo.a * Math.cos((2 * Math.PI) * (this.orbitinfo.t + this.orbitinfo.t0) / this.orbitinfo.period);
        this.position.y = this.orbitinfo.a * Math.sin((2 * Math.PI) * (this.orbitinfo.t + this.orbitinfo.t0) / this.orbitinfo.period);

    }
}

class Moon extends OrbitalBody {
    constructor(options, parent) {
        super(options, parent);
    }
}

class Asteroid extends OrbitalBody {
    constructor(options, parent) {
        super(options, parent);
    }
}

class Station extends OrbitalBody {
    constructor(options, parent) {
        super(options, parent);
    }
}

class Ship extends OrbitalBody {
    constructor(options, parent) {
        super(options, parent);
    }
}

class PlayerShip extends Ship {
    constructor(options, parent) {
        super(options, parent);
    }
}