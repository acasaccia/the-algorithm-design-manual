"use strict";

module.exports = function ShortestPath(graph) {

    return {

        from: function ShortestPath_from(v1) {

            return {

                to: function ShortestPath_from_to(v2) {

                    var to_root = {};
                    var to_visit = [v1];
                    var found = false;

                    var visit = function(n) {
                        if (n === v2) {
                            found = true;
                        }
                        var adjacents = graph.getAdjacents(n);
                        for (var i=0; i<adjacents.length; i++) {
                            if (!to_root[adjacents[i]]) {
                                to_root[adjacents[i]] = n;
                                to_visit.push(adjacents[i]);
                            }
                        }
                    };

                    while (to_visit.length && !found) {
                        visit(to_visit.shift());
                    }

                    if (!found) {
                        return;
                    }

                    var path = [v2];
                    var next = v2;

                    while (next !== v1) {
                        next = to_root[next];
                        path.unshift(next);
                    }

                    return path;

                }

            };

        }

    };

};