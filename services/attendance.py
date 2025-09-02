numbers=(2 3 4 5 6 7 8 9 10 11 12 13 14 15)

is_prime() {
    local num=$1
    if (( num <= 1 )); then
        return 1
    fi
    for (( i=2; i*i<=num; i++ )); do
        if (( num % i == 0 )); then
            return 1
        fi
    done
    return 0
}

for num in "${numbers[@]}"; do
    if is_prime "$num"; then
        echo "$num"
    fi
done

#even
numbers=(2 3 4 5 6 7 8 9 10 11 12 13 14 15)

for num in "${numbers[@]}"; do
    if (( num % 2 == 0 )); then
        echo "$num"
    fi
done

#odd
numbers=(2 3 4 5 6 7 8 9 10 11 12 13 14 15)

for num in "${numbers[@]}"; do
    if (( num % 2 != 0 )); then
        echo "$num"
    fi
done

#square_numbers
numbers=(2 3 4 5 6 7 8 9 10)

for num in "${numbers[@]}"; do
    echo $(( num * num ))
done

#positive_negative
echo "Enter a number:"
read num

if ! [[ $num =~ ^-?[0-9]+$ ]]; then
    echo "Invalid input entered!"
elif (( num > 0 )); then
    echo "The number is Positive."
elif (( num == 0 )); then
    echo "The number is Zero."
else
    echo "The number is Negative."
fi
