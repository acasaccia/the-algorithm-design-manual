/**
 * Generic priority function implementation. If no comparison function is passed in, then it behaves as a Minimum
 * Priority Queue comparing values with the "<" operator
 * @param comparison_function
 * @constructor
 */
module.exports = function PQ(comparison_function) {

    var binary_heap = [null];

    var compare = comparison_function || function(a, b) {
        return a < b;
    };

    var swap = function(key_1, key_2) {
        var tmp = binary_heap[key_1];
        binary_heap[key_1] = binary_heap[key_2];
        binary_heap[key_2] = tmp;
    };

    // restore consistency when a child has a smaller value than a parent
    var swim = function(key) {
        var parent_key = parseInt(key/2);
        while(key > 1 && compare(binary_heap[key], binary_heap[parent_key])) {
            swap(key, parent_key);
            key = parseInt(key/2);
            parent_key = parseInt(key/2);
        }
    };

    // restore consistency when a parent has a bigger value than a child
    var sink = function(key) {
        var child_key = key*2;
        var n = binary_heap.length-1;
        while(child_key <= n) {
            if (child_key < n && compare(binary_heap[child_key+1], binary_heap[child_key])) {
                child_key++;
            }
            if (!compare(binary_heap[child_key], binary_heap[key])) {
                break;
            }
            swap(child_key, key);
            key = child_key;
            child_key = key*2;
        }
    };

    this.insert = function(value) {
        binary_heap.push(value);
        swim(binary_heap.length - 1);
    };

    this.get = function() {
        if (binary_heap.length === 1) {
            throw new Error("Trying to get an item from empty queue");
        }
        var max = binary_heap[1];
        var last_item = binary_heap.pop();
        if (binary_heap.length > 1) {
            binary_heap[1] = last_item;
            sink(1);
        }
        return max;
    };

    this.peek = function() {
        return binary_heap[1];
    };

    this.size = function() {
        return binary_heap.length - 1;
    };

    this.empty = function() {
        return (binary_heap.length - 1) === 0;
    };

};