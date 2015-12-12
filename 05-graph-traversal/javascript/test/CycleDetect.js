"use strict";

var DiGraph = require("../DiGraph.js");
var CycleDetect = require("../CycleDetect.js");
var assert = require("assert");

var acyclic = new DiGraph("input/diacyclic.txt");
assert(!CycleDetect(acyclic));

var cyclic = new DiGraph("input/dicyclic.txt");
var cycle = CycleDetect(cyclic);
assert(cycle !== undefined);
console.log(cycle);

var tinyDAG = new DiGraph("input/tinyDAG.txt");
assert(!CycleDetect(tinyDAG));

var tinyDG = new DiGraph("input/tinyDG.txt");
var cycle = CycleDetect(tinyDG);
assert(cycle !== undefined);
console.log(cycle);