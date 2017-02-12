const cartesianToPolar = function(x, y) {
    const radius = Math.sqrt(x ** 2 + y ** 2);
    const angle = Math.atan(y / x);
    return {
        r: radius,
        theta: angle
    }
}

const polarToCartesian = function(r, theta) {
    const xAxis = r * Math.cos(theta);
    const yAxis = r * Math.sin(theta);
    return {
        x: xAxis,
        y: yAxis
    }
}



const radToDeg = (radians) => { radians / (Math.PI / 180) };
const degToRad = (degrees) => { degrees * (Math.PI / 180) };


export { cartesianToPolar, polarToCartesian, radToDeg, degToRad };