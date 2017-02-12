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

        this.parent = parent;

        this.radius = options.radius || 1;
    }

    _createClass(SpacialBody, [{
        key: 'draw',
        value: function draw() {}
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

        /* Orbital information from options */
        var _this2 = _possibleConstructorReturn(this, (OrbitalBody.__proto__ || Object.getPrototypeOf(OrbitalBody)).call(this, options, parent));

        _this2.orbit = {
            a: options.orbit.a,
            e: options.orbit.e,
            period: options.orbit.period,
            offsetAngle: options.orbit.offsetAngle,
            b: options.orbit.a * Math.sqrt(1 - Math.pow(options.orbit.e, 2)),
            W: options.orbit.a * 2
        };

        _this2.orbitPos = {
            theta: _this2.orbit.offsetAngle,
            r: _this2.orbit.a
        };

        _this2.color = options.color || '#ffffff';

        return _this2;
    }

    _createClass(OrbitalBody, [{
        key: 'orbitPosition',
        value: function orbitPosition(t) {
            var currentAngle = t % this.orbit.period / this.orbit.period * (2 * Math.PI);
            var distance = this.orbit.a * this.orbit.b / Math.sqrt(Math.pow(this.orbit.b * Math.cos(currentAngle), 2) + Math.pow(this.orbit.a * Math.sin(currentAngle), 2));

            console.log(currentAngle, Math.pow(this.orbit.b * Math.cos(currentAngle), 2) + Math.pow(this.orbit.a * Math.sin(currentAngle), 2));

            this.orbitPos = {
                theta: currentAngle + this.orbit.offsetAngle,
                r: distance
            };
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
