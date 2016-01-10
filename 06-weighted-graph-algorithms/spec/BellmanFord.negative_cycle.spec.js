"use strict";

var DirectedWeightedGraph = require("../DirectedWeightedGraph.js");
var BellmanFord = require("../BellmanFord.js");

var graph = new DirectedWeightedGraph(process.cwd() + "/06-weighted-graph-algorithms/input/nwg.txt");

describe("Shortest path BellmanFord", function() {
    var shortest_path = new BellmanFord(graph, 0);

    it("should detect a negative cycle reachable from 0", function(){
        expect(shortest_path.hasNegativeCycle()).toBe(true);
    });

    it("negative cycle reachable from 0", function(){
        expect(shortest_path.negativeCycle()).toEqual([4, 5]);
    });
});