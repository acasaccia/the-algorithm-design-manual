var lines = require("fs").readFileSync(process.argv[2], "utf-8")
    .split("\n")
    .filter(Boolean);

var current_case = 1;

while (lines.length) {

    var cubes_count = parseInt(lines.shift());

    if (!cubes_count) {
        break;
    }

    var cubes = [];
    var cube_info;

    for (var i=0; i<cubes_count; i++) {
        cube_info = lines.shift().split(' ').map(function(v){
            return parseInt(v);
        });
        cubes.push(cube_info);
    }

    var graph = new Graph(cubes_count * 6); // each cube can be placed in 6 different positions
    var oriented_cubes = [];
    var bottom, top, current_cube;

    for (var i=0; i<cubes_count; i++) {
        current_cube = cubes[i];
        for (var j=0; j<6; j++) {
            if (j%2 === 0) {
                bottom = current_cube[j];
                top = current_cube[j+1];
            } else {
                bottom = current_cube[j];
                top = current_cube[j-1];
            }
            oriented_cubes.push({
                bottom: bottom,
                top: top
            });
        }
    }

    var current_oriented_cube, candidate_oriented_cube, current_oriented_cube_index, candidate_oriented_cube_index;
    var below_cubes_count = cubes_count - 1;

    for (var i=0; i<below_cubes_count; i++) {
        for (var j=0; j<6; j++) {
            current_oriented_cube_index = i*6+j;
            current_oriented_cube = oriented_cubes[current_oriented_cube_index];
            // add an edge from this oriented cube to all the oriented cubes that could sit on top of it
            for (var k=i+1; k<cubes_count; k++) {
                for (var l=0; l<6; l++) {
                    candidate_oriented_cube_index = k*6+l;
                    candidate_oriented_cube = oriented_cubes[candidate_oriented_cube_index];
                    if (current_oriented_cube.top === candidate_oriented_cube.bottom) {
                        graph.addEdge(current_oriented_cube_index, candidate_oriented_cube_index);
                    }
                }
            }
        }
    }

    var height = {};
    var to_base = {};

    var visit = function (v) {
        var adjacents = graph.getAdjacents(v);
        for (var i=0; i<adjacents.length; i++) {
            if (height[adjacents[i]] === undefined || height[adjacents[i]] < height[v] + 1) {
                height[adjacents[i]] = height[v] + 1;
                to_base[adjacents[i]] = v;
                visit(adjacents[i]);
            }
        }
    };

    for (var i=0; i<cubes_count*6; i++) {
        if (height[i] === undefined) {
            height[i] = 1;
            visit(i);
        }
    }

    var max_height = 0;
    var tallest_id = 0;

    for(var key in height) {
        if (height[key] > max_height) {
            max_height = height[key];
            tallest_id = key;
        }
    }

    var stack = [tallest_id];
    var next = tallest_id;

    while (to_base[next] !== undefined) {
        next = to_base[next];
        stack.push(next);
    }

    if (current_case>1) {
        console.log("");
    }

    console.log("Case #%d", current_case);
    console.log(max_height);

    var positions = ['front', 'back', 'left', 'right', 'top', 'bottom'];

    while (stack.length) {
        current_oriented_cube_index = stack.pop();
        console.log(Math.floor((current_oriented_cube_index / 6) + 1) + " " + positions[current_oriented_cube_index % 6]);
    }

    current_case++;

}

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