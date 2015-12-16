"use strict";

var DiGraph = require("../DiGraph.js");
var StrongComponents = require("../StrongComponents.js");
var assert = require("assert");

var graph = new DiGraph("input/tinyDG.txt");
var strong_components = new StrongComponents(graph);

console.log(strong_components.get());

var graph = new DiGraph("input/mediumDG.txt");
var strong_components = new StrongComponents(graph);

console.log(strong_components.get().length);