var WeightedGraph = require("../WeightedGraph.js");
var Kruskal = require("../Kruskal.js");

var graph = new WeightedGraph("input/input.txt");
var mst = Kruskal(graph);

describe("MST", function() {

    it("should have V-1 edges", function() {
        expect(mst.getEdges().length).toBe(graph.getVertexesCount()-1);
    });

    it("should have edges weight sum 1.81", function() {
        var sum = 0;
        var edges = mst.getEdges();
        edges.forEach(function(edge){
            sum += edge.weight;
        });
        expect(parseInt(sum*100)).toBe(parseInt(1.81*100));
    });

});
