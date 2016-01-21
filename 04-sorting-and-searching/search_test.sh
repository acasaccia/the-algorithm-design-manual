#!/bin/bash
echo ""
echo "Looking for [inferno] in divina_commedia.txt"
echo ""
echo "Rabin-Karp"
time ./rabin-karp inferno < input/divina_commedia.txt
echo ""
echo "Naive"
time ./naive inferno < input/divina_commedia.txt
echo "Looking for [Charlotte Pittman] in haystack.txt"
echo ""
echo "Rabin-Karp"
time ./rabin-karp "Charlotte Pittman" < input/haystack.txt
echo ""
echo "Naive"
time ./naive "Charlotte Pittman" < input/haystack.txt
echo ""
echo "Looking for [Andrea Casaccia] in haystack.txt"
echo ""
echo "Rabin-Karp"
time ./rabin-karp "Andrea Casaccia" < input/haystack.txt
echo ""
echo "Naive"
time ./naive "Andrea Casaccia" < input/haystack.txt
echo ""
echo "Looking for [11111111111111111111111111111110111111111111111111111111111111101111111111111111111111111111111011111111111111111111111111111111] in engineered_haystack.txt"
echo ""
echo "Rabin-Karp"
time ./rabin-karp 11111111111111111111111111111110111111111111111111111111111111101111111111111111111111111111111011111111111111111111111111111111 < input/engineered_haystack.txt
echo ""
echo "Naive"
time ./naive 11111111111111111111111111111110111111111111111111111111111111101111111111111111111111111111111011111111111111111111111111111111 < input/engineered_haystack.txt