"use strict";

module.exports = function TopologicalSort(graph) {

    var vertexes_count = graph.getVertexesCount();
    var to_analyze = [];

    for(var i=0; i<vertexes_count; i++) {
        to_analyze.push(i);
    }

    // @todo: fixme? use proper data structure
    var visited = {};
    var source;
    var post_order = [];

    function visit(n) {
        visited[n] = true;
        var adjacents = graph.getAdjacents(n);
        for (var i=0; i<adjacents.length; i++) {
            if (!visited[adjacents[i]]) {
                visit(adjacents[i]);
            }
        }
        if (post_order.indexOf(n) === -1) {
            post_order.push(n);
        }
    }

    while (to_analyze.length) {
        visited = {};
        source = to_analyze.shift();
        visit(source);
        Object.keys(visited).forEach(function(i){
            i = parseInt(i);
            var index = to_analyze.indexOf(i);
            if (index > -1) {
                to_analyze.splice(index, 1);
            }
        });
    }

    return post_order.reverse();

};
