"use strict";

var DiGraph = require("../DiGraph.js");
var graph = new DiGraph(process.cwd() + "/09-graph-traversal/input/tinyDG.txt");

describe("tinyDG.txt", function() {

    it("should have 13 vertexes", function() {
        expect(graph.getVertexesCount()).toBe(13);
    });

    it("should have 22 edges", function() {
        expect(graph.getEdgesCount()).toBe(22);
    });

});

describe("tinyDG.txt vertex 0", function() {

    var adjacents = graph.getAdjacents(0);

    it("should be linked to 1", function() {
        expect(adjacents).toContain(1);
    });

    it("should not be linked to 6", function() {
        expect(adjacents).not.toContain(6);
    });

    it("should not be linked to 4", function() {
        expect(adjacents).not.toContain(4);
    });

});

describe("tinyDG.txt vertex 7", function() {

    var adjacents = graph.getAdjacents(7);

    it("should have 2 adjacents", function() {
        expect(adjacents.length).toBe(2);
    });

});

describe("tinyDG.txt vertex 11", function() {

    var adjacents = graph.getAdjacents(11);

    it("should have 2 adjacents", function() {
        expect(adjacents.length).toBe(2);
    });

});

describe("tinyDG.txt inverse graph", function() {

    graph = graph.reverse();
    var adjacents = graph.getAdjacents(0);

    it("vertex 0 should have 2 adjacents", function() {
        expect(adjacents.length).toBe(2);
    });

    it("vertex 0 should not be linked to 1", function() {
        expect(adjacents).not.toContain(1);
    });

    it("vertex 0 should be linked to 6", function() {
        expect(adjacents).toContain(6);
    });

    it("vertex 0 should not be linked to 4", function() {
        expect(adjacents).not.toContain(4);
    });

});