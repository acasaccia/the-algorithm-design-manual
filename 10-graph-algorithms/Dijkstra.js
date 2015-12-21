"use strict";

var IndexedPriorityQueue = require("../03-data-structures/IndexedPriorityQueue.js");

module.exports = function(graph, source) {

    var edge_to = {};
    var distance_to = {};
    var relaxed = {};

    var pq = new IndexedPriorityQueue();

    pq.insert(0, 0);
    distance_to[source] = 0;

    var relax = function(vertex) {
        var adjacents = vertex.getAdjacents();
        adjacents.forEach(function(adjacent){
            if (distance_to[adjacent.to] > distance_to[vertex] + adjacent.weight) {
                distance_to[adjacent.to] = distance_to[vertex] + adjacent.weight;
                edge_to[adjacent.to] = vertex;
                if (pq.contains(adjacent.to)) {
                    pq.update(adjacent.to, adjacent.weight);
                } else {
                    pq.insert(adjacent.to, adjacent.weight);
                }
            }
        });
        relaxed[vertex] = true;
    }

    while (!pq.empty())

};