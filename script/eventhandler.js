/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.EventHandler = function() {
    this.recording = false;
    this.addListeners();
};

Z.EventHandler.prototype.addListeners = function() {
    var el = document.body;

    this.boundEvents = {
        start: this.eventStart.bind(this),
        move : this.eventMove.bind(this),
        stop : this.eventStop.bind(this)
    };

    if ('ontouchmove' in document) {
        document.ontouchstart = function(ev) {
            ev.preventDefault(); // Don't scroll the page
        };
        el.ontouchstart = this.boundEvents.start;
        el.ontouchmove = this.boundEvents.move;
        el.ontouchend = this.boundEvents.stop;
    } else {
        el.onmousedown = this.boundEvents.start;
        el.onmousemove = this.boundEvents.move;
        el.onmouseup = this.boundEvents.stop;
    }
};

Z.EventHandler.prototype.eventStart = function(ev) {
    var point = new Z.Point(ev.pageX, ev.pageY);
    this.recording = true;
    this.draggedPoints = [point, point];
};

Z.EventHandler.prototype.eventMove = function(ev) {
    var point = new Z.Point(ev.pageX, ev.pageY);
    this.lastPoint = point;
    if (this.recording) {
        if (!this.lastPointClose(point)) {
            this.draggedPoints.push(point);
            this.updatePath();
        }
    }
};

Z.EventHandler.prototype.eventStop = function() {
    this.draggedPoints.push(this.lastPoint);
    this.recording = false;
    this.updatePath();
};

Z.EventHandler.prototype.lastPointClose = function(point) {
    var dx, dy, prevPoint, minDistance = Z.MIN_DRAG_DISTANCE;
    prevPoint = this.draggedPoints[this.draggedPoints.length - 1];
    dx = Math.abs(point.x - prevPoint.x);
    dy = Math.abs(point.y - prevPoint.y);
    return dx + dy < minDistance;
};

Z.EventHandler.prototype.updatePath = function() {
    var PathFactory, path;
    PathFactory = Z.Path.bind.apply(Z.Path, this.draggedPoints);
    path = new PathFactory();
    Z.canvas.path = path;
};