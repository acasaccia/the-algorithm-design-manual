#include <string>
#include <map>
#include <iostream>
#include <istream>
#include <ostream>
#include <iterator>
#include <vector>
#include <cstdlib>

#define ALPHABET_SIZE 127
#define DEBUG 0

unsigned long rabin_karp(const std::string& string, size_t from = 0, size_t to = 0) {
	#if DEBUG
	std::cout << __PRETTY_FUNCTION__ << std::endl;
	#endif
	if (to == 0) {
		to = string.length();
	}
	unsigned long hash = 0;
	for (size_t i=from; i<to; i++) {
		#if DEBUG
		std::cout << string.at(i);
		#endif
		hash *= ALPHABET_SIZE;
		hash += string[i];
	}
	#if DEBUG
	std::cout << "->" << hash << std::endl;
	#endif
	return hash;
}

unsigned long rabin_karp_incremental(const std::string& string, size_t from, size_t to, unsigned long previous_value, unsigned long precomputed_power_of_alpha) {
	#if DEBUG
	for (size_t i=from; i<to; i++) {
		std::cout << string.at(i);
	}
	#endif
	unsigned long hash = previous_value;
	hash -= string[from-1] * precomputed_power_of_alpha;
	hash *= ALPHABET_SIZE;
	hash += string[to-1];
	#if DEBUG
	std::cout << "->" << hash << std::endl;
	#endif
	return hash;
}

long long find(const std::string& string, const std::string& substring, size_t pos = 0) {
	size_t string_length = string.length();
	size_t substring_length = substring.length();
	#if DEBUG
	std::cout << "Rabin-Karp" << std::endl;
	#endif
	unsigned long hash = rabin_karp(substring);
	unsigned long candidate_hash = rabin_karp(string, pos, pos+substring_length);
	if (candidate_hash == hash) {
		return pos;
	}
	unsigned long precomputed_power_of_alpha = 1;
	for (size_t i=0; i<substring_length-1; i++) {
		precomputed_power_of_alpha *= ALPHABET_SIZE;
	}
	#if DEBUG
	std::cout << "Rabin-Karp incremental" << std::endl;
	#endif
	for (size_t i=pos+1; i<string_length-substring_length+1; i++) {
		candidate_hash = rabin_karp_incremental(string, i, i+substring_length, candidate_hash, precomputed_power_of_alpha);
		if (candidate_hash == hash) {
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
		std::cout << std::endl << "Usage: \e[1mrabin_karp_search substring [position]\e[0m" << std::endl;
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
