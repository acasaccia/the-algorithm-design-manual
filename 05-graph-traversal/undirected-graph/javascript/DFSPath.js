"use strict";


module.exports = function DFSPath(graph) {

    return {

        from: function Paths_from(v1) {

            return {

                to: function Paths_from_to(v2) {

                    var visited = [];
                    var to_root = [];
                    var vertex_count = graph.getVertexesCount();

                    for (var i=1; i<=vertex_count; i++) {
                        visited.push(false);
                    }

                    var visit = function(n, prev) {
                        visited[n] = true;
                        to_root[n] = prev;
                        var adjacents = graph.getAdjacents(n);
                        for (var i=0; i<adjacents.length; i++) {
                            if (!visited[adjacents[i]]) {
                                visit(adjacents[i], n);
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