"use strict";

var Graph = require('../Graph.js');
var assert = require('assert');

var graph = new Graph(13);

var edges = [
    [0, 5],
    [4, 3],
    [0, 1],
    [9, 12],
    [6, 4],
    [5, 4],
    [0, 2],
    [11, 12],
    [9, 10],
    [0, 6],
    [7, 8],
    [9, 11],
    [5, 3]
];

assert(graph.getVertexesCount() === 13);
assert(graph.getEdgesCount() === 0);

edges.forEach(function(edge){
    graph.addEdge(edge[0], edge[1]);
});

assert(graph.getEdgesCount() === 13);

var adjacents;

adjacents = graph.getAdjacents(0);
assert(adjacents.indexOf(1)>=0);
assert(adjacents.indexOf(6)>=0);
assert(adjacents.indexOf(4)<0);

adjacents = graph.getAdjacents(7);
assert(adjacents.length === 1);

adjacents = graph.getAdjacents(11);
assert(adjacents.length === 2);

assert(graph.getVertexesCount() === 13);