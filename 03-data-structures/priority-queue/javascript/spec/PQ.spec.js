var PQ = require("../PQ.js");
var Chance = require("chance");

var pq = new PQ();
var chance = new Chance();

describe("PriorityQueue", function() {

    it("should be empty after initialization", function() {
        expect(pq.empty()).toBe(true);
    });

    it("should have 3 items now", function() {
        pq.insert(7);
        pq.insert(3);
        pq.insert(42);
        expect(pq.size()).toBe(3);
    });

    it("should have 3 as first item", function() {
        expect(pq.peek()).toBe(3);
    });

    it("should have 3 as first extracted item", function() {
        expect(pq.get()).toBe(3);
    });

    it("should have 7 on top of it after extracting 3", function() {
        expect(pq.get()).toBe(7);
    });

    it("should have 42 as the last item", function() {
        expect(pq.get()).toBe(42);
    });

    it("should be empty after removing all items", function() {
        expect(pq.empty()).toBe(true);
    });

    it("should work with floats", function() {

        for (i=0; i<1000; i++) {
            pq.insert(Math.random());
        }

        expect(pq.size()).toBe(1000);

        console.log("");
        for (i=0; i<10; i++) {
            console.log(pq.get());
        }
        for (i=0; i<990; i++) {
            pq.get();
        }

    });

    it("should work with strings", function() {

        for (i=0; i<1000; i++) {
            pq.insert(chance.name());
        }

        expect(pq.size()).toBe(1000);

        console.log("");
        for (i=0; i<10; i++) {
            console.log(pq.get());
        }

    });

});
