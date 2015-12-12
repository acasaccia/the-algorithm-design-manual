"use strict";

var Graph = require("../Graph.js");
var Components = require("../Components.js");
var assert = require("assert");

var graph = new Graph("input/undirected.txt");
var components = new Components(graph);

console.log(components.get());

assert(components.same(0, 1));
assert(components.same(0, 4));
assert(components.same(6, 3));
assert(components.same(7, 8));
assert(components.same(10, 12));

assert(!components.same(6, 7));
assert(!components.same(4, 9));
assert(!components.same(7, 12));
assert(!components.same(0, 10));
assert(!components.same(8, 11));

assert(components.get(0).indexOf(0) > -1);
assert(components.get(0).indexOf(2) > -1);
assert(components.get(0).indexOf(6) > -1);
assert(components.get(0).indexOf(8) === -1);
assert(components.get(0).indexOf(12) === -1);

assert(components.get(7).indexOf(7) > -1);
assert(components.get(7).indexOf(12) === -1);
