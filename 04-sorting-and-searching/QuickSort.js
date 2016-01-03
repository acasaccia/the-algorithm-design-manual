"use strict";

function QuickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    var pivot = array.pop();
    var before = [];
    var after = [];
    var next;
    while (array.length) {
        next = array.pop();
        if (next < pivot) {
            before.push(next);
        } else {
            after.push(next);
        }
    }
    return QuickSort(before).concat(pivot, QuickSort(after));
}

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
        return o;
    }
}

module.exports = function randomizeAndQuickSort(array) {
    return QuickSort(shuffle(array));
};