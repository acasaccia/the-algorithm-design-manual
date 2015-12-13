"use strict";

var lines = require('fs').readFileSync(process.argv[2], 'utf-8')
    .split('\n')
    .filter(Boolean);

while (lines.length) {

    // Initialize graph
    var vertexes_count = parseInt(lines.shift());

    if (!vertexes_count) {
        break;
    }

    var edges_count = parseInt(lines.shift());

    var graph = new Graph(vertexes_count);

    var edge;
    for (var i=0; i<edges_count; i++) {
        edge = lines.shift().split(' ');
        graph.addEdge(edge[0], edge[1]);
    }

    var to_visit = [0];
    var color = [true];
    var bicolorable = true;

    var visit = function(vertex) {
        var adjacents = graph.getAdjacents(vertex);
        for (var i=0; i<adjacents.length; i++) {
            if (color[adjacents[i]] === undefined) {
                color[adjacents[i]] = !color[vertex];
                to_visit.push(adjacents[i]);
            } else {
                if (color[adjacents[i]] !== !color[vertex]) {
                    bicolorable = false;
                }
            }
        }
    };

    while (to_visit.length) {
        var current = to_visit.shift();
        visit(current);
        if (!bicolorable) {
            break;
        }
    }

    if (!bicolorable) {
        console.log('NOT BICOLORABLE.');
    } else {
        console.log('BICOLORABLE.');
    }

}

function Graph(vertexes_count) {

    var edges = [];

    for (var i=0; i<vertexes_count; i++) {
        edges.push([]);
    }

    this.addEdge = function(vertex_1, vertex_2) {
        edges[vertex_1].push(vertex_2);
        edges[vertex_2].push(vertex_1);
    };

    this.getAdjacents = function(vertex) {
        return edges[vertex];
    };

}