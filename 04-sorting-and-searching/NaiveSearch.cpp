#include <string>
#include <iostream>

size_t find (const std::string& string, const std::string& substring, size_t pos = 0) {
	size_t string_length = string.length();
	size_t substring_length = substring.length();
	bool match = false;
	for (int i=0; i<string_length-substring_length+1; i++) {
		for (int j=0; j<substring_length; j++) {
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