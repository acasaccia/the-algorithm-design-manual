var WeightedGraph = require("../WeightedGraph.js");
var Kruskal = require("../Kruskal.js");
var PrimLazy = require("../PrimLazy.js");
var PrimEager = require("../PrimEager.js");

var graph = new WeightedGraph("input/input.txt");

var expectations = function(graph, mst) {

    var edges = mst.getEdges();

    it("should have V-1 edges", function() {
        expect(edges.length).toBe(graph.getVertexesCount()-1);
    });

    it("should have edges weight sum 1.81", function() {
        var sum = 0;
        edges.forEach(function(edge){
            sum += edge.weight;
        });
        expect(parseInt(sum*100)).toBe(parseInt(1.81*100));
    });

    // look input/mst.jpg
    var expected_edges = [
        [0, 7],
        [1, 7],
        [5, 7],
        [5, 4],
        [0, 2],
        [2, 3],
        [2, 6]
    ].forEach(function(expected_edge){
            it("should have edge " + expected_edge[0] + "-" + expected_edge[1], function() {
                expect(edges.filter(function(edge){
                    var v1 = edge.either();
                    var v2 = edge.other(v1);
                    return (
                        (expected_edge[0] === v1 && expected_edge[1] === v2) ||
                        (expected_edge[0] === v2 && expected_edge[1] === v1)
                    )
                }).length).toBe(1);
            });
        });
};

describe("MST computed with Kruskal", function() {
    expectations(graph, Kruskal(graph));
});

describe("MST computed with PrimLazy", function() {
    expectations(graph, PrimLazy(graph));
});

describe("MST computed with PrimEager", function() {
    expectations(graph, PrimEager(graph));
});
