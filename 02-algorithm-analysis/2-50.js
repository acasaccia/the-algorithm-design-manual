// A Ramanujam number can be written two different ways as the sum of two cubes—i.e. , there exist distinct a, b, c,
// and d such that a^3 + b^3 = c^3 + d^3 . Generate all Ramanujam numbers where a, b, c, d < n

var n=100;
var ramanujam = [];
var candidate;

for (var a=0; a<n; a++)
    for (var b=0; b<n; b++)
        for (var c=0; c<n; c++)
            for (var d=0; d<n; d++) {
                if (a != b && b != c && a != c && b != d && c != d && a!= d) {
                    candidate = Math.pow(a,3) + Math.pow(b,3);
                    if (candidate === Math.pow(c,3) + Math.pow(d,3)) {
                        if (ramanujam.indexOf(candidate) === -1) {
                            ramanujam.push(candidate);
                        }
                    }
                }
            }

console.log(ramanujam);