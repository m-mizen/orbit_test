import { cartesianToPolar, polarToCartesian, radToDeg, degToRad } from '../functions/conversions.js';

class SpacialBody {
    constructor(options, parent) {
        this.parent = parent;

        this.radius = options.radius || 1;
    }

    draw() {

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

        /* Orbital information from options */
        this.orbit = {
            a: options.orbit.a,
            e: options.orbit.e,
            period: options.orbit.period,
            offsetAngle: options.orbit.offsetAngle,
            b: (options.orbit.a * Math.sqrt(1 - (options.orbit.e ** 2))),
            W: (options.orbit.a * 2)
        }

        this.orbitPos = {
            theta: this.orbit.offsetAngle,
            r: this.orbit.a
        }

        this.color = options.color || '#ffffff';

    };

    orbitPosition(t) {
        const currentAngle = ((t % this.orbit.period) / this.orbit.period) * (2 * Math.PI);
        const distance = (this.orbit.a * this.orbit.b) / Math.sqrt(((this.orbit.b * Math.cos(currentAngle)) ** 2) + ((this.orbit.a * Math.sin(currentAngle)) ** 2));

        console.log(currentAngle, ((this.orbit.b * Math.cos(currentAngle)) ** 2) + ((this.orbit.a * Math.sin(currentAngle)) ** 2));

        this.orbitPos = {
            theta: currentAngle + this.orbit.offsetAngle,
            r: distance
        };
    }

    draw(target) {
        /* Draw the orbital body */
        const thisX = 100 * (this.orbitPos.r * Math.cos(this.orbitPos.theta)) + 300;
        const thisY = 100 * (this.orbitPos.r * Math.sin(this.orbitPos.theta)) + 300;

        target.fillStyle = this.color;
        target.fillRect(thisX, thisY, this.radius, this.radius);

        /* Draw the orbital body path */
        target.strokeStyle = this.color;
        target.beginPath();
        target.ellipse(300, 300, (this.orbit.a * 100), (this.orbit.b * 100), this.orbit.offsetAngle, 0, 2 * Math.PI);
        target.stroke();
    }
};


export { Star, OrbitalBody }