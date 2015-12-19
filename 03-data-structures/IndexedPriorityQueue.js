/**
 * Indexed priority queue, other than the usual PQ operations allows to:
 * - querying the PQ with an index to find out if that index is currently contained
 * - updating the value associated with an index after insertion
 * @param comparison_function
 * @constructor
 */
module.exports = function IPQ(comparison_function) {

    var binary_heap = [null];
    // value by index
    var values = {};
    // index by heap index
    var pq = {};
    // heap index by index
    var qp = {};

    var compare = comparison_function || function(a, b) {
            return a < b;
        };

    var _swap = function(a, b, cnt) {
        var tmp = cnt[a];
        cnt[a] = cnt[b];
        cnt[b] = tmp;
    };

    var swap = function(key_1, key_2) {
        _swap(key_1, key_2, binary_heap);
        _swap(key_1, key_2, pq);
        qp[pq[key_1]] = key_2;
        qp[pq[key_2]] = key_1;
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

    this.insert = function(index, value) {
        var heap_index = binary_heap.length;
        binary_heap.push(value);
        values[index] = value;
        pq[heap_index] = index;
        qp[index] = heap_index;
        swim(heap_index);
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

    this.contains = function(index) {
        return values[index] !== undefined;
    };

    this.update = function(index, value) {
        swim(qp[index]);
    };

};