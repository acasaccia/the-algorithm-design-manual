#include <string>
#include <map>
#include <cmath>
#include <iostream>
#define ALPHABET_SIZE 127
#define DEBUG 1

#include "RabinKarpSearch.h"

unsigned long pow(size_t exponent) {
	unsigned long result;
	static std::map<size_t, unsigned long> cache;
	std::map<size_t, unsigned long>::iterator it = cache.find(exponent);
	if (it != cache.end()) {
		result = it->second;
	} else {
		result = std::pow(ALPHABET_SIZE, exponent);
		cache.insert(std::make_pair<size_t, unsigned long>(exponent, result));
	}
	return result;
}

unsigned long rabin_karp(const std::string& string, size_t from = 0, size_t to = 0) {
	#if DEBUG
	std::cout << __PRETTY_FUNCTION__;
	#endif
	if (to == 0) {
		to = string.length();
	}
	unsigned long hash = 0;
	for (size_t i=from; i<to; i++) {
		#if DEBUG
		std::cout << string.at(i);
		#endif
		hash += pow(ALPHABET_SIZE, i-from) * string[i];
	}
	#if DEBUG
	std::cout << "->" << hash << std::endl;
	#endif
	return hash;
}

unsigned long rabin_karp_incremental(const std::string& string, size_t from = 0, size_t to = 0, unsigned long previous_value = 0) {
	#if DEBUG
	std::cout << __PRETTY_FUNCTION__;
	#endif
	unsigned long hash = previous_value;
	for (size_t i=from; i<to; i++) {
		#if DEBUG
		std::cout << string.at(i);
		#endif
	}
	hash = (hash - string[from-1]) / ALPHABET_SIZE + string[to-1] * pow(ALPHABET_SIZE, to-from-1);
	#if DEBUG
	std::cout << "->" << hash << std::endl;
	#endif
	return hash;
}

size_t RabinKarp::find (const std::string& string, const std::string& substring, size_t pos) {
	size_t string_length = string.length();
	size_t substring_length = substring.length();
	unsigned long hash = rabin_karp(substring);
	unsigned long candidate_hash = rabin_karp(string, pos, pos+substring_length);
	if (candidate_hash == hash) {
		return true;
	}
	for (size_t i=pos+1; i<string_length-substring_length+1; i++) {
		candidate_hash = rabin_karp_incremental(string, i, i+substring_length, candidate_hash);
		if (candidate_hash == hash) {
			return true;
		}
	}
	return false;
}
