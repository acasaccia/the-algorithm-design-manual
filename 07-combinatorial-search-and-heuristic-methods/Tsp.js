var moment = require("moment");
var numeral = require("numeral");
var fs = require("fs");

exports.load = function Tsp_load(filename) {
    filename = "./input/" + filename;
    var lines = fs.readFileSync(filename, "utf-8")
        .split("\n")
        .filter(Boolean);
    lines.splice(0, 7); // remove header
    lines.pop(); // remove "EOF"
    var data = [];
    var current_line;
    var coordinates;
    while (lines.length) {
        current_line = lines.shift();
        coordinates = current_line.split(" ");
        data.push([parseFloat(coordinates[1]), parseFloat(coordinates[2])]);
    }
    return data;
};

exports.write = function Tsp_write(filename, solution, starting_point, cost, start, end) {
    numeral.defaultFormat('0.0000');
    var content = "Cost: " + numeral(cost/1000).format() + "\n";
    content += "Elapsed: " + moment(end).diff(moment(start), 'seconds') + "\"\n";
    content += "DATA_SECTION\n";
    content += numeral(starting_point[0]/1000).format() + " " + numeral(starting_point[1]/1000).format() + "\n";
    solution.forEach(function(v){
        content += numeral(v[0]/1000).format() + " " + numeral(v[1]/1000).format() + "\n";
    });
    content += numeral(starting_point[0]/1000).format() + " " + numeral(starting_point[1]/1000).format() + "\n";
    fs.writeFileSync(filename, content);
    return filename;
};

exports.cost = function Tsp_cost(solution, starting_point) {
    var cost = 0;
    for (var i=1; i<solution.length; i++) {
        cost += euclidean_distance(solution[i-1], solution[i]);
    }
    cost += euclidean_distance(starting_point, solution[0]);
    cost += euclidean_distance(solution[solution.length-1], starting_point);
    return cost;
};

exports.incremental_cost = function Tsp_cost(solution, starting_point, previous_cost, i, j) {
    var before_i = i === 0 ? starting_point : solution[i-1];
    var before_j = j === 0 ? starting_point : solution[j-1];
    var after_i = i === (solution.length - 1) ? starting_point : solution[i+1];
    var after_j = j === (solution.length - 1) ? starting_point : solution[j+1];
    previous_cost -= euclidean_distance(before_i, solution[j]);
    previous_cost -= euclidean_distance(solution[j], after_i);
    previous_cost -= euclidean_distance(before_j, solution[i]);
    previous_cost -= euclidean_distance(solution[i], after_j);
    previous_cost += euclidean_distance(before_i, solution[i]);
    previous_cost += euclidean_distance(solution[i], after_i);
    previous_cost += euclidean_distance(before_j, solution[j]);
    previous_cost += euclidean_distance(solution[j], after_j);
    return previous_cost;
};

exports.swap = function Tsp_swap(solution, i, j) {
    var tmp = solution[i];
    solution[i] = solution[j];
    solution[j] = tmp;
};

exports.get_random_index = function(solution) {
    return Math.floor(Math.random() * solution.length);
};

exports.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

function euclidean_distance(p1, p2) {
    var result = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    return result;
}