module.exports = function UnionFind(size) {

    var parent = [];
    var tree_size = [];

    for (var i=0; i<size; i++) {
        parent[i] = i;
        tree_size[i] = 1;
    }

    var root = function(a) {
        while (parent[a] !== a) {
            a = parent[a];
        }
        return a;
    };

    this.connected = function(a, b) {
        return root(a) === root(b);
    };

    this.union = function(a, b) {
        var root_a = root(a);
        var root_b = root(b);
        if (tree_size[root_a] < tree_size[root_b]) {
            parent[root_a] = parent[root_b];
            tree_size[root_b] += tree_size[root_a];
        } else {
            parent[root_b] = parent[root_a];
            tree_size[root_a] += tree_size[root_b];
        }
    };

};