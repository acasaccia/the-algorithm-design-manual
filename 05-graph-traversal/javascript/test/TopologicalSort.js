"use strict";

var DiGraph = require('../DiGraph.js');
var Acyclic = require('../Acyclic.js');
var TopologicalSort = require('../TopologicalSort.js');
var assert = require('assert');

var acyclic = new DiGraph('input/diacyclic.txt');

assert(Acyclic(acyclic));

console.log(TopologicalSort(acyclic));
