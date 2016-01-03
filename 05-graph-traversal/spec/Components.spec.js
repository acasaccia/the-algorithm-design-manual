"use strict";

var Graph = require("../Graph.js");
var Components = require("../Components.js");
var graph = new Graph(process.cwd() + "/05-graph-traversal/input/undirected.txt");

var components = new Components(graph);

describe("Pair of vertexes", function() {

    var same_component_pairs = [
        [0, 1],
        [0, 4],
        [6, 3],
        [7, 8],
        [10, 12]
    ];

    same_component_pairs.forEach(function(pair){
        it(pair[0] + " and " + pair[1] + " should be in the same component", function(){
            expect(components.same(pair[0], pair[1])).toBe(true);
        });
    });

    var different_component_pairs = [
        [6, 7],
        [4, 9],
        [7, 12],
        [0, 10],
        [8, 11]
    ];

    different_component_pairs.forEach(function(pair){
        it(pair[0] + " and " + pair[1] + " should not be in the same component", function(){
            expect(components.same(pair[0], pair[1])).not.toBe(true);
        });
    });

});

describe("Component [0]", function(){

    var component = components.get(0);
    var contained = [0, 2, 6];

    contained.forEach(function(vertex){
        it("should contain " + vertex, function() {
            expect(component).toContain(vertex);
        })
    });

    var not_contained = [8, 12, 90];

    not_contained.forEach(function(vertex){
        it("should not contain " + vertex, function() {
            expect(component).not.toContain(vertex);
        })
    });

});

describe("Component [7]", function(){

    var component = components.get(7);
    var contained = [7];

    contained.forEach(function(vertex){
        it("should contain " + vertex, function() {
            expect(component).toContain(vertex);
        })
    });

    var not_contained = [12];

    not_contained.forEach(function(vertex){
        it("should not contain " + vertex, function() {
            expect(component).not.toContain(vertex);
        })
    });

});
