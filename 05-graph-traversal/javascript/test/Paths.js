"use strict";

var Graph = require('../Graph.js');
var DFSPath = require('../DFSPath.js');
var BFSPath = require('../BFSPath.js');
var assert = require('assert');

var graph = new Graph("input/undirected.txt");

var path = new DFSPath(graph);

assert(path.from(1).to(2).join(',') === '1,0,2');
assert(path.from(3).to(2) !== undefined);
assert(path.from(1).to(12) === undefined);
assert(path.from(4).to(2) !== undefined);
assert(path.from(1).to(7) === undefined);
assert(path.from(8).to(9) === undefined);

path = new BFSPath(graph);

assert(path.from(1).to(2).join(',') === '1,0,2');
assert(path.from(3).to(2).join(',') === '3,5,0,2');
assert(path.from(1).to(12) === undefined);
assert(path.from(4).to(2).join(',') === '4,5,0,2' || path.from(4).to(2).join(',') === '4,6,0,2');
assert(path.from(1).to(7) === undefined);
assert(path.from(8).to(9) === undefined);