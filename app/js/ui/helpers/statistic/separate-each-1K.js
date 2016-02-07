define(
    'statistic/separete-each-1K',
    function() {
        var separateEach1K = function(number, separator) {
            var output = '',
                numbersLength,
                defaultSeparator = ',',
                cnt,
                numberAsString;

            if (parseInt(number)) {
                numberAsString = number.toString();
                separator = separator || defaultSeparator;
                numberAsString = numberAsString.replace(/[^0-9]/g, ""); // remove all chars including spaces, except digits.
                numbersLength = numberAsString.length;

                for (var i = numbersLength - 1; i >= 0; i--) {
                    output = numberAsString.charAt(i) + output;
                    cnt = numbersLength - i;

                    if (cnt % 3 === 0 && i > 0) {
                        output = separator + output;
                    }
                }
            }
            else {
                output = number;
            }

            return output;
        };

        separateEach1K.moduleName = 'separeteEach1K';
        separateEach1K.toExecute = false;

        return separateEach1K;
    }
);