"use strict";

var DirectedWeightedGraph = require("../DirectedWeightedGraph.js");
var BellmanFord = require("../BellmanFord.js");

var graph = new DirectedWeightedGraph(process.cwd() + "/06-weighted-graph-algorithms/input/anwg.txt");

describe("Shortest path BellmanFord", function() {

    var vertexes = [
        [0, 2],
        [0, 7],
        [0, 4],
        [0, 5]
    ];

    var distances = [0.26, 0.60, 0.38, 0.73];

    var paths = [
        [0, 2],
        [0, 2, 7],
        [0, 4],
        [0, 4, 5]
    ];

    for (var i=0; i<vertexes.length; i++) {
        (function(i){
            var shortest_path = new BellmanFord(graph, vertexes[i][0]);
            it("shouldn't have negative cycles reachable from " + vertexes[i][0], function(){
                expect(shortest_path.hasNegativeCycle()).toBe(false);
            });
            it("distance from " + vertexes[i][0] + " to " + vertexes[i][1] + " should be " + distances[i], function(){
                expect(shortest_path.to(vertexes[i][1]).distance).toBeCloseTo(distances[i], 2);
            });
            it("path from " + vertexes[i][0] + " to " + vertexes[i][1] + " should be [ " + paths[i].join(', ') + ' ]', function(){
                expect(shortest_path.to(vertexes[i][1]).path).toEqual(paths[i]);
            });
        })(i);
    }

});