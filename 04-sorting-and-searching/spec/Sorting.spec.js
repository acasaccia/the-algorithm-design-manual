"use strict";

var fs = require("fs");
var unsorted = fs.readFileSync(process.cwd() + "/04-sorting-and-searching/input/names.txt", "utf-8")
    .replace(/[\r]+/g, "").split("\n").filter(Boolean);
var sorted = fs.readFileSync(process.cwd() + "/04-sorting-and-searching/input/sorted_names.txt", "utf-8")
    .replace(/[\r]+/g, "").split("\n").filter(Boolean);

var algorithms = [
    "NativeSort",
    "SelectionSort",
    "InsertionSort",
    "HeapSort",
    "MergeSort",
    "QuickSort"
];

algorithms.forEach(function(algorithm_name) {
    var algorithm = require("../" + algorithm_name + ".js");
    describe(algorithm_name, function() {
        it("should work", function(){
            //console.time(algorithm_name);
            expect(algorithm(unsorted.slice())).toEqual(sorted);
            //console.timeEnd(algorithm_name);
        });
    });
});