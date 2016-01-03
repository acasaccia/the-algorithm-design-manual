"use strict";

function merge(a, b) {
    var c = [];
    while (a.length || b.length) {
        if ((a.length && a[0] < b[0]) || !b.length) {
            c.push(a.shift());
        } else {
            c.push(b.shift());
        }
    }
    return c;
}

module.exports = function MergeSort(array) {
    if (array.length === 1) {
        return array;
    } else {
        var half = Math.floor(array.length/2);
        var first_half = MergeSort(array.splice(0, half))
        var second_half = MergeSort(array)
        return merge(first_half, second_half);
    }
    return array;
};