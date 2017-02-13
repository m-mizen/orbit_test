import { cartesianToPolar, polarToCartesian, radToDeg, degToRad } from '../functions/conversions.js';

class SpacialBody {
    constructor(options, parent) {
        // Parent object
        this.parent = parent;

        // Radius of the body
        this.radius = options.radius || 1;

        // Gravitational constant
        this.G = 6.67408 * Math.pow(10, -11);

        // Mass of the body
        this.Mass = options.Mass;

        // Color of the body
        this.color = options.color || '#ffffff';

        this.pos = options.pos || false;
    }

    draw(target) {
        target = target || this.parent;


        target.fillRect(thisX, thisY, this.radius, this.radius);

        target.beginPath();
        target.arc(thisX, thisY, radius, 0, 2 * Math.PI, false);
        target.fillStyle = this.color;
        target.fill();
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

        /**
         * Orbital information from options
         * a = semimajor axis
         * e = eccentricity
         * t0 = start time
         * M0 = Mean anomaly at time t0
         * i = inclination
         * 
         */
        this.orbit = options.orbit; // Stores all of the orbit information

        this.orbit.b = this.orbit.a * Math.sqrt(1 - (this.orbit.e ** 2)); // Semiminor axis

        this.orbit.rp = this.orbit.a * (1 - this.orbit.e); // Closest point
        this.orbit.ra = this.orbit.a * (1 + this.orbit.e); // Furthest point

        this.mew = this.G * this.Mass;

        // orbitPos caches the position of the object. Prevents re-calculating.
        this.orbitPos = {};

        this.orbitPos.theta = this.eccentricAnomaly(0);
        this.orbitPos.r = this.distanceFromCenter(this.orbitPos.theta);

        const cartesianCoOrds = polarToCartesian(this.orbitPos.r, this.orbitPos.theta);

        this.orbitPos.x = cartesianCoOrds.X;
        this.orbitPos.y = cartesianCoOrds.Y;

    };

    /*
    ----    ----    ----    ----
    Mean annomaly, M
    ----    ----    ----    ----
    The mean annomaly of the orbit is the angle of the "effective circular orbit" for a given location: https://en.wikipedia.org/wiki/Mean_anomaly

    mew = G * Mass
    n = mew / a**3
    M = M0 + n( t - t0 )

    G = gravitational constant
    Mass = Mass of the object
    a = semimajor axis
    t = current time
    t0 = start time
    n = average rate of sweep for the orbit

    */
    meanAnomaly(t) {
        const n = this.mew / (this.orbit.a ** 3);
        return n * (t - this.orbit.t0);
    }

    /*
    ----    ----    ----    ----
    Eccentric annomaly, E
    ----    ----    ----    ----

    The Eccentric annomaly of a body is the angle from the center of the orbit to the current position.

    M = E - e sin(E)
    There is no solution to this function. To approximate it I am using this equation:
    E(t) = M(t) + ( e - (e**3 /8) ) * sin( M(t) ) + ( e**2 / 2 ) * sin( 2 * M(t) ) + ( (3/8) * (e**3) ) * sin(3 * M(t));

    M(t) is calculated by the meanAnomaly(t) function
    
    */
    eccentricAnomaly(t) {
        const M = this.meanAnomaly(t);
        const e = this.orbit.e;

        const E = M +
            ((e - (1 / 8) * e ** 3) * Math.sin(M)) +
            (((1 / 2) * e ** 2) * Math.sin(2 * M)) +
            (((3 / 8) * e ** 3) * Math.sin(3 * M))
        return E;
    }

    /*
    ----    ----    ----    ----
    Distance from centre, r
    ----    ----    ----    ----

    r = p / (1 + e cost(theta))

    theta = Eccentric annomaly
    p  = average radius of the orbit
    
    As theta is dependant on time, this function can be used to calculate the distance from the orbited body as a function of time
    */
    distanceFromCenter(theta) {
        const a = this.orbit.a;
        const e = this.orbit.e;
        const p = a * (1 - e ** 2);

        return (p / (1 + (e * Math.cos(theta))));
    }

    /**
     * Refresh the position of the orbit
     */
    orbitPosition(time) {
        // polar
        this.orbitPos.theta = this.eccentricAnomaly(time);
        this.orbitPos.r = this.distanceFromCenter(this.orbitPos.theta);

        // cartesian
        const cartesianCoOrds = polarToCartesian(this.orbitPos.r, this.orbitPos.theta);
        this.orbitPos.x = cartesianCoOrds.X;
        this.orbitPos.y = cartesianCoOrds.Y;

        return this.orbitPos;
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
        target.lineWidth = 1;
        target.strokeStyle = this.color;
        target.stroke();
    }
};


export { Star, OrbitalBody }