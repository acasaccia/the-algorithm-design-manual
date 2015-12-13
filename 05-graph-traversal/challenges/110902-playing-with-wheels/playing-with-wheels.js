"use strict";

var lines = require('fs').readFileSync(process.argv[2], 'utf-8')
    .split('\n')
    .filter(Boolean);

var cases = parseInt(lines.shift());

while (cases > 0) {
    var initial = parseVertex(lines.shift());
    var target = parseVertex(lines.shift());
    var forbidden_count = parseInt(lines.shift());
    var forbidden = {};
    for (var i=0; i<forbidden_count; i++) {
        forbidden[parseVertex(lines.shift())] = true;
    }
    var graph = initializeGraph(forbidden);
    console.log(path(graph, initial, target));
    cases--;
}

function path(graph, initial, target) {

    var to_root = {};
    var found = false;

    var visit = function(n) {
        if (n === target) {
            found = true;
        }
        var adjacents = graph.getAdjacents(n);
        for (var i=0; i<adjacents.length; i++) {
            if (to_root[adjacents[i]] === undefined) {
                to_root[adjacents[i]] = n;
                to_visit.push(adjacents[i]);
            }
        }
    };

    var to_visit = [initial];
    while (to_visit.length && !found) {
        visit(to_visit.shift());
    }

    if (!found) {
        return -1;
    } else {
        var path = [target];
        var next = to_root[target];
        while (next !== initial) {
            path.unshift(next);
            next = to_root[next];
        }
        path.unshift(initial);
        //console.log("%j", path);
        return path.length - 1;
    }

}

function initializeGraph(forbidden) {
    var graph = new Graph(10000);
    var string, digit, neighbour;
    for (var i=0; i<10000; i++) {
        if (!forbidden[i]) {
            string = toPaddedString(i);
            for (var j=0; j<4; j++) {
                digit = string.charAt(j);
                neighbour = getNeighbour(string, digit, j, +1);
                if (!forbidden[neighbour]) {
                    graph.addEdge(i, neighbour);
                }
                neighbour = getNeighbour(string, digit, j, -1);
                if (!forbidden[neighbour]) {
                    graph.addEdge(i, neighbour);
                }
            }
        }
    }
    return graph;
}

function getNeighbour(string, digit, digit_index, rotation_direction) {
    var rotated = mod((parseInt(digit) + rotation_direction), 10);
    var neighbour = string.slice();
    neighbour = neighbour.split('');
    neighbour.splice(digit_index, 1, rotated);
    neighbour = neighbour.join('');
    return parseInt(neighbour);
}

function toPaddedString(n) {
    var string = String(n);
    while (string.length < 4) {
        string = '0' + string;
    }
    return string;
}

function mod(n, m) {
    var r = n % m;
    return r >= 0 ? r : r + m;
}

function parseVertex(string) {
    return parseInt(string.replace(new RegExp(' ', 'g'), ''));
}

function Graph(vertexes_count) {

    var edges = [];

    for (var i=0; i<vertexes_count; i++) {
        edges.push([]);
    }

    this.addEdge = function(vertex_1, vertex_2) {
        //console.log("Adding edge %s -> %s", toPaddedString(vertex_1), toPaddedString(vertex_2))
        if (edges[vertex_1].indexOf(vertex_2) === -1) {
            edges[vertex_1].push(vertex_2);
        }
        if (edges[vertex_2].indexOf(vertex_1) === -1) {
            edges[vertex_2].push(vertex_1);
        }
    };

    this.getAdjacents = function(vertex) {
        return edges[vertex];
    };

}