"use strict";

module.exports = function Acyclic(graph) {

    var vertexes_count = graph.getVertexesCount();
    var acyclic = true;
    var to_analyze = [];

    for(var i=0; i<vertexes_count; i++) {
        to_analyze.push(i);
    }

    // @todo: fixme? use proper data structure
    var visited = {};
    var source;

    function visit(n) {
        visited[n] = true;
        var adjacents = graph.getAdjacents(n);
        for (var i=0; i<adjacents.length; i++) {
            if (!visited[adjacents[i]]) {
                visit(adjacents[i]);
            } else {
                acyclic = false;
            }
        }
    }

    while (acyclic && to_analyze.length) {
        visited = [];
        source = to_analyze.shift();
        visit(source);
        for (var i=0; i<visited.length; i++) {
            if(visited[i]) {
                var index = to_analyze.indexOf(i);
                if (index > -1) {
                    to_analyze.splice(i, 1);
                }
            }
        }
    }

    return acyclic;

};
