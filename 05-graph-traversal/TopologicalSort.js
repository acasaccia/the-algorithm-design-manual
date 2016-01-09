"use strict";

var DirectedEdge = require("../06-weighted-graph-algorithms/DirectedEdge.js");

module.exports = function TopologicalSort(graph) {

    var vertexes_count = graph.getVertexesCount();

    var on_the_stack = {};
    var visited = {};
    var post_order = [];

    function visit(n) {
        on_the_stack[n] = true;
        visited[n] = true;
        var adjacents = graph.getAdjacents(n);
        for (var i=0; i<adjacents.length; i++) {
            if (!on_the_stack[adjacents[i]] && !visited[adjacents[i]]) {
                if (adjacents[i] instanceof DirectedEdge) {
                    visit(adjacents[i].to());
                } else {
                    visit(adjacents[i]);
                }
            }
        }
        post_order.push(n);
        on_the_stack[n] = false;
    }

    for (var i=0; i<vertexes_count; i++) {
        if (!visited[i]) {
            visit(i);
        }
    }

    return post_order.reverse();

};
