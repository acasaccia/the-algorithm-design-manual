"use strict";

var WeightedGraph = require("./WeightedGraph.js");
var IndexedPriorityQueue = require("../03-data-structures/IndexedPriorityQueue.js");

module.exports = function PrimEager(graph) {

    var vertex_count = graph.getVertexesCount();
    var mst = new WeightedGraph(vertex_count);

    var priority = {};

    var comparison_function = function(a, b) {
        return priority[a] < priority[b];
    };

    var pq = new IndexedPriorityQueue(comparison_function);

    var mst_edges_count = vertex_count - 1;
    var adjacents, current_vertex, other_vertex;
    var in_mst = { 0: true }, edge_to_mst = {};
    pq.insert(0);

    while (mst.getEdgesCount() < mst_edges_count) {
        current_vertex = pq.get();
        in_mst[current_vertex] = true;
        mst.addEdge(current_vertex, edge_to_mst[current_vertex].other(current_vertex), edge_to_mst[current_vertex].weight);
        adjacents = graph.getAdjacents(current_vertex);
        adjacents.forEach(function(adjacent){
            other_vertex = adjacent.other(current_vertex);
            if (!in_mst[other_vertex]) {
                if (priority[other_vertex] === undefined || priority[other_vertex] > adjacent.weight) {
                    priority[other_vertex] = adjacent.weight;
                    edge_to_mst[other_vertex] = adjacent;
                    if(pq.contains(other_vertex)) {
                        pq.update(other_vertex);
                    } else {
                        pq.insert(other_vertex);
                    }
                }
            }
        });
    }

    return mst;

};