module.exports = function UnionFind(size) {

    var parent = [];

    for (var i=0; i<size; i++) {
        parent[i] = i;
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
        parent[root(a)] = parent[root(b)];
    };

};