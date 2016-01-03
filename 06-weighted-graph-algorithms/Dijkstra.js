"use strict";

var IndexedPriorityQueue = require("../03-data-structures/IndexedPriorityQueue.js");

module.exports = function(graph, source) {

    var edge_to_source = {};
    var distance_to_source = {};
    var relaxed = {};

    var pq = new IndexedPriorityQueue();

    pq.insert(0, 0);
    distance_to_source[source] = 0;

    function relax(vertex) {
        var adjacents = graph.getAdjacents(vertex);
        var adjacent_to, candidate_distance;
        adjacents.forEach(function(adjacent){
            adjacent_to = adjacent.to();
            candidate_distance = distance_to_source[vertex] + adjacent.weight;
            if (distance_to_source[adjacent_to] === undefined || distance_to_source[adjacent_to] > candidate_distance) {
                distance_to_source[adjacent_to] = candidate_distance;
                edge_to_source[adjacent_to] = vertex;
                if (pq.contains(adjacent_to)) {
                    pq.update(adjacent_to, candidate_distance);
                } else {
                    pq.insert(adjacent_to, candidate_distance);
                }
            }
        });
        relaxed[vertex] = true;
    }

    var next;

    while (!pq.empty()) {
        next = pq.get();
        relax(next.id);
    }

    this.to = function to(node) {
        var path = [node];
        var tmp_node = node;
        while (edge_to_source[tmp_node] !== undefined) {
            path.unshift(edge_to_source[tmp_node]);
            tmp_node = edge_to_source[tmp_node];
        }
        return {
            distance: distance_to_source[node],
            path: path
        };
    }

};