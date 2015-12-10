"use strict";

//var readline = require('readline');
//var fs = require('fs');

module.exports = function Graph(vertexes_count_or_filename) {

    if (typeof vertexes_count_or_filename === 'number') {
        this.vertexes_count = vertexes_count_or_filename;
        this.edges = [];
        for (var i=0; i<vertexes_count_or_filename; i++) {
            this.edges.push([])
        }
    } else {
        // @todo: parse input file
    }

    this.addEdge = function addEdge(vertex_1, vertex_2) {
        this.edges[vertex_1].push(vertex_2);
        this.edges[vertex_2].push(vertex_1);
    };

    this.getAdjacents = function getAdjacents(vertex) {
        return this.edges[vertex];
    };

    this.getVertexesCount = function getVertexesCount() {
        return this.vertexes_count;
    };

    this.getEdgesCount = function getEdgesCount() {
        var edges_number = 0;
        for (var i=0; i<this.vertexes_count; i++) {
            edges_number += this.edges[i].length;
        }
        return edges_number / 2;
    };

};