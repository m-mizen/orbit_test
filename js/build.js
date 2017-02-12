(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var orbitalBody = function orbitalBody(options) {
    _classCallCheck(this, orbitalBody);
};

var star = function (_orbitalBody) {
    _inherits(star, _orbitalBody);

    function star(options) {
        _classCallCheck(this, star);

        return _possibleConstructorReturn(this, (star.__proto__ || Object.getPrototypeOf(star)).call(this, options));
    }

    return star;
}(orbitalBody);

},{}],2:[function(require,module,exports){
'use strict';

require('./classes.js');

/* On ready function */
var readyFunction = function readyFunction() {
    console.log('test');
};

/* Fire ready function */
(function () {})(readyFunction());

},{"./classes.js":1}]},{},[2]);
