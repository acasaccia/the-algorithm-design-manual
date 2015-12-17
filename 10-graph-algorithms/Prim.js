"use strict";

var WeightedGraph = require("./WeightedGraph.js");

module.exports = function Prim(graph) {
    return graph;
};

function MinPQ() {

    var binary_heap = [null];

    var swap = function(key_1, key_2) {
        var tmp = binary_heap[key_1];
        binary_heap[key_1] = binary_heap[key_2];
        binary_heap[key_2] = tmp;
    };

    // restore consistency when a child has a smaller value than a parent
    var swim = function(key) {
        var parent_key = parseInt(k/2);
        while(key > 1 && this.less(binary_heap[key], binary_heap[parent_key])) {
            swap(key, parent_key);
        }
    };

    // restore consistency when a parent has a bigger value than a child
    var sink = function(key) {
        var child_key = key * 2;
        var n = binary_heap.length - 1;
        while(child_key < n) {
            if (child_key < n && this.less(binary_heap[child_key], binary_heap[child_key+1])) {
                child_key++;
            }
            if (this.less(binary_heap[child_key], binary_heap[key])) {
                swap(key, parent_key);
            }
        }
    };

    this.insert = function(value) {
        binary_heap.push(value);
        swim(binary_heap.length - 1);
    };

    this.get = function() {
        var max = binary_heap[1];
        binary_heap[1] = binary_heap.pop();
        sink(1);
        return max;
    };

    this.peek = function() {
        return binary_heap[1];
    };

    this.size = function() {
        return n;
    };

    this.empty = function() {
        return n === 0;
    };

    this.less = function(a, b) {
        return a < b;
    };

}