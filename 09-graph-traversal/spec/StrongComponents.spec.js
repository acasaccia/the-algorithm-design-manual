"use strict";

var DiGraph = require("../DiGraph.js");
var StrongComponents = require("../StrongComponents.js");

describe("Strong components of tinyDG.txt", function() {

    var graph = new DiGraph(process.cwd() + "/09-graph-traversal/input/tinyDG.txt");
    var strong_components = new StrongComponents(graph);

    it("should be [ [ 0, 2, 3, 4, 5 ], [ 1 ], [ 6, 8 ], [ 7 ], [ 9, 10, 11, 12 ] ]", function(){
        expect(strong_components.get()).toEqual([ [ 0, 2, 3, 4, 5 ], [ 1 ], [ 6, 8 ], [ 7 ], [ 9, 10, 11, 12 ] ]);
    });

});

describe("Strong components of mediumDG.txt", function() {

    var graph = new DiGraph(process.cwd() + "/09-graph-traversal/input/mediumDG.txt");
    var strong_components = new StrongComponents(graph);

    it("should be 10", function(){
        expect(strong_components.get().length).toBe(10);
    });

});