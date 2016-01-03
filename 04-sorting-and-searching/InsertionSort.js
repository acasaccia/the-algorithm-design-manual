"use strict";

module.exports = function InsertionSort(array) {

    var j;

    function swap(a, b) {
        var tmp = array[a];
        array[a] = array[b];
        array[b] = tmp;
    }

    for (var i=1; i<array.length; i++) {
        j = i;
        while (j>0 && array[j-1] > array[j]) {
            swap(j, j-1);
            j--;
        }
    }

    return array;

};