"use strict";

module.exports = function Components(graph) {

    var vertexes_count = graph.getVertexesCount();
    var component = {};
    var visited = {};

    var visit = function(n) {
        visited[n] = true;
        var adjacents = graph.getAdjacents(n);
        for (var i=0; i<adjacents.length; i++) {
            if (!visited[adjacents[i]]) {
                visit(adjacents[i], n);
            }
        }
    };

    for (var i=0; i<vertexes_count; i++) {
        if (component[i] === undefined) {
            visited = {};
            visit(i);
            for (var j=0; j<vertexes_count; j++) {
                if (visited[j]) {
                    component[j] = i;
                }
            }
        }
    }

    return {

        get: function get(v1) {

            function extract_component(component_id) {
                var vertexes = [];
                for (var i=0; i<vertexes_count; i++) {
                    if (component[i] === component_id) {
                        vertexes.push(i);
                    }
                }
                return vertexes;
            }

            if (v1 === undefined) {
                var components = [];
                var done = {};
                for(var i in component) {
                    component_id = component[i];
                    if (!done[component_id]) {
                        components.push(extract_component(component_id));
                        done[component_id] = true;
                    }
                }
                return components;
            }

            var component_id = component[v1];
            return extract_component(component_id);
        },

        same: function same(v1, v2) {
            return component[v1] === component[v2];
        }

    };


};