"use strict";

var DiGraph = require("../DiGraph.js");
var CycleDetect = require("../CycleDetect.js");
var TopologicalSort = require("../TopologicalSort.js");

var assert = require("assert");

describe("diacyclic.txt", function(){

    var graph = new DiGraph(process.cwd() + "/05-graph-traversal/input/diacyclic.txt");

    it("should not have cycles", function() {
        expect(CycleDetect(graph)).toBeUndefined();
    });

    it("should have topological sort [ 5, 6, 4, 2, 0, 1, 3 ]", function() {
        expect(TopologicalSort(graph)).toEqual([ 5, 6, 4, 2, 0, 1, 3 ]);
    });

});

describe("tinyDAG.txt", function(){

    var graph = new DiGraph(process.cwd() + "/05-graph-traversal/input/tinyDAG.txt");

    it("should not have cycles", function() {
        expect(CycleDetect(graph)).toBeUndefined();
    });

    it("should have topological sort [ 8, 7, 2, 3, 0, 5, 1, 6, 9, 11, 10, 12, 4 ]", function() {
        expect(TopologicalSort(graph)).toEqual([ 8, 7, 2, 3, 0, 5, 1, 6, 9, 11, 10, 12, 4 ]);
    });

});