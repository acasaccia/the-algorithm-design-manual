var Chance = require("chance");
var chance = new Chance();
var cases = getRandomInt(1, 100);

console.log(cases);
console.log('');
for (var i=0; i<cases; i++) {
    var candidates_number = getRandomInt(1, 20);
    console.log(candidates_number);
    for (var j=0; j<candidates_number; j++) {
        console.log(chance.name());
    }
    var votes_number = getRandomInt(1, 1000);
    var votes_array = [];
    for (j=1; j<=candidates_number; j++) {
        votes_array.push(j);
    }
    for (var j=0; j<votes_number; j++) {
        shuffle(votes_array);
        console.log(votes_array.join(' '));
    }
    console.log('');
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}