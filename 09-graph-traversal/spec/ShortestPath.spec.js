"use strict";

var Graph = require("../Graph.js");
var ShortestPath = require("../ShortestPath.js");

var graph = new Graph(process.cwd() + "/09-graph-traversal/input/undirected.txt");
var shortest_path = new ShortestPath(graph);

describe("Shortest path on undirected.txt", function(){

    it("from 1 to 2 should be [1,0,2]", function() {
        expect(shortest_path.from(1).to(2)).toEqual([1, 0, 2]);
    });

    it("from 3 to 2 should be [3,5,0,2]", function() {
        expect(shortest_path.from(3).to(2)).toEqual([3, 5, 0, 2]);
    });

    it("from 1 to 12 should be undefined", function() {
        expect(shortest_path.from(1).to(12)).toBeUndefined();
    });

    it("from 4 to 2 should be [4,5,0,2] or [4,6,0,2]", function() {
        var path = shortest_path.from(4).to(2).join(',');
        expect( path === "4,5,0,2" || path === "4,6,0,2").toBe(true);
    });

    it("from 1 to 7 should be", function() {
        expect(shortest_path.from(1).to(7)).toBeUndefined();
    });

    it("from 8 to 9 should be", function() {
        expect(shortest_path.from(8).to(9)).toBeUndefined();
    });

});