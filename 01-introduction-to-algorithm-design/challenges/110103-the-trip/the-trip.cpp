/*
 * the-trip.cpp
 */

#include <iostream>
#include <iomanip>
#include <cmath>

int main( int argc, char * argv[] )
{
	int students_number, transaction_cents;
	double expenses[1000], total, average, given_change, taken_change, minimum_change;
	while (std::cin >> students_number) {
		if (students_number == 0) {
			return 0;
		}
		total = 0;
		for (int i=0; i<students_number; i++) {
			std::cin >> expenses[i];
			total += expenses[i];
		}
		average = total / students_number;
		given_change = 0;
		taken_change = 0;
		for (int i=0; i<students_number; i++) {
			if (average > expenses[i]) {
				given_change += std::floor((average - expenses[i]) * 100) / 100;
			}
			if (average < expenses[i]) {
				taken_change += std::floor((expenses[i] - average) * 100) / 100;
			}
		}
		minimum_change = given_change > taken_change ? given_change : taken_change;
		std::cout << "$" << std::setprecision(2) << std::fixed << minimum_change << std::endl;
	}
    return 0;
}
