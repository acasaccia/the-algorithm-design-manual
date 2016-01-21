#include <string>
#include <map>
#include <iostream>
#include <istream>
#include <ostream>
#include <iterator>
#include <vector>
#include <cstdlib>

long long find (const std::string& string, const std::string& substring, size_t pos = 0) {
	size_t string_length = string.length();
	size_t substring_length = substring.length();
	bool match = false;
	for (size_t i=pos; i<string_length-substring_length+1; i++) {
		for (size_t j=0; j<substring_length; j++) {
			if (string.at(i+j) != substring.at(j)) {
				break;
			} else {
				if (j == substring_length-1) {
					match = true;
					break;
				}
			}
		}
		if (match) {
			return i;
		}
	}
	return -1;
}

int main(int argc, char **argv) {
	std::vector<std::string> args(argv, argv + argc);
	size_t args_size = args.size();
	size_t position = 0;

	if (args_size < 2) {
		std::cout << std::endl << "Usage: \e[1mnaive_search substring [position]\e[0m" << std::endl;
		std::cout << "Searches standard input for \e[1msubstring\e[0m, optionally starting at \e[1mposition\e[0m index." << std::endl;
		std::cout << "Returns index of \e[1msubstring\e[0m occurrence or -1 if not found." << std::endl;
		exit(EXIT_FAILURE);
	}

	if (args_size > 2) {
		position = std::atoi(args[2].c_str());
	}

	// don't skip the whitespace while reading
	std::cin >> std::noskipws;

	// use stream iterators to copy the stream to a string
	std::istream_iterator<char> it(std::cin);
	std::istream_iterator<char> end;
	std::string string(it, end);

	std::cout << find(string, args[1], position) << std::endl;
}
