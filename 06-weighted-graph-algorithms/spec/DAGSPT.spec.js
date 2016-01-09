"use strict";

var DirectedWeightedGraph = require("../DirectedWeightedGraph.js");
var DAGSPT = require("../DAGSPT.js");

var graph = new DirectedWeightedGraph(process.cwd() + "/06-weighted-graph-algorithms/input/dag.txt");

describe("Shortest path DAGSPT", function() {

    var vertexes = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 6]
    ];

    var distances = [ 5.0, 14.0, 17.0, 25.0 ];

    var paths = [
        [0, 1],
        [0, 4, 5, 2],
        [0, 4, 5, 2, 3],
        [0, 4, 5, 2, 6]
    ];

    for (var i=0; i<vertexes.length; i++) {
        (function(i){
            var shortest_path = new DAGSPT(graph, vertexes[i][0]);
            it("distance from " + vertexes[i][0] + " to " + vertexes[i][1] + " should be " + distances[i], function(){
                expect(shortest_path.to(vertexes[i][1]).distance).toBeCloseTo(distances[i], 2);
            });
            it("path from " + vertexes[i][0] + " to " + vertexes[i][1] + " should be [ " + paths[i].join(', ') + ' ]', function(){
                expect(shortest_path.to(vertexes[i][1]).path).toEqual(paths[i]);
            });
        })(i);
    }

});