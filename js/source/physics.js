var RealityClass = function() {
    this.G = (6.67408 / (10 ** -11));
    this.scale = 1 / 1000000000;
    // this.scale = 1;
    this.AU = 149600000000;
    this.timeConst = 1000;
    this.width = 1200;
    this.height = 800;
    this.gravityForce = function(m1, m2, r) {
        var force = this.G * (m1 * m2) / r;
        return force;
    }
    this.timeC = 100;
}
var Reality = new RealityClass();

var scaleValues = [(1 / 1000000000), (1 / 1000000000), (1 / 1000000000)];