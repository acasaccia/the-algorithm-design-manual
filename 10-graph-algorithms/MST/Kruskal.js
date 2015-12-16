"use strict";

var WeightedGraph = require("../WeightedGraph.js");

module.exports = function Kruskal(graph) {

    var mst = new WeightedGraph(graph.getVertexesCount());

    var edges = graph.getEdges();

    edges.sort(function(a, b){
        if (a.weight() === b.weight()) {
            return 0;
        }
        return a.weight() < b.weight() ? -1 : 1;
    });

    var union_find = new UnionFind(graph.getVertexesCount());

    var next_edge = edges.shift();
    var vertex = next_edge.either();
    var other_vertex = next_edge.other(vertex);

    while(!union_find.connected(vertex, other_vertex)) {
        union_find.union(vertex, other_vertex);
        mst.addEdge(next_edge);
        next_edge = edges.shift();
        vertex = next_edge.either();
        other_vertex = next_edge.other(vertex);
    }

    return mst;

};

function UnionFind(size) {

    var parent = [];

    for (var i=0; i<size; i++) {
        parent[i] = i;
    }

    var root = function(a) {
        while (parent[a] !== a) {
            a = parent[a];
        }
        return a;
    };

    this.connected = function(a, b) {
        return root(a) === root(b);
    };

    this.union = function(a, b) {
        parent[root(a)] = parent[root(b)];
    };

}