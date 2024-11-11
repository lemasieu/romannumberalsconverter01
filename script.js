function convertToRoman() {
    let num = document.getElementById('arabicNumber').value;
    document.getElementById('romanNumber').value = arabicToRoman(num);
}

function convertToArabic() {
    let roman = document.getElementById('romanNumber').value;
    document.getElementById('arabicNumber').value = romanToArabic(roman);
}

function arabicToRoman(num) {
    if (num <= 3999) {
        return convertBasicToRoman(num); // Use standard notation with M
    } else {
        // Use vinculum notation for numbers above 3999
        let thousands = Math.floor(num / 1000);
        let remainder = num % 1000;

        let result = convertBasicToRoman(thousands) + '\u0305'; // Add vinculum (overline)
        
        // Process remainder
        if (remainder > 0) {
            result += convertBasicToRoman(remainder);
        }
        return result;
    }
}

function convertBasicToRoman(num) {
    const romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];

    let result = '';
    for (let [roman, value] of romanNumerals) {
        while (num >= value) {
            result += roman;
            num -= value;
        }
    }
    return result;
}

function romanToArabic(roman) {
    const romanNumerals = {
        "I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000
    };
    
    let result = 0;
    let multiplier = 1;

    for (let i = 0; i < roman.length; i++) {
        let current = roman[i];
        
        if (current === '\u0305') {
            // If vinculum is found, multiply the preceding value by 1,000
            multiplier = 1000;
            continue;
        }

        let currentValue = romanNumerals[current] || 0;
        let nextValue = romanNumerals[roman[i + 1]] || 0;

        if (currentValue < nextValue) {
            result -= currentValue * multiplier;
        } else {
            result += currentValue * multiplier;
        }

        // Reset multiplier after use
        multiplier = 1;
    }
    return result;
}

function clearFields() {
    document.getElementById('arabicNumber').value = '';
    document.getElementById('romanNumber').value = '';
}
