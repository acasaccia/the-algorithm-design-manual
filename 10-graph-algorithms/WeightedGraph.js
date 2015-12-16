"use strict";

/**
 * Undirected weighted graph
 */

module.exports = function WeightedGraph(vertexes_count_or_filename) {

    var edges_count = 0;
    var vertexes_count = 0;
    var edges = [];

    var lines;

    function _addEdge(vertex_1, vertex_2, weight) {
        var edge = new Edge(vertex_1, vertex_2, weight);
        edges[vertex_1].push(edge);
        edges[vertex_2].push(edge);
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
            var vertexes = lines[i].split(" ");
            _addEdge(parseInt(vertexes[0]), parseInt(vertexes[1]), parseFloat(vertexes[2]));
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

    this.getEdges = function getEdges() {
        var all_edges = [];
        var out_edges, out_edges_length;
        for (var i=0; i<vertexes_count; i++) {
            out_edges = this.getAdjacents(i);
            out_edges_length = out_edges.length;
            for (var j=0; j<out_edges_length; j++) {
                if (!all_edges.indexOf(out_edges[j])) {
                    all_edges.push(out_edges[j]);
                }
            }
        }
        return all_edges;
    };

};

function Edge(vertex_1, vertex_2, weight) {

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

    this.weight = function() {
        return this.weight;
    };

}