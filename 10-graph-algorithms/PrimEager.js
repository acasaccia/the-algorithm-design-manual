"use strict";

var WeightedGraph = require("./WeightedGraph.js");
var PriorityQueue = require("../03-data-structures/priority-queue/javascript/PQ.js");

module.exports = function PrimEager(graph) {

    var vertex_count = graph.getVertexesCount();
    var mst = new WeightedGraph(vertex_count);

    var priority = {};

    var comparison_function = function(a, b) {
        return priority[a] < priority[b];
    };

    var pq = new PriorityQueue(comparison_function);

    var adjacents = graph.getAdjacents(0);
    var mst_edges_count = vertex_count - 1;
    var next_vertex, other_vertex, tmp_vertex;
    var marked = { 0: true };
    pq.insert(0);

    while (mst.getEdgesCount() < mst_edges_count) {
        next_vertex = pq.get();
        adjacents = graph.getAdjacents(next_vertex);
        adjacents.forEach(function(adjacent){
            other_vertex = adjacent.other(next_vertex);
            if (!marked[other_vertex]) {
                marked[other_vertex] = true;
                if (priority[other_vertex] === undefined || priority[other_vertex] > adjacent.weight) {
                    priority[other_vertex] = adjacent.weight;
                }
                pq.insert(other_vertex);
                tmp_vertex = adjacent.either();
                mst.addEdge(tmp_vertex, adjacent.other(tmp_vertex), adjacent.weight);
            }
        });
    }

    return mst;

};