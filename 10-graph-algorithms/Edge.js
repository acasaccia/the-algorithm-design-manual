"use strict";

/**
 * An edge on an undirected weighted graph
 */
module.exports = function Edge(vertex_1, vertex_2, weight) {

    this.vertex_1 = vertex_1;
    this.vertex_2 = vertex_2;
    this.weight = weight;

    this.either = function() {
        return this.vertex_1;
    };

    this.other = function(vertex) {
        if (vertex === this.vertex_1) {
            return this.vertex_2;
        } else if (vertex === this.vertex_2) {
            return this.vertex_1
        } else {
            throw Exception("Unknown vertex " + vertex);
        }
    };

};