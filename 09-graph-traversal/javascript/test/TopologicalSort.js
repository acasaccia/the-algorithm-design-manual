"use strict";

var DiGraph = require("../DiGraph.js");
var CycleDetect = require("../CycleDetect.js");
var TopologicalSort = require("../TopologicalSort.js");

var assert = require("assert");

var acyclic = new DiGraph("input/diacyclic.txt");
var tinyDAG = new DiGraph("input/tinyDAG.txt");

assert(!CycleDetect(acyclic));
console.log(TopologicalSort(acyclic));

assert(!CycleDetect(tinyDAG));
console.log(TopologicalSort(tinyDAG));