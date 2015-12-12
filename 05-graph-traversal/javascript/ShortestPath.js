"use strict";

module.exports = function ShortestPath(graph) {

    return {

        from: function ShortestPath_from(v1) {

            return {

                to: function ShortestPath_from_to(v2) {

                    var visited = [];
                    var to_root = [];
                    var vertex_count = graph.getVertexesCount();

                    for (var i=1; i<=vertex_count; i++) {
                        visited.push(false);
                    }

                    var visit = function(n) {
                        visited[n] = true;
                        var adjacents = graph.getAdjacents(n);
                        for (var i=0; i<adjacents.length; i++) {
                            if (!visited[adjacents[i]]) {
                                to_root[adjacents[i]] = n;
                                visit(adjacents[i]);
                            }
                        }
                    };

                    visit(v1);

                    if (!visited[v2]) {
                        return;
                    }

                    var path = [];

                    var get_path = function(n) {
                        if (to_root[n] !== undefined) {
                            path.unshift(to_root[n]);
                            get_path(to_root[n]);
                        }
                    };

                    path.unshift(v2);

                    get_path(v2);
                    return path;

                }

            };

        }

    };

};