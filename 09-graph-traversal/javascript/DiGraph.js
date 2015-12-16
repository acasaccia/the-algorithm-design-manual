"use strict";

module.exports = function DiGraph(vertexes_count_or_filename) {

    var edges_count = 0;
    var vertexes_count = 0;
    var edges = [];

    var lines;

    function _addEdge(vertex_1, vertex_2) {
        edges[vertex_1].push(vertex_2);
        edges_count++;
    }

    if (typeof vertexes_count_or_filename === "number") {
        vertexes_count = vertexes_count_or_filename;
    } else {
        lines = require("fs").readFileSync(vertexes_count_or_filename, "utf-8")
            .split("\n")
            .filter(Boolean);
        vertexes_count = parseInt(lines.shift());
        lines.shift(); // just discard second line
    }

    for (var i=0; i<vertexes_count; i++) {
        edges.push([]);
    }

    if (lines) {
        for (var i=0; i<lines.length; i++) {
            var vertexes = lines[i].split(" ").map(function(v) {
                return parseInt(v);
            });
            _addEdge(vertexes[0], vertexes[1]);
        }
    }

    this.addEdge = _addEdge;

    this.getAdjacents = function getAdjacents(vertex) {
        return edges[vertex];
    };

    this.getVertexesCount = function getVertexesCount() {
        return vertexes_count;
    };

    this.getEdgesCount = function getEdgesCount() {
        return edges_count;
    };

    this.reverse = function reverse() {
        var new_graph = new DiGraph(vertexes_count);
        for (var i=0; i<vertexes_count; i++) {
            edges_count = edges[i].length;
            for (var j=0; j<edges_count; j++) {
                new_graph.addEdge(edges[i][j], i);
            }
        }
        return new_graph;
    };

};