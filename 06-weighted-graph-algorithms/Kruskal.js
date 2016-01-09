"use strict";

var WeightedGraph = require("./WeightedGraph.js");
var UnionFind = require("../03-data-structures/UnionFind.js");

/**
 * Kruskal algorithm
 * Computes the Minimum Spanning Tree of a weighted graph
 * Tree: directed graph, without cycles
 * Spanning: covering all vertexes
 * Minimum: of minimum weight
 * Sort edges by weight, at each step add minimum weight edge to the MST if it doesn't introduce a cycle.
 */
module.exports = function Kruskal(graph) {

    var mst = new WeightedGraph(graph.getVertexesCount());

    var edges = graph.getEdges();

    edges.sort(function(a, b){
        if (a.weight === b.weight) {
            return 0;
        }
        return a.weight < b.weight ? -1 : 1;
    });

    var union_find = new UnionFind(graph.getVertexesCount());

    var next_edge = edges.shift();
    var vertex, other_vertex;

    while(next_edge) {
        vertex = next_edge.either();
        other_vertex = next_edge.other(vertex);
        if (!union_find.connected(vertex, other_vertex)) {
            union_find.union(vertex, other_vertex);
            mst.addEdge(vertex, other_vertex, next_edge.weight);
        }
        next_edge = edges.shift();
    }

    return mst;

};