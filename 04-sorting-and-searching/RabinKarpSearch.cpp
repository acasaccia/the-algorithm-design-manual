#include <string>
#include <cmath>
#include <iostream>
#define ALPHABET_SIZE 127

unsigned long rabin_karp(const std::string& string, size_t from = 0, size_t to = 0) {
	if (to == 0) {
		to = string.length();
	}
	unsigned long hash = 0;
	for (int i=from; i<to; i++) {
		hash += std::pow(ALPHABET_SIZE, i) * string[i];
	}
	return hash;
}

size_t find (const std::string& string, const std::string& substring, size_t pos = 0) {
	size_t string_length = string.length();
	size_t substring_length = substring.length();
	bool match = false;
	unsigned long hash = rabin_karp(substring);
	std::cout << hash << std::endl;
	for (int i=0; i<string_length-substring_length+1; i++) {
		std::cout << string.at(i) << string.at(i+1) << string.at(i+2) << std::endl;
		std::cout << rabin_karp(string, i, i+substring_length) << std::endl;
		if (rabin_karp(string, i, i+substring_length) == hash) {
			return true;
		}
	}
	return false;
}