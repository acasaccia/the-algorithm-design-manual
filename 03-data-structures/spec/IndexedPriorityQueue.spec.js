var IndexedPriorityQueue = require("../IndexedPriorityQueue.js");

describe("IndexedPriorityQueue", function() {

    var pq = new IndexedPriorityQueue();

    it("should be empty after initialization", function() {
        expect(pq.empty()).toBe(true);
    });

    it("should allow to insert id / value pairs", function() {

        for(var i=0; i<10; i++) {
            pq.insert(i, i);
        };

        expect(pq.size()).toBe(10);

    });

    it("should allow me to check if an index is in the queue", function() {
        expect(pq.contains(0)).toBe(true);
        expect(pq.contains(1)).toBe(true);
        expect(pq.contains(2)).toBe(true);
        expect(pq.contains(3)).toBe(true);
        expect(pq.contains(4)).toBe(true);

        expect(pq.contains(11)).toBe(false);
        expect(pq.contains(20)).toBe(false);
        expect(pq.contains(-1)).toBe(false);
        expect(pq.contains(13)).toBe(false);
        expect(pq.contains(15)).toBe(false);
    });

    it("should peek 0 as first item without extracting it", function() {
        expect(pq.peek()).toEqual({ id: 0, value: 0 });
    });

    it("should extract 0 as item", function() {
        expect(pq.get()).toEqual({ id: 0, value: 0 });
    });

    it("should delete an index after its item is extracted", function() {
        expect(pq.contains(0)).toBe(false);
        expect(pq.contains(1)).toBe(true);
        expect(pq.contains(2)).toBe(true);
        expect(pq.contains(8)).toBe(true);
        expect(pq.contains(9)).toBe(true);
    });

    it("should respect the priority of items when extracting them", function() {
        expect(pq.get()).toEqual({ id: 1, value: 1 });
        expect(pq.get()).toEqual({ id: 2, value: 2 });
        expect(pq.get()).toEqual({ id: 3, value: 3 });
    });

    it("should allow to change the priority of an item", function() {

        pq.update(4, 10);

        expect(pq.get()).toEqual({ id: 5, value: 5 });
        expect(pq.get()).toEqual({ id: 6, value: 6 });

        pq.update(4, 6.5);

        expect(pq.get()).toEqual({ id: 4, value: 6.5 });

        expect(pq.contains(4)).toBe(false);

        expect(pq.contains(7)).toBe(true);

        expect(pq.get()).toEqual({ id: 7, value: 7 });
        expect(pq.get()).toEqual({ id: 8, value: 8 });

        pq.update(9, 666);

        expect(pq.peek()).toEqual({ id: 9, value: 666 });

        pq.update(9, 42);

        expect(pq.get()).toEqual({ id: 9, value: 42 });

    });

    it("should be empty after removing all items", function() {
        expect(pq.empty()).toBe(true);
    });

});
