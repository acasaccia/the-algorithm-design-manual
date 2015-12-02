/*
 * australian-voting.cpp
 */

#include <iostream>
#include <string>
#include <sstream>

void parse_case(int& candidates_count, int& votes_count, char* candidates, int** votes) {
	
	std::string line;
	std::stringstream ss;
	
	std::cin >> candidates_count;
	std::cin.get();

	for (int j=0; j<candidates_count; j++) {
		std::cin.getline(candidates[j], sizeof(candidates[j]), '\n');
	}

	votes_count = 0;
	
	while (std::getline(std::cin, line)) {
		if (line.empty()) {
			break;
		}
		ss.str(line);
		for (int k=0; k<candidates_count; k++) {
			ss >> votes[k][votes_count];
		}
		std::cin.get();
		votes_count++;
	}
	
}

void count_votes(int candidates_count, int votes_count, int* candidate_votes, int** votes) {
	
	for (int j=0; j<candidates_count; j++) {
		candidate_votes[j] = 0;
	}
	
	for (int k=0; k<candidates_count; k++) {
		for (int j=0; j<votes_count; j++) {
			candidate_votes[votes[k][j]-1]++;
		}
	}
}

int find_winners() {
	
}

int find_losers() {
	
}

int eliminate_losers() {
	
}

int main( int argc, char * argv[] )
{
	int cases_count, candidates_count, votes_count;
	char candidates[20][80];
	int votes[20][1000];
	int candidate_votes[20];
	int results[20];

	std::cin >> cases_count;
	std::cin.get();
	std::cin.get();

	for (int i=0; i<cases_count; i++) {

		parse_case(&candidates_count, &votes_count, candidates, votes);
		
		
		count_votes(candidates_count, votes_count, candidate_votes, votes);
		if (winners = find_winners(candidate_votes, results) > 0) {
			for (int j=0; j<winners; j++) {
				std::cout << candidates[results[j]] << std::endl;
			}
			std::cout << std::endl;
		} else {
			losers = find_losers(candidate_votes, results);
			eliminate_losers(votes, results)
		}
		
		for (int k=0; k<candidates_count; k++) {
			if ((double) votes_count[k] / votes_count > 0.5) {
				std::cout << candidates[k];
				return 0;
			} else {
				
			}
		}

	}
    return 0;
}
