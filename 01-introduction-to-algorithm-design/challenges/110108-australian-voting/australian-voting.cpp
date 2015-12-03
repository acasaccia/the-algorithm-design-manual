/*
 * australian-voting.cpp
 */

#include <iostream>
#include <string>
#include <sstream>

void parse_case(int &candidates_count, int &votes_count, char candidates[][80], int votes[][1000]) {
	
	std::cin >> candidates_count;
	std::cin.get();

	for (int j=0; j<candidates_count; j++) {
		std::cin.getline(candidates[j], sizeof(candidates[j]), '\n');
	}

	votes_count = 0;

	std::string line;
	while (std::getline(std::cin, line)) {
		if (line.empty()) {
			break;
		}
		std::stringstream ss(line);
		for (int k=0; k<candidates_count; k++) {
			ss >> votes[k][votes_count];
		}
		votes_count++;
	}
	
}

void reset_losers(bool losers[20]) {
	for (int k=0; k<20; k++) {
		losers[k] = false;
	}
}

void count_votes(int candidates_count, int votes_count, int candidate_votes[20], int votes[][1000]) {
	
	for (int j=0; j<candidates_count; j++) {
		candidate_votes[j] = 0;
	}
	
	for (int j=0; j<votes_count; j++) {
		candidate_votes[(votes[0][j]-1)]++;
	}
}

int find_winners(int candidates_count, int remaining_candidates_count, int votes_count, int candidate_votes[20], int results[20]) {

	int max_votes = 0;
	int winners_count = 0;

	for (int k=0; k<candidates_count; k++) {
		if (candidate_votes[k] > max_votes) {
			max_votes = candidate_votes[k];
			results[0] = k;
			winners_count = 1;
		} else if (candidate_votes[k] == max_votes) {
			results[(++winners_count-1)] = k;
		}
	}

	if (winners_count == remaining_candidates_count || ( winners_count == 1 && (double) max_votes / votes_count > 0.5 ) ) {
		return winners_count;
	}

	return 0;

}

int find_losers(int candidates_count, int votes_count, int candidate_votes[20], int results[20], bool losers[20]) {

	int min_votes = 1001;
	int losers_count = 0;

	for (int k=0; k<candidates_count; k++) {
		if (!losers[k]) {
			if (candidate_votes[k] < min_votes) {
				min_votes = candidate_votes[k];
				results[0] = k;
				losers_count = 1;
			} else if (candidate_votes[k] == min_votes) {
				results[(++losers_count-1)] = k;
			}
		}
	}

	for (int i=0; i<losers_count; i++) {
		losers[results[i]] = true;
	}

	return losers_count;
}

void eliminate_losers(int remaining_candidates_count, int votes_count, int votes[][1000], int losers_count, int results[20]) {
	for (int i=0; i<remaining_candidates_count; i++) {
		for (int j=0; j<votes_count; j++) {
			for (int k=0; k<losers_count; k++) {
				if (votes[i][j] == results[k]+1) {
					for (int l=i; l<remaining_candidates_count; l++) {
						votes[l][j] = votes[l+1][j];
					}
				}
			}
		}
	}
}

int main( int argc, char * argv[] )
{
	int cases_count;
	bool case_solved;
	int candidates_count;
	int remaining_candidates_count;
	int votes_count;
	char candidates[20][80];
	int votes[20][1000];
	int candidate_votes[20];
	int results[20];
	bool losers[20];
	int winners_count;
	int losers_count;

	std::cin >> cases_count;
	std::cin.get();
	std::cin.get();

	for (int i=0; i<cases_count; i++) {

		case_solved = false;

		parse_case(candidates_count, votes_count, candidates, votes);
		
		reset_losers(losers);

		remaining_candidates_count = candidates_count;

		while (!case_solved) {

			count_votes(candidates_count, votes_count, candidate_votes, votes);

			winners_count = find_winners(candidates_count, remaining_candidates_count, votes_count, candidate_votes, results);

			if (winners_count > 0) {

				for (int j=0; j<winners_count; j++) {
					std::cout << candidates[results[j]] << std::endl;
				}

				std::cout << std::endl;
				case_solved = true;

			} else {
				
				losers_count = find_losers(candidates_count, votes_count, candidate_votes, results, losers);
				eliminate_losers(remaining_candidates_count, votes_count, votes, losers_count, results);
				remaining_candidates_count -= losers_count;

			}

		}

	}
    return 0;
}
