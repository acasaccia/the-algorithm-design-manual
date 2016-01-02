var UnionFind = require("../UnionFind.js");

describe("UnionFind", function() {

    var uf = new UnionFind(10);

    it("nothing should be connected after initialization", function() {
        expect(uf.connected(0, 1)).toBe(false);
        expect(uf.connected(0, 2)).toBe(false);
        expect(uf.connected(0, 3)).toBe(false);
        expect(uf.connected(0, 4)).toBe(false);
        expect(uf.connected(0, 5)).toBe(false);
        expect(uf.connected(1, 2)).toBe(false);
        expect(uf.connected(1, 3)).toBe(false);
        expect(uf.connected(1, 4)).toBe(false);
        expect(uf.connected(1, 5)).toBe(false);
        expect(uf.connected(8, 9)).toBe(false);
    });

    it("should allow me to connect items", function() {
        uf.union(0, 1);
        expect(uf.connected(0, 1)).toBe(true);

        uf.union(0, 2);
        expect(uf.connected(0, 2)).toBe(true);

        uf.union(0, 3);
        expect(uf.connected(0, 3)).toBe(true);
    });

    it("connected should be reflexive", function() {
        expect(uf.connected(1, 1)).toBe(true);
        expect(uf.connected(2, 2)).toBe(true);
        expect(uf.connected(3, 3)).toBe(true);
    });

    it("connected should be transitive", function() {
        expect(uf.connected(1, 2)).toBe(true);
        expect(uf.connected(1, 3)).toBe(true);
    });

    it("connected should be commutative", function() {
        expect(uf.connected(1, 2)).toBe(true);
        expect(uf.connected(2, 1)).toBe(true);
        expect(uf.connected(0, 5)).toBe(false);
        expect(uf.connected(5, 0)).toBe(false);
    });

    it("should leave the rest disconnected", function() {
        expect(uf.connected(1, 4)).toBe(false);
        expect(uf.connected(1, 5)).toBe(false);
        expect(uf.connected(8, 9)).toBe(false);
        expect(uf.connected(0, 4)).toBe(false);
        expect(uf.connected(0, 5)).toBe(false);
    });

});
