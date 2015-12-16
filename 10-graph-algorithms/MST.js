"use strict";

var WeightedGraph = require("./WeightedGraph.js");
var Kruskal = require("./MST/Kruskal.js");

var graph = new WeightedGraph("input/input.txt");
var mst = Kruskal(graph);