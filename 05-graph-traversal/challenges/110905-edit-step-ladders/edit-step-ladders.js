var debug = false;

if (debug) console.time("parse");

var words = require("fs").readFileSync(process.argv[2], "utf-8")
    .split("\n")
    .map(function(v){
        return v.replace(/\W/g, '')
    })
    .filter(Boolean);

if (debug) console.timeEnd("parse");
if (debug) console.time("pre-processing");

var words_length = words.length;
var graph = new Graph(words_length);

for (var i=0; i<words_length; i++) {

    var candidate_neighbours = [];
    var tmp;
    var word = words[i];
    var word_array = word.split('');
    var word_length = word.length;

    for (var j=0; j<word_length; j++) {

        // words resulting from deleting each character
        if (word_length>1) {
            tmp = word_array.slice();
            tmp.splice(j, 1);
            candidate_neighbours.push(tmp.join(''));
        }

        // words resulting from adding a character in each position
        tmp = word_array.slice();
        tmp.splice(j, 0, '.');
        candidate_neighbours.push(tmp.join(''));

        // words resulting from changing a character in each position
        tmp = word_array.slice();
        tmp.splice(j, 1, '.');
        candidate_neighbours.push(tmp.join(''));

    }

    // adding a letter at the end
    candidate_neighbours.push(word + '.');

    var regex = new RegExp('^(?:' + candidate_neighbours.join('|') + ')$');
    var compare_word;
    var compare_word_length;

    for (var k=i+1; k<words_length; k++) {
        compare_word = words[k];
        compare_word_length = compare_word.length;
        if (compare_word_length <= word_length + 1 &&
            compare_word_length >= word_length - 1 &&
            compare_word.match(regex)) {
            //console.log("%j -> %j", word, words[k]);
            graph.addEdge(i, k);
        }
    }

}

if (debug) console.timeEnd("pre-processing");
if (debug) console.time("processing");

var distance = {};

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

for (var i=0; i<words_length; i++) {
    if (distance[i] === undefined) {
        distance[i] = 0;
        visit(i);
    }
}

for(var key in distance) {
    if (distance[key] > max_distance) {
        max_distance = distance[key];
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

}