"use strict";

/**
 * A weighted edge with notion of orientation (from a vertex to another)
 */
module.exports = function DirectedEdge(source, destination, weight) {

    this.source = source;
    this.destination = destination;
    this.weight = weight;

    this.from = function() {
        return this.source;
    };

    this.to = function() {
        return this.destination;
    };

};