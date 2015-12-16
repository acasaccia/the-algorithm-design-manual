var Chance = require("chance");
var chance = new Chance();
var dictionary_size = parseInt(process.argv[2]);
if (dictionary_size > 25000) {
    dictionary_size = 25000;
}
var dictionary = [];
var remaining_words = dictionary_size;

while (remaining_words) {
    var word = chance.word();
    if (dictionary.indexOf(word) === -1 && word.length < 16) {
        remaining_words--;
        dictionary.push(word);
    }
}

dictionary.sort();

for (var i=0; i<dictionary.length; i++) {
    console.log(dictionary[i]);
}