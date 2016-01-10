"use strict";

var DirectedWeightedGraph = require("../DirectedWeightedGraph.js");
var Dijkstra = require("../Dijkstra.js");

var graph = new DirectedWeightedGraph(process.cwd() + "/06-weighted-graph-algorithms/input/dwg.txt");

describe("Shortest path Dijkstra", function() {

    var vertexes = [
        [0, 2],
        [0, 7],
        [0, 3],
        [0, 6]
    ];

    var distances = [ 0.26, 0.60, 0.99, 1.51 ];

    var paths = [
        [0, 2],
        [0, 2, 7],
        [0, 2, 7, 3],
        [0, 2, 7, 3, 6]
    ];

    for (var i=0; i<vertexes.length; i++) {
        (function(i){
            var shortest_path = new Dijkstra(graph, vertexes[i][0]);
            it("distance from " + vertexes[i][0] + " to " + vertexes[i][1] + " should be " + distances[i], function(){
                expect(shortest_path.to(vertexes[i][1]).distance).toBeCloseTo(distances[i], 2);
            });
            it("path from " + vertexes[i][0] + " to " + vertexes[i][1] + " should be [ " + paths[i].join(', ') + ' ]', function(){
                expect(shortest_path.to(vertexes[i][1]).path).toEqual(paths[i]);
            });
        })(i);
    }

});