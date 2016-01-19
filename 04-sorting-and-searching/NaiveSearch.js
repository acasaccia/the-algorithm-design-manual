// searches a substring in a given string
// strings are given as arrays of chars, as we are not interested in using native string functions
module.exports = function NaiveSearch(substring, string) {
    var limit = string.length - substring.length;
    for (var i=0; i<limit; i++) {
        var match = false;
        for (var j=0; j<substring.length; j++) {
            if (string[i+j] !== substring[j]) {
                break;
            } else {
                if (j === substring.length-1) {
                    match = true;
                    break;
                }
            }
        }
        if (match) {
            return true;
        }
    }
    return false;
};
