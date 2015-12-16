"use strict";

var Graph = require("../Graph.js");
var ShortestPath = require("../ShortestPath.js");
var assert = require("assert");

var graph = new Graph("input/undirected.txt");
var shortest_path = new ShortestPath(graph);

assert(shortest_path.from(1).to(2).join(",") === "1,0,2");
assert(shortest_path.from(3).to(2).join(",") === "3,5,0,2");
assert(shortest_path.from(1).to(12) === undefined);
assert(shortest_path.from(4).to(2).join(",") === "4,5,0,2" || shortest_path.from(4).to(2).join(",") === "4,6,0,2");
assert(shortest_path.from(1).to(7) === undefined);
assert(shortest_path.from(8).to(9) === undefined);