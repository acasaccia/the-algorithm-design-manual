/*
 * collatz.cpp
 */

#include <iostream>

int sequence(int n, int length) {
    length++;
    if (n==1) {
        return length;
    }
    if (n%2==0) {
        return sequence(n/2, length);
    } else {
        return sequence(n*3+1, length);
    }
}

int max_sequence(int i, int j) {
    int max_sequence,
		tmp_sequence,
		from,
		to;
    if (i > j) {
    	from = j;
    	to = i;
    } else {
    	from = i;
    	to = j;
    }
    max_sequence = sequence(from, 0);
    for (int k=from+1; k<=to; k++) {
        tmp_sequence = sequence(k, 0);
        max_sequence = tmp_sequence > max_sequence ? tmp_sequence : max_sequence;
    }
    return max_sequence;
}

int main( int argc, char * argv[] )
{
	int a, b;
	while (std::cin >> a >> b) {
		std::cout << a << " " << b << " " << max_sequence(a, b) << std::endl;
	}
    return 0;
}
