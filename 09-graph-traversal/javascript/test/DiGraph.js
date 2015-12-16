"use strict";

var DiGraph = require("../DiGraph.js");
var assert = require("assert");

var graph = new DiGraph("input/tinyDG.txt");

assert(graph.getVertexesCount() === 13);
assert(graph.getEdgesCount() === 22);

var adjacents = graph.getAdjacents(0);
assert(adjacents.indexOf(1)>=0);
assert(adjacents.indexOf(6)<0);
assert(adjacents.indexOf(4)<0);

adjacents = graph.getAdjacents(7);
assert(adjacents.length === 2);

adjacents = graph.getAdjacents(11);
assert(adjacents.length === 2);

graph = graph.reverse();

var adjacents = graph.getAdjacents(0);
assert(adjacents.length === 2);

assert(adjacents.indexOf(1)<0);
assert(adjacents.indexOf(6)>=0);
assert(adjacents.indexOf(2)>=0);