"use strict";

var lines = require("fs").readFileSync(process.argv[2], "utf-8")
    .split("\n")
    .filter(Boolean);

var current_case = 1;

while (lines.length) {

    var graph_info = lines.shift().split(" ");
    var cities_count = parseInt(graph_info[0]);
    var roads_count = parseInt(graph_info[1]);

    if (cities_count && roads_count) {
        var graph = new WeightedGraph(cities_count);
        for (var i=0; i<roads_count; i++) {
            var road_info = lines.shift().split(" ");
            graph.addEdge(parseInt(road_info[0]) - 1, parseInt(road_info[1]) - 1, parseInt(road_info[2]));
        }

        var problem_info = lines.shift().split(" ");
        var start = parseInt(problem_info[0]) - 1;
        var destination = parseInt(problem_info[1]) - 1;
        var people_count = parseInt(problem_info[2]);

        var max_capacity_to = {};
        max_capacity_to[start] = people_count;

        var visit = function(city, capacity_so_far) {
            var near_cities = graph.getAdjacents(city);
            near_cities.sort(function(a, b) {
                return graph.getEdgeWeight(city, a) < graph.getEdgeWeight(city, b);
            });
            for (var i=0; i<near_cities.length; i++) {
                var capacity_to_adjacent = graph.getEdgeWeight(city, near_cities[i]);
                capacity_to_adjacent = Math.min(capacity_so_far, capacity_to_adjacent);
                if (max_capacity_to[near_cities[i]] === undefined || max_capacity_to[near_cities[i]] < capacity_to_adjacent) {
                    max_capacity_to[near_cities[i]] = capacity_to_adjacent;
                    visit(near_cities[i], capacity_to_adjacent);
                }
            }
        };

        if (current_case > 1) {
            console.log("");
        }

        console.log("Scenario #%d", current_case);

        if (start === destination) {
            console.log("Minimum Number of Trips = 1");
        } else {
            visit(start, people_count);
            console.log("Minimum Number of Trips = %d", Math.ceil(people_count / (max_capacity_to[destination] - 1)));
        }

        current_case++;
    }
}

function WeightedGraph(vertexes_count) {

    var edges = [];
    var weights = [];

    for (var i=0; i<vertexes_count; i++) {
        edges.push([]);
        weights.push({});
    }

    this.addEdge = function(vertex_1, vertex_2, weight) {
        edges[vertex_1].push(vertex_2);
        edges[vertex_2].push(vertex_1);
        weights[vertex_1][vertex_2] = weight;
        weights[vertex_2][vertex_1] = weight;
    };

    this.getAdjacents = function(vertex) {
        return edges[vertex];
    };

    this.getEdgeWeight = function(vertex_1, vertex_2) {
        return weights[vertex_1][vertex_2];
    }

}