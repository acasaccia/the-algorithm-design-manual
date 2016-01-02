"use strict";

module.exports = function(array) {

    var array_length = array.length;

    function swap(a, b) {
        var tmp = array[a];
        array[a] = array[b];
        array[b] = tmp;
    }

    for (var i=0; i<array_length; i++) {
        var min = array[i];
        var min_index = i;
        for (var j=array_length - 1; j>i; j--) {
            if (array[j] < min) {
                min = array[j];
                min_index = j;
            }
        }
        if (min_index !== i) {
            swap(i, min_index);
        }
    }

    return array;

};