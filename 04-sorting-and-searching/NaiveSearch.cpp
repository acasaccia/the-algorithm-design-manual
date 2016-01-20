#include <string>
#include <iostream>

#include "NaiveSearch.h"

size_t Naive::find (const std::string& string, const std::string& substring, size_t pos) {
	size_t string_length = string.length();
	size_t substring_length = substring.length();
	bool match = false;
	for (size_t i=0; i<string_length-substring_length+1; i++) {
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
			return true;
		}
	}
	return false;
}
