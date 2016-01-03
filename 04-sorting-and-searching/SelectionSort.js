"use strict";

module.exports = function SelectionSort(array) {

    var array_length = array.length;

    function swap(a, b) {
        var tmp = array[a];
        array[a] = array[b];
        array[b] = tmp;
    }

    function min_from(i) {
        var min = array[i];
        var min_index = i;
        for (var j=array_length - 1; j>i; j--) {
            if (array[j] < min) {
                min = array[j];
                min_index = j;
            }
        }
        return min_index;
    }

    var min_index;
    for (var i=0; i<array_length; i++) {
        min_index = min_from(i);
        if (min_index !== i) {
            swap(i, min_index);
        }
    }

    return array;

};