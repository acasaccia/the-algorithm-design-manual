var moment = require("moment");
var tsp = require("./Tsp.js");

var input_filename = process.argv[2];
var data = tsp.load(input_filename);
var starting_point = data.shift();
var iteration = 0, evaluated = 0, i, j;

var solution = tsp.shuffle(data);
var best_solution = solution.slice();
var cost = tsp.cost(solution, starting_point);
var best_cost = cost;
var candidate_cost;
var improved_solution;

var indexes = [], indexes_i, indexes_j;
for (var k=0; k<solution.length; k++) {
    indexes.push(k);
}

function do_work() {
    while (1) {
        iteration++;
        // yield every second iteration to
        // allow the event loop to handle events
        if (iteration % 2 === 0) {
            setImmediate(do_work);
            return;
        }
        improved_solution = false;
        indexes_i = indexes.slice();
        tsp.shuffle(indexes_i);
        while (indexes_i.length) {
            i = indexes_i.pop();
            indexes_j = indexes.slice();
            tsp.shuffle(indexes_j);
            while (indexes_j.length) {
                j = indexes_j.pop();
                if (i !== j) {
                    tsp.swap(solution, i, j);
                    candidate_cost = tsp.incremental_cost(solution, starting_point, cost, i, j);
                    evaluated++;
                    if (candidate_cost < cost) {
                        cost = candidate_cost;
                        improved_solution = true;
                        if (cost < best_cost) {
                            best_cost = cost;
                            best_solution = solution.slice();
                            console.log("Improved best solution: %d", best_cost / 1000);
                            //console.log("Swapped %d <=> %d", i, j);
                        }
                        break;
                    } else {
                        tsp.swap(solution, j, i);
                    }
                }
            }
            if (improved_solution) {
                break;
            }
        }
        if (!improved_solution) {
            //console.log("Local maximum found, jumping to another solution");
            solution = tsp.shuffle(solution);
            cost = tsp.cost(solution, starting_point);
        }
    }
}

process.on("SIGINT", function() {
    var end_time = new Date();
    console.log("Examined %d solutions", evaluated);
    console.log("Best: %j", best_cost / 1000);
    var output_filename = process.cwd() + "/output/" + input_filename + "-hc-" + moment().format("YYMMDDHHmm") + ".txt";
    console.log("Writing solutions to: %s", output_filename);
    tsp.write(output_filename, best_solution, starting_point, best_cost, start_time, end_time);
    process.exit();
});

var start_time = new Date();
do_work();