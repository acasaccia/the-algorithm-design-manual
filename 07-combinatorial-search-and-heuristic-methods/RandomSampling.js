var moment = require("moment");
var tsp = require("./Tsp.js");

var input_filename = process.argv[2];
var data = tsp.load(input_filename);
var starting_point = data.shift();
var iterations = 0;
var cost = Number.POSITIVE_INFINITY;
var new_cost, solution, candidate_solution;

function do_work() {
    while (1) {
        iterations++;
        // yield every 1000 iterations to
        // allow the event loop to handle events
        if (iterations % 1000 === 0) {
            setImmediate(do_work);
            return;
        }
        candidate_solution = tsp.shuffle(data);
        new_cost = tsp.cost(candidate_solution, starting_point);
        if (new_cost < cost) {
            cost = new_cost;
            solution = candidate_solution;
            console.log("Found a new better solution! %d", cost / 1000);
        }
    }
}

process.on("SIGINT", function() {
    var end_time = new Date();
    console.log("Examined %d solutions", iterations);
    console.log("Best: %j", cost / 1000);
    var output_filename = process.cwd() + "/output/" + input_filename + "-rs-" + moment().format("YYMMDDHHmm") + ".txt";
    console.log("Writing solutions to: %s", output_filename);
    tsp.write(output_filename, solution, starting_point, cost, start_time, end_time);
    process.exit();
});

var start_time = new Date();
do_work();