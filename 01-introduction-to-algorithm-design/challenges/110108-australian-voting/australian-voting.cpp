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

int find_winners(int candidates_count, int remaining_candidates_count, int votes_count, int candidate_votes[20], int subroutine_results[20]) {
	int max_votes = 0;
	int winners_count = 0;
	
	for (int k=0; k<candidates_count; k++) {
		if (candidate_votes[k] > max_votes) {
			max_votes = candidate_votes[k];
			subroutine_results[0] = k;
			winners_count = 1;
		} else if (candidate_votes[k] == max_votes) {
			subroutine_results[(++winners_count-1)] = k;
		}
	}
	
	if (winners_count == remaining_candidates_count || ( winners_count == 1 && (double) max_votes / votes_count > 0.5 ) ) {
		return winners_count;
	}
	
	return 0;
}

int find_losers(int candidates_count, int votes_count, int candidate_votes[20], int subroutine_results[20], bool losers[20]) {
	int min_votes = 1001;
	int losers_count = 0;
	
	for (int k=0; k<candidates_count; k++) {
		if (!losers[k]) {
			if (candidate_votes[k] < min_votes) {
				min_votes = candidate_votes[k];
				subroutine_results[0] = k;
				losers_count = 1;
			} else if (candidate_votes[k] == min_votes) {
				subroutine_results[(++losers_count-1)] = k;
			}
		}
	}
	
	for (int i=0; i<losers_count; i++) {
		losers[subroutine_results[i]] = true;
	}
	
	return losers_count;
}

void eliminate_loser(int remaining_candidates_count, int votes_count, int votes[][1000], int loser) {
	for (int i = 0; i<remaining_candidates_count; i++) {
		for (int j = 0; j<votes_count; j++) {
			if (votes[i][j] == loser + 1) {
				for (int l = i; l<remaining_candidates_count; l++) {
					votes[l][j] = votes[l + 1][j];
				}
			}
		}
	}
}

int main( int argc, char * argv[] ) {
	int cases_count;
	int candidates_count;
	int remaining_candidates_count;
	int votes_count;
	char candidates[20][80];
	int votes[20][1000];
	int candidate_votes[20];
	int subroutine_results[20];
	bool losers[20];
	int winners_count;
	int losers_count;
	
	std::cin >> cases_count;
	std::cin.get();
	std::cin.get();
	
	for (int i=0; i<cases_count; i++) {
 		parse_case(candidates_count, votes_count, candidates, votes);
		reset_losers(losers);
		remaining_candidates_count = candidates_count;
		winners_count = 0;
		while (!winners_count) {
			count_votes(candidates_count, votes_count, candidate_votes, votes);
			winners_count = find_winners(candidates_count, remaining_candidates_count, votes_count, candidate_votes, subroutine_results);
			if (winners_count == 0) {
				losers_count = find_losers(candidates_count, votes_count, candidate_votes, subroutine_results, losers);
				for (int k = 0; k<losers_count; k++) {
					eliminate_loser(remaining_candidates_count, votes_count, votes, subroutine_results[k]);
					remaining_candidates_count--;
				}
			}
		}
		for (int j=0; j<winners_count; j++) {
			std::cout << candidates[subroutine_results[j]] << std::endl;
		}
		if (i+1 < cases_count) {
			std::cout << std::endl;
		}
	}
	
    return 0;
}
