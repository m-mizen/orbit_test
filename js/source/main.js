require('./classes.js');

/* On ready function */
const readyFunction = function() {
    console.log('test')
};

/* Fire ready function */
(function() {})(
    readyFunction()
);