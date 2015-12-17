var WeightedGraph = require("../WeightedGraph.js");
var Kruskal = require("../Kruskal.js");
var Prim = require("../Prim.js");

var graph = new WeightedGraph("input/input.txt");

describe("MST", function() {

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

    expectations(graph, Kruskal(graph));
    expectations(graph, Prim(graph));

});
