"use strict";

var DirectedWeightedGraph = require("../DirectedWeightedGraph.js");
var Dijkstra = require("../Dijkstra.js");

var graph = new DirectedWeightedGraph(process.cwd() + "/10-graph-algorithms/input/dwg.txt");

describe("Shortest path Dijkstra", function() {

    var vertexes = [
        [0, 2],
        [2, 7],
        [7, 3],
        [3, 6]
    ];

    var distances = [ 0.26, 0.34, 0.39, 0.52 ];

    var paths = [
        [0, 2],
        [0, 2, 7],
        [0, 2, 7, 3],
        [0, 2, 7, 3, 6]
    ];

    for (var i=0; i<vertexes_pair.length; i++) {

        var shortest_path = Dijkstra(graph, vertexes[i][0]);

        it("distance from " + vertexes[i][0] + " to " + vertexes[i][1] + " should be " + distances[i], function(){
            expect(shortest_path.to(vertexes[i][1]).distance).toBeCloseTo(distances[i], 2);
        });

        it("path from " + vertexes[i][0] + " to " + vertexes[i][1] + " should be " + distances[i], function(){
            expect(shortest_path.to(vertexes[i][1]).path).toEqual(paths[i]);
        });
    }

});