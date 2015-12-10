"use strict";

// find a path from v1 to v2
// depth-first strategy
module.exports = function Paths(graph, strategy) {

    strategy = strategy || 'DEPTH_FIRST';

    if (strategy === 'DEPTH_FIRST') {

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

    } else {

        return {
            from: function Paths_from(v1) {
                return {
                    to: function Paths_from_to(v2) {

                        var to_root = [];
                        var to_visit = [v1];
                        var current, adjacents;

                        to_root[v1] = null;

                        while(to_visit.indexOf(v2) === -1 && to_visit.length) {
                            current = to_visit.shift();
                            adjacents = graph.getAdjacents(current);
                            for (var i=0; i<adjacents.length; i++) {
                                if (to_root[adjacents[i]] === undefined) {
                                    to_visit.push(adjacents[i]);
                                    to_root[adjacents[i]] = current;
                                }
                            }
                        }

                        if (!to_visit.length) {
                            return;
                        }

                        var path = [];

                        var get_path = function(n) {
                            if (to_root[n] !== null) {
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

    }

};