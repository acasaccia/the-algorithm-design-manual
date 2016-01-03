"use strict";

var DiGraph = require("../DiGraph.js");
var CycleDetect = require("../CycleDetect.js");

describe("diacyclic.txt", function(){

    var acyclic = new DiGraph(process.cwd() + "/05-graph-traversal/input/diacyclic.txt");

    it("should not contain cycles", function(){
        expect(CycleDetect(acyclic)).toBeUndefined();
    });

});

describe("dicyclic.txt", function(){

    var cyclic = new DiGraph(process.cwd() + "/05-graph-traversal/input/dicyclic.txt");

    it("should contain a cycle", function(){
        expect(CycleDetect(cyclic)).not.toBeUndefined();
    });

});

describe("tinyDAG.txt", function(){

    var tinyDAG = new DiGraph(process.cwd() + "/05-graph-traversal/input/tinyDAG.txt");

    it("should not contain cycles", function(){
        expect(CycleDetect(tinyDAG)).toBeUndefined();
    });

});

describe("tinyDG.txt", function(){

    var tinyDG = new DiGraph(process.cwd() + "/05-graph-traversal/input/tinyDG.txt");

    it("should contain a cycle", function(){
        expect(CycleDetect(tinyDG)).not.toBeUndefined();
    });

});