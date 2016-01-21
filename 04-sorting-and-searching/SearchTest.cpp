#include <iostream>
#include <string>
#include <fstream>
#include <streambuf>
#include <ctime>
#include <vector>

#include "NaiveSearch.h"
#include "RabinKarpSearch.h"

int main() {

	std::clock_t begin, end;
	double elapsed_secs;

	begin = clock();
	std::ifstream t("../input/divina_commedia.txt");
	std::string string((std::istreambuf_iterator<char>(t)), std::istreambuf_iterator<char>());
	end = clock();
	elapsed_secs = double(end - begin) / CLOCKS_PER_SEC;
	std::cout << std::endl << "Parsed divina_commedia.txt [Length: " << string.length() << "] [Elapsed: " << elapsed_secs << "\"]" << std::endl << std::endl;

	const char* right[] = {
		"Ne la profonda e chiara sussistenza",
		"ne la sua terra fia di doppia vesta",
		"questa natura al suo fattore unita",
		"create a trasvolar per quella altezza",
		"l'amor che move il sole e l'altre stelle",
		"sussistenza",
		"stelle",
		"trasvolar",
		"amor",
		"sole"

	};
	const char* wrong[] = {
		"Ne la profonda e scura sussistenza",
		"ne la sua acqua fia di doppia vesta",
		"questa natura al suo divisore unita",
		"create a trasvolar per quella bassezza",
		"l'amor che move la luna e l'altre stelle",
		"sussistenzialismo",
		"stellerette",
		"trasvolarissimo",
		"amoruccio",
		"soleluna"
	};

	std::vector<std::string> right_sentences(right, right+10);
	std::vector<std::string> wrong_sentences(wrong, wrong+10);

//	std::string string("trololol");
//	std::string substring("lol");
//	std::string other_substring("asd");

	begin = clock();
	for(std::vector<std::string>::const_iterator i = right_sentences.begin(); i != right_sentences.end(); ++i) {
		std::cout << *i << " -> " << (RabinKarp::find(string, *i) ? "" : "not ") << "found" << std::endl;
	}
	for(std::vector<std::string>::const_iterator i = wrong_sentences.begin(); i != wrong_sentences.end(); ++i) {
		std::cout << *i << " -> " << (RabinKarp::find(string, *i) ? "" : "not ") << "found" << std::endl;
	}
	end = clock();
	elapsed_secs = double(end - begin) / CLOCKS_PER_SEC;
	std::cout << "Rabin-Karp search [Elapsed: " << elapsed_secs << "\"]" << std::endl << std::endl;

	begin = clock();
	for(std::vector<std::string>::const_iterator i = right_sentences.begin(); i != right_sentences.end(); ++i) {
		std::cout << *i << " -> " << (Naive::find(string, *i) ? "" : "not ") << "found" << std::endl;
	}
	for(std::vector<std::string>::const_iterator i = wrong_sentences.begin(); i != wrong_sentences.end(); ++i) {
		std::cout << *i << " -> " << (Naive::find(string, *i) ? "" : "not ") << "found" << std::endl;
	}
	end = clock();
	elapsed_secs = double(end - begin) / CLOCKS_PER_SEC;
	std::cout << "Naive search [Elapsed: " << elapsed_secs << "\"]" << std::endl;
}
