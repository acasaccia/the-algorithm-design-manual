// searches a substring in a given string
// strings are given as arrays of chars, as we are not interested in using native string functions
module.exports = function RabinKarpSearch(substring, string) {
    var substring_hash = rabin_karp(substring);
    var limit = string.length - substring.length;
    var candidate_hash;
    for (var i=0; i<limit; i++) {
        if (i > 0) {
            candidate_hash -= rabin_karp(string, i-1, i);
            candidate_hash += rabin_karp(string, i + substring.length, i + substring.length + 1);
        } else {
            candidate_hash = rabin_karp(string, 0, substring.length);
        }
        if (substring_hash === candidate_hash) {
            if (accurate_check(substring, string, i)) {
                return true;
            }
        }
    }
    return false;
};

function rabin_karp(string, from, to) {
    from = from ? from : 0;
    to = to ? to : string.length;
    // "z".charCodeAt(0) === 122, next prime is 127
    var alphabet_size = 127;
    var hash = 0;
    for (var i=from; i<to; i++) {
        hash += Math.pow(alphabet_size, i) * string[i].charCodeAt(0);
    }
    return hash;
}

function accurate_check(substring, string, i) {
    for (var j=0; j<substring.length; j++) {
        if (string[i+j] !== substring[j]) {
            break;
        } else {
            if (j === substring.length-1) {
                return true;
            }
        }
    }
    return false;
}
