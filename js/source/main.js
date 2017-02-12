import { Star, OrbitalBody } from './classes/bodies.js';
import { cartesianToPolar, polarToCartesian, radToDeg, degToRad } from './functions/conversions.js';

window.addEventListener("load", function load(event) {

    const canvasEle = document.getElementById('mainCanvas');
    const canvasCtx = canvasEle.getContext('2d');
    const canvasInfo = {
        height: canvasEle.height,
        width: canvasEle.width
    }

    // Define planet 1
    const planets = [];
    planets.push(new OrbitalBody({ orbit: { a: 0.2, e: 0, period: 60, offsetAngle: Math.PI / 2 }, radius: 10 }));
    planets.push(new OrbitalBody({ orbit: { a: 1, e: 0.2, period: 120, offsetAngle: (2 / 3) * Math.PI }, radius: 10 }));
    planets.push(new OrbitalBody({ orbit: { a: 2.1, e: 0.5, period: 240, offsetAngle: 0 }, radius: 10 }));
    planets.push(new OrbitalBody({ orbit: { a: 4, e: 0, period: 720, offsetAngle: Math.PI / 3 }, radius: 10 }));


    /* Controls the FPS and holds the tick and the time */
    const animationControlVars = {
        time: 0,
        tick: 0,
        prevDate: (Date.now()),
        fpsThrottle: 1000 / 60,
        timeFactor: 1 /* How large the time value increments should be every time it is incremented */ ,
        timeUpdate: 1 /* How often to update the time value */ ,
        timeChanged: false /* If the time has been updated since last tick */
    };



    const animationControl = function() {
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
    const tick = function(updateTime) {
        const time = animationControlVars.time;
        updateTime = updateTime || true;

        if (updateTime) {
            // Run time dependant functions
            for (let i = 0; i < planets.length; i++) {
                planets[i].orbitPosition(time);
            }
            canvasCtx.fillStyle = "#000000";
            canvasCtx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
        }

        // Draw the objects
        for (let i = 0; i < planets.length; i++) {
            planets[i].draw(canvasCtx);
        }
    };

    animationControl();
});