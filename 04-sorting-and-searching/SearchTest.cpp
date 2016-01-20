#include <iostream>
#include <string>
#include <fstream>
#include <streambuf>

#include "NaiveSearch.h"
#include "RabinKarpSearch.h"

int main() {
	std::ifstream t("input/smaller_haystack.txt");

	std::string string((std::istreambuf_iterator<char>(t)), std::istreambuf_iterator<char>());

	std::string substring("Anne Evans Janie Walters Leah Moreno Devin Rios Linnie Gross Ethel Colon Margaret Holloway Nellie Castro Marian Hogan Julia Rhodes Maurice Conner Mario Cunningham James Alvarez Bessie Morales");
	std::string other_substring("Anne Evans Janie Walters Leah Moreno Devin Rios Linnie Gross Ethel Colon Margaret Holloway Nellie Castro Marian Hogan Julia Rhodes Maurice Conner Mario Cunningham James Alvarez Bessie Moralez");

	std::cout << (RabinKarp::find(string, substring) ? "" : "not ") << "found" << std::endl;
	std::cout << (RabinKarp::find(string, other_substring) ? "" : "not ") << "found" << std::endl;

	std::cout << (Naive::find(string, substring) ? "" : "not ") << "found" << std::endl;
	std::cout << (Naive::find(string, other_substring) ? "" : "not ") << "found" << std::endl;
}
