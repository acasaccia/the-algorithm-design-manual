#include <string>
#include <map>
#include <iostream>
#define ALPHABET_SIZE 127
#define DEBUG 0

#include "RabinKarpSearch.h"

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

size_t RabinKarp::find (const std::string& string, const std::string& substring, size_t pos) {
	size_t string_length = string.length();
	size_t substring_length = substring.length();
	#if DEBUG
	std::cout << "Rabin-Karp" << std::endl;
	#endif
	unsigned long hash = rabin_karp(substring);
	unsigned long candidate_hash = rabin_karp(string, pos, pos+substring_length);
	if (candidate_hash == hash) {
		return true;
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
			return true;
		}
	}
	return false;
}
