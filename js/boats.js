/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 * @param {Point} point
 * @param {number} radian
 * @inherits {Z.Boat}
 */
Z.Ferry = function(point, radian) {
    Z.Boat.call(this, 'img/ferry.png', point, radian);
    this.agility = 20;
    this.floatSpeed = 0.15;
    this.maxSpeed = 2.2;
    this.velocity = 40;
    this.acceleration = 0.015;
    this.deceleration = 0.01;
    this.outline = true;
};

Z.util.extend(
    Z.Ferry.prototype,
    /** @lends {Z.Ferry.prototype}*/
    Z.Boat.prototype
);

Z.Ferry.prototype.targetReached = function() {
    this.point = this.point.stepRadian(this.radian, this.speed);
    this.speed = Math.max(this.speed - this.deceleration, this.floatSpeed);
};


/**
 * @param {Z.Path} path
 * @inherits {Z.Boat}
 * @constructor
 */
Z.Barge = function(path) {
    var images, image;
    images = ['img/barge.png', 'img/barge_02.png', 'img/barge_03.png']; 
    image = images[Math.floor(Math.random() * images.length)];
    Z.Boat.call(this, image, path.points[0], 0);
    this.path = path;
    this.agility = 20;
    this.maxSpeed = 0.5;
    this.speed = this.maxSpeed;
    this.velocity = 40;
    this.sweetspotTolerance = 40;
};

Z.util.extend(
    Z.Barge.prototype,
    /** @lends {Z.Ferry.prototype}*/
    Z.Boat.prototype
);


/**
 * @param {Z.Path} path
 * @inherits {Z.Boat}
 * @constructor
 */
Z.CanalBoat = function(path) {
    var images, image;
    images = ['img/canalboat.png', 'img/canalboat_02.png']; 
    image = images[Math.floor(Math.random() * images.length)];
    Z.Boat.call(this, image, path.points[0], 0);
    this.path = path;
    this.agility = 30;
    this.maxSpeed = 1;
    this.speed = this.maxSpeed;
    this.velocity = 50;
    this.sweetspotTolerance = 40;
};

Z.util.extend(
    Z.CanalBoat.prototype,
    /** @lends {Z.Ferry.prototype}*/
    Z.Boat.prototype
);


/**
 * @param {Z.Path} path
 * @inherits {Z.Boat}
 * @constructor
 */
Z.SpeedBoat = function(path) {
    var images, image;
    images = ['img/speedboat.png', 'img/speedboat_02.png', 'img/speedboat_03.png', 'img/speedboat_04.png']; 
    image = images[Math.floor(Math.random() * images.length)];
    Z.Boat.call(this, image, path.points[0], 0);
    this.path = path;
    this.agility = 40;
    this.maxSpeed = 3;
    this.speed = this.maxSpeed;
    this.velocity = 60;
    this.sweetspotTolerance = 70;
};

Z.util.extend(
    Z.SpeedBoat.prototype,
    /** @lends {Z.Ferry.prototype}*/
    Z.Boat.prototype
);
