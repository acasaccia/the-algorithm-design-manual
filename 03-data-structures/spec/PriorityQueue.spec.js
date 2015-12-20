var PriorityQueue = require("../PriorityQueue.js");

describe("PriorityQueue", function() {

    var pq = new PriorityQueue();

    it("should be empty after initialization", function() {
        expect(pq.empty()).toBe(true);
    });

    it("should allow me to insert items", function() {
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

        var pq = new PriorityQueue();

        var entries = [
            0.7892801526468247,
            0.23970133275724947,
            0.7760171131230891,
            0.4615395008586347,
            0.715014555491507,
            0.12941752350889146,
            0.6256219949573278,
            0.4534626053646207,
            0.5934571141842753,
            0.6437332744244486,
            0.9193921270780265,
            0.33341704262420535,
            0.2619502313900739,
            0.13322315854020417,
            0.9961729138158262,
            0.8841416367795318,
            0.7211950374767184,
            0.5891680989880115,
            0.8112198326271027,
            0.38735766243189573
        ];

        entries.forEach(function(entry){
            pq.insert(entry);
        });

        expect(pq.get()).toBeCloseTo(0.12941752350889146, 5);
        expect(pq.get()).toBeCloseTo(0.13322315854020417, 5);
        expect(pq.get()).toBeCloseTo(0.23970133275724947, 5);
    });

    it("should work with strings", function() {

        var pq = new PriorityQueue();

        var entries = [
            "Agnes Wallace",
            "Austin Farmer",
            "Barry Pena",
            "Gilbert Fowler",
            "Fanny Torres",
            "Kathryn Pittman",
            "Kate Holmes",
            "Logan Chambers",
            "Olive Dawson",
            "Sophia Cain",
            "Gilbert Marsh",
            "Dylan Collins",
            "Anne Pittman",
            "Rena Patrick",
            "Dennis Lopez",
            "Daisy Barton",
            "Marian Williamson",
            "Bertie Moran",
            "Arthur Thornton",
            "Warren Brown"
        ];

        entries.forEach(function(entry){
            pq.insert(entry);
        });

        expect(pq.get()).toBe("Agnes Wallace");
        expect(pq.get()).toBe("Anne Pittman");
        expect(pq.get()).toBe("Arthur Thornton");
    });

});
