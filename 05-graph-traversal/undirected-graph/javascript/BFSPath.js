"use strict";


module.exports = function BFSPath(graph) {

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


};