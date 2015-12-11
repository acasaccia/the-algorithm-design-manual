"use strict";

var DiGraph = require('../DiGraph.js');
var Acyclic = require('../Acyclic.js');
var assert = require('assert');

var acyclic = new DiGraph('input/diacyclic.txt');
var cyclic = new DiGraph('input/dicyclic.txt');

assert(Acyclic(acyclic));
assert(!Acyclic(cyclic));