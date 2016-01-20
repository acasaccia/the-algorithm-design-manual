#include <iostream>
//#include "NaiveSearch.cpp"
#include "RabinKarpSearch.cpp"

int main() {
	std::string string("trololol");
	std::string other_string("roflcopter");
	std::string substring("lol");
	std::cout << (find(string, substring) ? "" : "not ") << "found" << std::endl;
	std::cout << (find(other_string, substring) ? "" : "not ") << "found" << std::endl;
}