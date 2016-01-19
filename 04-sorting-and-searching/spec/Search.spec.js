var algorithms = [
    "NaiveSearch",
    //"RabinKarpSearch"
];

var haystack = require("fs").readFileSync(process.cwd() + "/04-sorting-and-searching/input/haystack.txt", "utf-8").split("");

algorithms.forEach(function(algorithm_name) {
    var algorithm = require("../" + algorithm_name + ".js");

    var needles_in_haystack = [
        "Victoria Zimmerman Peter Sandoval Joshua Miles David Morris Nicholas Cohen Landon Valdez Harriet Thornton Loretta Torres Alexander Mills Celia Wheeler Lucile Guzman Logan",
        "Elmer Abbott Nellie Baldwin Christopher Terry Dora Fitzgerald Nannie Barker Marion Lawrence Willie Chambers Gabriel Hart Bradley Schultz Mabel Crawford Cecilia Aguilar",
        "Addie Little Maurice Johnston Travis Turner Leah French Mamie Houston Francis Cole Owen Walton Vincent McDonald Wesley Tucker Sue Hunt Gilbert Murphy Esther Lloyd Eula ",
        "Nell Lucas Ella Dawson Earl Collins Paul Copeland Adele Hughes Allie Salazar Bertie Roberts Duane Douglas Jason Ross Daisy Cruz Richard Rogers Gilbert Griffith Alma Haynes",
        "Glen Watkins Anne Nichols Mitchell Carroll Rosetta Sanchez Abbie Morton Fannie Goodwin Clayton Potter Millie Quinn Eliza Miller Mark Rogers Jennie Klein Leila Peterson"
    ];

    var needles_not_in_haystack = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem"
    ];

    describe(algorithm_name, function() {
        it("should work", function(){
            console.time(algorithm_name);
            needles_in_haystack.forEach(function(needle){
                expect(algorithm(needle.split(""), haystack)).toBe(true);
            });
            needles_not_in_haystack.forEach(function(needle){
                expect(algorithm(needle.split(""), haystack)).toBe(false);
            });
            console.timeEnd(algorithm_name);
        });
    });
});