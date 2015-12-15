var debug = true;

if (debug) console.time("parse");

var words = require("fs").readFileSync(process.argv[2], "utf-8")
    .split("\n")
    .map(function(v){
        return v.replace(/\W/g, '')
    })
    .filter(Boolean);

if (debug) console.timeEnd("parse");
if (debug) console.time("pre-processing");

var graph = new Graph(words.length);

for (var i=0; i<words.length; i++) {

    var candidate_neighbours = [];
    var tmp;

    for (var j=0; j<words[i].length; j++) {

        // words resulting from deleting each letter
        if (words[i].length>1) {
            tmp = words[i].slice();
            tmp = tmp.split('');
            tmp.splice(j, 1);
            candidate_neighbours.push(tmp.join(''));
        }

        // words resulting from adding a letter in each position
        tmp = words[i].slice();
        tmp = tmp.split('');
        tmp.splice(j, 0, '.');
        candidate_neighbours.push(tmp.join(''));

        // words resulting from changing a letter in each position
        tmp = words[i].slice();
        tmp = tmp.split('');
        tmp.splice(j, 1, '.');
        candidate_neighbours.push(tmp.join(''));

    }

    candidate_neighbours.push(words[i] + '.');

    for (var j=0; j<candidate_neighbours.length; j++) {
        var regex = new RegExp('^' + candidate_neighbours[j] + '$');
        for (var k=i+1; k<words.length; k++) {
            if (words[k].match(regex)) {
                //console.log("%j -> %j", words[i], words[k]);
                graph.addEdge(i, k);
            }
        }
    }

}

if (debug) console.timeEnd("pre-processing");
if (debug) console.time("processing");

var distance;

var visit = function (v) {
    var adjacents = graph.getAdjacents(v);
    for (var i=0; i<adjacents.length; i++) {
        if (distance[adjacents[i]] === undefined || distance[adjacents[i]] < distance[v] + 1) {
            distance[adjacents[i]] = distance[v] + 1;
            visit(adjacents[i]);
        }
    }
};

var max_distance = 0;

for (var i=0; i<words.length; i++) {

    distance = {};
    distance[i] = 0;
    visit(i);

    for(var key in distance) {
        if (distance[key] > max_distance) {
            max_distance = distance[key];
        }
    }
}

if (debug) console.timeEnd("processing");

console.log(max_distance + 1);

function Graph(vertexes_count) {

    var edges = [];

    for (var i=0; i<vertexes_count; i++) {
        edges.push([]);
    }

    this.addEdge = function(vertex_1, vertex_2) {
        edges[vertex_1].push(vertex_2);
    };

    this.getAdjacents = function(vertex) {
        return edges[vertex];
    };

    this.connected = function(vertex_1, vertex_2) {
        return edges[vertex_1].indexOf(vertex_2) > -1;
    };

}