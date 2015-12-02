/*
 * australian-voting.cpp
 */

#include <iostream>
#include <sstream>

int main( int argc, char * argv[] )
{

	int cases, candidates_number;
	char candidates[20][80];
	int votes[20][1000];
	int votes_count[20];

	std::string line;

	std::cin >> cases;
	std::cin.get();
	std::cin.get();

	for (int i=0; i<cases; i++) {

		std::cin >> candidates_number;
		std::cin.get();

		for (int j=0; j<candidates_number; j++) {
			std::cin.getline(candidates[j], sizeof(candidates[j]), '\n');
		}

		int votes_number = 0;

		while (std::getline(std::cin, line)) {
			if (line.empty()) {
				break;
			}
			std::cout << line << std::endl;
			votes_number++;
		}

		for (int j=0; j<20; j++) {
			votes_count[j] = 0;
		}

		for (int k=0; k<candidates_number; k++) {
			for (int j=0; j<votes_number; j++) {
				votes_count[votes[k][j]-1]++;
			}
		}

	}
    return 0;
}
