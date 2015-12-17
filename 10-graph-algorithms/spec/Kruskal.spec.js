var WeightedGraph = require("../WeightedGraph.js");
var Kruskal = require("../Kruskal.js");

var graph = new WeightedGraph("input/input.txt");
var mst = Kruskal(graph);

describe("MST", function() {

    it("should have V-1 edges", function() {
        expect(mst.getEdges().length).toBe(graph.getVertexesCount()-1);
    });

});
