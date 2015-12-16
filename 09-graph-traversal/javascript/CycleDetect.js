"use strict";

module.exports = function Acyclic(graph) {

    var vertexes_count = graph.getVertexesCount();

    var on_the_stack = {};
    var visited = {};
    var to_root = {};
    var cycle_end_vertex;

    function visit(n) {
        if (cycle_end_vertex !== undefined) {
            return;
        }
        on_the_stack[n] = true;
        visited[n] = true;
        var adjacents = graph.getAdjacents(n);
        for (var i=0; i<adjacents.length; i++) {
            if(!on_the_stack[adjacents[i]]) {
                to_root[adjacents[i]] = n;
                visit(adjacents[i]);
            } else {
                to_root[adjacents[i]] = n;
                cycle_end_vertex = adjacents[i];
                break;
            }
        }
        on_the_stack[n] = false;
    }

    for (var i=0; i<vertexes_count; i++) {
        if (!visited[i]) {
            to_root = {};
            visit(i);
            if (cycle_end_vertex !== undefined) {
                break;
            }
        }
    }

    if (cycle_end_vertex === undefined) {
        return;
    } else {
        var cycle = [cycle_end_vertex];
        var next = to_root[cycle_end_vertex];
        while (next !== cycle_end_vertex) {
            cycle.unshift(next);
            next = to_root[next];
        }
        return cycle;
    }

    return acyclic;

};
