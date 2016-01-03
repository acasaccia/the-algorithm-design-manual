"use strict";

var Graph = require("../Graph.js");

var expectations = function(description, graph) {

    describe(description + " vertex 0", function () {

        var adjacents = graph.getAdjacents(0);

        it("should be linked to 1", function () {
            expect(adjacents.indexOf(1)).not.toBe(-1);
        });

        it("should be linked to 6", function () {
            expect(adjacents.indexOf(6)).not.toBe(-1);
        });

        it("should not be linked to 4", function () {
            expect(adjacents.indexOf(4)).toBe(-1);
        });

    });

    describe(description +" vertex 7", function () {

        var adjacents = graph.getAdjacents(7);

        it("should have 1 adjacents", function () {
            expect(adjacents.length).toBe(1);
        });

    });

    describe(description + " vertex 11", function () {

        var adjacents = graph.getAdjacents(11);

        it("should have 2 adjacents", function () {
            expect(adjacents.length).toBe(2);
        });

    });

};

var graph = new Graph(13);

describe("Graph created programmatically", function () {

    it("should have 13 vertexes", function () {
        expect(graph.getVertexesCount()).toBe(13);
    });

    it("should have no edges", function () {
        expect(graph.getEdgesCount()).toBe(0);
    });

    it("should have 13 edges", function () {
        var edges = [
            [0, 5],
            [4, 3],
            [0, 1],
            [9, 12],
            [6, 4],
            [5, 4],
            [0, 2],
            [11, 12],
            [9, 10],
            [0, 6],
            [7, 8],
            [9, 11],
            [5, 3]
        ];
        edges.forEach(function (edge) {
            graph.addEdge(edge[0], edge[1]);
        });
        expect(graph.getEdgesCount()).toBe(13);
    });

});

expectations("Graph created programmatically:", graph);

expectations("Graph created from file:", new Graph(process.cwd() + "/05-graph-traversal/input/undirected.txt"));