(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrbitalBody = exports.Star = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversions = require('../functions/conversions.js');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpacialBody = function () {
    function SpacialBody(options, parent) {
        _classCallCheck(this, SpacialBody);

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

    _createClass(SpacialBody, [{
        key: 'draw',
        value: function draw(target) {
            target = target || this.parent;

            target.fillRect(thisX, thisY, this.radius, this.radius);

            target.beginPath();
            target.arc(thisX, thisY, radius, 0, 2 * Math.PI, false);
            target.fillStyle = this.color;
            target.fill();
        }
    }]);

    return SpacialBody;
}();

var Star = function (_SpacialBody) {
    _inherits(Star, _SpacialBody);

    function Star(options, parent) {
        _classCallCheck(this, Star);

        return _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).call(this, options, parent));
    }

    return Star;
}(SpacialBody);

var OrbitalBody = function (_SpacialBody2) {
    _inherits(OrbitalBody, _SpacialBody2);

    function OrbitalBody(options, parent) {
        _classCallCheck(this, OrbitalBody);

        /**
         * Orbital information from options
         * a = semimajor axis
         * e = eccentricity
         * t0 = start time
         * M0 = Mean anomaly at time t0
         * i = inclination
         * 
         */
        var _this2 = _possibleConstructorReturn(this, (OrbitalBody.__proto__ || Object.getPrototypeOf(OrbitalBody)).call(this, options, parent));

        _this2.orbit = options.orbit; // Stores all of the orbit information

        _this2.orbit.b = _this2.orbit.a * Math.sqrt(1 - Math.pow(_this2.orbit.e, 2)); // Semiminor axis

        _this2.orbit.rp = _this2.orbit.a * (1 - _this2.orbit.e); // Closest point
        _this2.orbit.ra = _this2.orbit.a * (1 + _this2.orbit.e); // Furthest point

        _this2.mew = _this2.G * _this2.Mass;

        // orbitPos caches the position of the object. Prevents re-calculating.
        _this2.orbitPos = {};

        _this2.orbitPos.theta = _this2.eccentricAnomaly(0);
        _this2.orbitPos.r = _this2.distanceFromCenter(_this2.orbitPos.theta);

        var cartesianCoOrds = (0, _conversions.polarToCartesian)(_this2.orbitPos.r, _this2.orbitPos.theta);

        _this2.orbitPos.x = cartesianCoOrds.X;
        _this2.orbitPos.y = cartesianCoOrds.Y;

        return _this2;
    }

    _createClass(OrbitalBody, [{
        key: 'meanAnomaly',


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
        value: function meanAnomaly(t) {
            var n = this.mew / Math.pow(this.orbit.a, 3);
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

    }, {
        key: 'eccentricAnomaly',
        value: function eccentricAnomaly(t) {
            var M = this.meanAnomaly(t);
            var e = this.orbit.e;

            var E = M + (e - 1 / 8 * Math.pow(e, 3)) * Math.sin(M) + 1 / 2 * Math.pow(e, 2) * Math.sin(2 * M) + 3 / 8 * Math.pow(e, 3) * Math.sin(3 * M);
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

    }, {
        key: 'distanceFromCenter',
        value: function distanceFromCenter(theta) {
            var a = this.orbit.a;
            var e = this.orbit.e;
            var p = a * (1 - Math.pow(e, 2));

            return p / (1 + e * Math.cos(theta));
        }

        /**
         * Refresh the position of the orbit
         */

    }, {
        key: 'orbitPosition',
        value: function orbitPosition(time) {
            // polar
            this.orbitPos.theta = this.eccentricAnomaly(time);
            this.orbitPos.r = this.distanceFromCenter(this.orbitPos.theta);

            // cartesian
            var cartesianCoOrds = (0, _conversions.polarToCartesian)(this.orbitPos.r, this.orbitPos.theta);
            this.orbitPos.x = cartesianCoOrds.X;
            this.orbitPos.y = cartesianCoOrds.Y;

            return this.orbitPos;
        }
    }, {
        key: 'draw',
        value: function draw(target) {
            /* Draw the orbital body */
            var thisX = 100 * (this.orbitPos.r * Math.cos(this.orbitPos.theta)) + 300;
            var thisY = 100 * (this.orbitPos.r * Math.sin(this.orbitPos.theta)) + 300;

            target.fillStyle = this.color;
            target.fillRect(thisX, thisY, this.radius, this.radius);

            /* Draw the orbital body path */
            target.strokeStyle = this.color;
            target.beginPath();
            target.ellipse(300, 300, this.orbit.a * 100, this.orbit.b * 100, this.orbit.offsetAngle, 0, 2 * Math.PI);
            target.stroke();
            target.lineWidth = 1;
            target.strokeStyle = this.color;
            target.stroke();
        }
    }]);

    return OrbitalBody;
}(SpacialBody);

;

exports.Star = Star;
exports.OrbitalBody = OrbitalBody;

},{"../functions/conversions.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cartesianToPolar = function cartesianToPolar(x, y) {
    var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var angle = Math.atan(y / x);
    return {
        r: radius,
        theta: angle
    };
};

var polarToCartesian = function polarToCartesian(r, theta) {
    var xAxis = r * Math.cos(theta);
    var yAxis = r * Math.sin(theta);
    return {
        x: xAxis,
        y: yAxis
    };
};

var radToDeg = function radToDeg(radians) {
    radians / (Math.PI / 180);
};
var degToRad = function degToRad(degrees) {
    degrees * (Math.PI / 180);
};

exports.cartesianToPolar = cartesianToPolar;
exports.polarToCartesian = polarToCartesian;
exports.radToDeg = radToDeg;
exports.degToRad = degToRad;

},{}],3:[function(require,module,exports){
'use strict';

var _bodies = require('./classes/bodies.js');

var _conversions = require('./functions/conversions.js');

window.addEventListener("load", function load(event) {

    var canvasEle = document.getElementById('mainCanvas');
    var canvasCtx = canvasEle.getContext('2d');
    var canvasInfo = {
        height: canvasEle.height,
        width: canvasEle.width
    };

    // Define planet 1
    var planets = [];
    planets.push(new _bodies.OrbitalBody({ orbit: { a: 0.2, e: 0, period: 60, offsetAngle: Math.PI / 2 }, radius: 10 }));
    planets.push(new _bodies.OrbitalBody({ orbit: { a: 1, e: 0.2, period: 120, offsetAngle: 2 / 3 * Math.PI }, radius: 10 }));
    planets.push(new _bodies.OrbitalBody({ orbit: { a: 2.1, e: 0.5, period: 240, offsetAngle: 0 }, radius: 10 }));
    planets.push(new _bodies.OrbitalBody({ orbit: { a: 4, e: 0, period: 720, offsetAngle: Math.PI / 3 }, radius: 10 }));

    /* Controls the FPS and holds the tick and the time */
    var animationControlVars = {
        time: 0,
        tick: 0,
        prevDate: Date.now(),
        fpsThrottle: 1000 / 60,
        timeFactor: 1 /* How large the time value increments should be every time it is incremented */
        , timeUpdate: 1 /* How often to update the time value */
        , timeChanged: false /* If the time has been updated since last tick */
    };

    var animationControl = function animationControl() {
        if (Date.now() - animationControlVars.prevDate >= animationControlVars.fpsThrottle) {
            animationControlVars.prevDate = Date.now();
            animationControlVars.tick++;

            if (animationControlVars.tick % animationControlVars.timeUpdate === 0) {
                animationControlVars.time = animationControlVars.time + animationControlVars.timeFactor;
                animationControlVars.timeChanged = true;
            } else {
                animationControlVars.timeChanged = false;
            }

            tick(animationControlVars.timeChanged);
        }
        /* Loop the function */
        window.requestAnimationFrame(animationControl);
    };

    /* What to do every tick */
    var tick = function tick(updateTime) {
        var time = animationControlVars.time;
        updateTime = updateTime || true;

        if (updateTime) {
            // Run time dependant functions
            for (var i = 0; i < planets.length; i++) {
                planets[i].orbitPosition(time);
            }
            canvasCtx.fillStyle = "#000000";
            canvasCtx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
        }

        // Draw the objects
        for (var _i = 0; _i < planets.length; _i++) {
            planets[_i].draw(canvasCtx);
        }
    };

    animationControl();
});

},{"./classes/bodies.js":1,"./functions/conversions.js":2}]},{},[3]);
