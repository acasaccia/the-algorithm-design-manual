"use strict";

var WeightedGraph = require("./WeightedGraph.js");
var PriorityQueue = require("../03-data-structures/PriorityQueue.js");

/**
 * Prim algorithm, lazy implementation
 * Computes the Minimum Spanning Tree of a weighted graph
 * Initialize MST to a vertex of choice. Add to the priority queue the edges connected to the current MST.
 * Select the edge with minimum weight, if exactly one vertex it connects is on the MST, add the other to the MST and
 * add its adjacent edges to the priority queue.
 * Lazy because upon inserting a new edge in the priority queue we don't check if the connected vertex is already in the
 * Minimum spanning Tree, or already in the priority queue and we discard them after extracting it from the queue.
 */
module.exports = function PrimLazy(graph) {

    var vertex_count = graph.getVertexesCount();
    var mst = new WeightedGraph(vertex_count);

    var comparison_function = function(a, b) {
        return a.weight < b.weight;
    };

    var pq = new PriorityQueue(comparison_function);

    var adjacents = graph.getAdjacents(0);

    adjacents.forEach(function(adjacent){
        pq.insert(adjacent);
    });

    var mst_edges_count = vertex_count - 1;
    var next_edge, vertex_1, vertex_2, weight;
    var marked = { 0: true };
    var next_edge, to_mark;

    while (mst.getEdgesCount() < mst_edges_count) {
        next_edge = pq.get();
        vertex_1 = next_edge.either();
        vertex_2 = next_edge.other(vertex_1);
        weight = next_edge.weight;
        if (!(marked[vertex_1] && marked[vertex_2])) {
            mst.addEdge(vertex_1, vertex_2, weight);
            to_mark = marked[vertex_1] ? vertex_2 : vertex_1;
            adjacents = graph.getAdjacents(to_mark);
            adjacents.forEach(function(adjacent){
                pq.insert(adjacent);
            });
            marked[to_mark] = true;
        }
    }

    return mst;

};