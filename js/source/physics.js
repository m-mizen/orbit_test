class spacialBody {

    constructor(parent) {

        // The body this object is in orbit around
        this.parent;

        // The cartisian co-ordinates of the body
        this.position;

        // The circle that appears around the object at all zoom levels;
        this.uiCircle;

        // The actual planet image
        this.bodyCircle;

        // Attributes for the planet
        this.attributes;

        // A container that objects which orbit this body reside within.
        this.influence;

    }

    buildBody(time) {

    }

    set updateBody(time) {

    }

    get bodyInfo(attribute) {
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

}

class star extends spacialBody {
    constructor() {
        super();
    }
}

class orbitalBody extends spacialBody {
    constructor() {
        super();
    }
    gravity() {}
}

class moon extends orbitalBody {
    constructor() {
        super();
    }
}

class asteroid extends orbitalBody {
    constructor() {
        super();
    }
}

class station extends orbitalBody {
    constructor() {
        super();
    }
}

class ship extends orbitalBody {
    constructor() {
        super();
    }
}