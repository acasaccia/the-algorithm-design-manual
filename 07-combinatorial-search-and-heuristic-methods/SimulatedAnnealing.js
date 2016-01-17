// Annealing configuration
var INITIAL_TEMPERATURE = 1;
var COOLING_FRACTION = 0.9999;       // tipically 0.99 > x > 0.8
var STEPS_PER_TEMPERATURE = 1000;    // tipically 1000 > x > 100
var E = 2.718281828;

var moment = require("moment");
var tsp = require("./Tsp.js");

var input_filename = process.argv[2];
var data = tsp.load(input_filename);
var starting_point = data.shift();

var iteration = 0, evaluated = 0, i, j, last_improved_iteration;

var max_distance = 0, candidate_distance;
for (var i=0; i<data.length; i++) {
    for (var j=i+1; j<data.length; j++) {
        candidate_distance = tsp.euclidean_distance(data[i], data[j]);
        if (candidate_distance > max_distance) {
            max_distance = candidate_distance;
        }
    }
}

var K = -0.2 * max_distance; // normalization constant

var solution = tsp.shuffle(data);
var best_solution = solution.slice();
var cost = tsp.cost(solution, starting_point);
var best_cost = cost;
var temperature = INITIAL_TEMPERATURE;
var candidate_cost;

function do_work() {

    while (1) {
        iteration++;
        // yield every second iteration to
        // allow the event loop to handle events
        if (iteration % 2 === 0) {
            setImmediate(do_work);
            return;
        }
        temperature = temperature * COOLING_FRACTION;
        var i, j;
        var initial_cost = cost;
        var negative_swap_accepted = 0;
        var negative_swap_tried = 0;
        for (var k=0; k<STEPS_PER_TEMPERATURE; k++) {
            i = tsp.get_random_index(solution);
            j = tsp.get_random_index(solution);
            while (i === j) {
                j = tsp.get_random_index(solution);
            }
            tsp.swap(solution, i, j);
            candidate_cost = tsp.incremental_cost(solution, starting_point, cost, i, j);
            evaluated++;
            if (candidate_cost < cost) {
                cost = candidate_cost;
                if (cost < best_cost) {
                    best_cost = cost;
                    best_solution = solution.slice();
                    console.log("Improved best solution: %d", cost / 1000);
                }
            } else {
                negative_swap_tried++;
                if (!accept_negative_transition(candidate_cost, cost, temperature)) {
                    tsp.swap(solution, j, i);
                } else {
                    negative_swap_accepted++;
                    //console.log("Accepted negative swap: %d -> %d", cost / 1000, candidate_cost / 1000);
                    cost = candidate_cost;
                }
            }
        }
        //console.log("Negative swaps %d / %d at temperature %d", negative_swap_accepted, negative_swap_tried, temperature);
        cost = tsp.cost(solution, starting_point);
        if (cost < initial_cost) {
            //console.log("Solution improved %d -> %d, rerun at this temperature", initial_cost / 1000, cost / 1000);
            last_improved_iteration = iteration;
            temperature = temperature / COOLING_FRACTION;
        } else {
            if (iteration - last_improved_iteration > 1000) {
                console.log("Couldn't improve solution in the last 1000 iterations");
                temperature = INITIAL_TEMPERATURE;
            }
        }

    }
}

function accept_negative_transition(candidate_cost, cost, temperature) {
    var r = Math.random();
    var numerator = cost - candidate_cost;
    var denominator = K * temperature;
    var exponent = -1 * numerator / denominator;
    var power = Math.pow(E, exponent);
    var result = power >= r;
    return result;
}

function finalize() {
    var end_time = new Date();
    console.log("Examined %d solutions", evaluated);
    console.log("Best: %j", best_cost / 1000);
    var output_filename = process.cwd() + "/output/" + input_filename + "-sa-" + moment().format("YYMMDDHHmm") + ".txt";
    console.log("Writing solutions to: %s", output_filename);
    tsp.write(output_filename, best_solution, starting_point, best_cost, start_time, end_time);
    process.exit();
}

process.on("SIGINT", finalize);

var start_time = new Date();
do_work();