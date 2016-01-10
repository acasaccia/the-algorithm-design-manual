"use strict";

/**
 * Bellman-Ford Shortest Path Tree algorithm
 * Requirements: weighted directed graph - non negative cycles (negative edges allowed)
 * Computes on initialization the Shortest Path Tree from given source, can be queried with the to() method to get
 * shortest path to a vertex in linear time
 *
 * Relax each vertex vertexes_count times.
 */
module.exports = function(graph, source) {

    var edge_to_source = {};
    var distance_to_source = {};

    // Uncomment the following to use a queue and relax edges only when needed
    //var queue = [];

    var vertexes_count = graph.getVertexesCount();
    for (var i=0; i<vertexes_count; i++) {
        if (typeof queue !== "undefined") {
            queue.push(i);
        }
        distance_to_source[i] = Number.POSITIVE_INFINITY;
    }
    distance_to_source[source] = 0;

    //var c=0;

    function relax(edge) {
        //c++;
        var from = edge.from();
        var to = edge.to();
        var candidate_distance = distance_to_source[from] + edge.weight;
        if (distance_to_source[to] > candidate_distance) {
            distance_to_source[to] = candidate_distance;
            edge_to_source[to] = from;
            if (typeof queue !== "undefined") {
                queue.push(to);
            }
        }
    }

    var adjacents;

    if (typeof queue !== "undefined") {
        for (var i = 0; i < vertexes_count; i++) {
            while (queue.length) {
                adjacents = graph.getAdjacents(queue.shift());
                adjacents.forEach(function (adjacent) {
                    relax(adjacent);
                });
            }
        }
    } else {
        for (var i=0; i<vertexes_count; i++) {
            for (var j=0; j<vertexes_count; j++) {
                adjacents = graph.getAdjacents(j);
                adjacents.forEach(function (adjacent) {
                    relax(adjacent);
                });
            }
        }
    }

    //console.log("%d edges relaxed", c);

    this.to = function to(node) {
        var path = [node];
        var tmp_node = node;
        while (edge_to_source[tmp_node] !== undefined) {
            path.unshift(edge_to_source[tmp_node]);
            tmp_node = edge_to_source[tmp_node];
            if (path.length > vertexes_count) {
                var cycle_end = path.indexOf(path[0], 1);
                return {
                    negative_cycle: true,
                    path: path.slice(0, cycle_end)
                };
            }
        }
        return {
            distance: distance_to_source[node],
            path: path
        };
    };

    this.hasNegativeCycle = function hasNegativeCycle() {
        for (var i=0; i<vertexes_count; i++) {
            if (this.to(i).negative_cycle) {
                return true;
            }
        }
        return false;
    };

    this.negativeCycle = function negativeCycle() {
        var path_info;
        for (var i=0; i<vertexes_count; i++) {
            path_info = this.to(i);
            if (path_info.negative_cycle) {
                return path_info.path;
            }
        }
        return false;
    };

};