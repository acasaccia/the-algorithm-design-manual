"use strict";

var PriorityQueue = require("../03-data-structures/PriorityQueue.js");

module.exports = function HeapSort(array) {

    var pq = new PriorityQueue();

    while (array.length) {
        pq.insert(array.shift());
    }

    while (!pq.empty()) {
        array.push(pq.get());
    }

    return array;

};