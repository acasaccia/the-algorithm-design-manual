"use strict";

var Graph = require('../Graph.js');
var Paths = require('../Paths.js');
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

edges.forEach(function(edge){
    graph.addEdge(edge[0], edge[1]);
});

var paths = new Paths(graph);

assert(paths.from(1).to(2).join(',') === '1,0,2');
assert(paths.from(3).to(2) !== undefined);
assert(paths.from(1).to(12) === undefined);
assert(paths.from(4).to(2) !== undefined);
assert(paths.from(1).to(7) === undefined);
assert(paths.from(8).to(9) === undefined);

var paths = new Paths(graph, 'BREADTH_FIRST');

assert(paths.from(1).to(2).join(',') === '1,0,2');
assert(paths.from(3).to(2).join(',') === '3,5,0,2');
assert(paths.from(1).to(12) === undefined);
assert(paths.from(4).to(2).join(',') === '4,5,0,2' || paths.from(4).to(2).join(',') === '4,6,0,2');
assert(paths.from(1).to(7) === undefined);
assert(paths.from(8).to(9) === undefined);