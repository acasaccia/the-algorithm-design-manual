"use strict";

var WeightedGraph = require("./WeightedGraph.js");
var IndexedPriorityQueue = require("../03-data-structures/IndexedPriorityQueue.js");

/**
 * Prim algorithm, eager implementation
 * Computes the Minimum Spanning Tree of a weighted graph
 * Initialize MST to a vertex of choice. Add to the priority queue the edges connected to the current MST.
 * Select the edge with minimum weight, if exactly one vertex it connects is on the MST, add the other to the MST and
 * add its adjacent edges to the priority queue.
 * Eager because before inserting a new edge in the priority queue we check if the connected vertex is already in the
 * Minimum spanning Tree, or already in the priority queue. If it's already in the priority queue we possibly change
 * it's weight and update it's position in the data structure accordingly.
 */
module.exports = function PrimEager(graph) {

    var vertexes_count = graph.getVertexesCount();
    var mst = new WeightedGraph(vertexes_count);
    var pq = new IndexedPriorityQueue();
    var mst_edges_count = vertexes_count - 1;
    var adjacents, current_vertex, other_vertex, new_edge;
    var in_mst = {}, edge_to_mst = {}, priority = {};

    for (var i=0; i<vertexes_count; i++) {
        priority[i] = Number.POSITIVE_INFINITY;
    }

    pq.insert(0, 0);

    while (mst.getEdgesCount() < mst_edges_count) {

        current_vertex = pq.get().id;

        new_edge = edge_to_mst[current_vertex];
        if (new_edge !== undefined) {
            mst.addEdge(current_vertex, new_edge.other(current_vertex), new_edge.weight);
        }

        in_mst[current_vertex] = true;

        adjacents = graph.getAdjacents(current_vertex);
        adjacents.forEach(function(adjacent){
            other_vertex = adjacent.other(current_vertex);
            if (!in_mst[other_vertex]) {
                if (priority[other_vertex] > adjacent.weight) {
                    priority[other_vertex] = adjacent.weight;
                    edge_to_mst[other_vertex] = adjacent;
                    if(pq.contains(other_vertex)) {
                        pq.update(other_vertex, adjacent.weight);
                    } else {
                        pq.insert(other_vertex, adjacent.weight);
                    }
                }
            }
        });
    }

    return mst;

};