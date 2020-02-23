// Fill dropdown menu on page load
$.getJSON("https://api.exchangerate-api.com/v4/latest/" + "USD", function (json) {
    let html = ""
    Object.keys(json.rates).forEach(function (key) {
        html += "<option value=\"" + key + "\">" + key + "</option>\n"
    });
    $('#currencyFrom')[0].innerHTML = html
    $('#currencyTo')[0].innerHTML = html
});

$('#submit').click(function (event) {
    event.preventDefault();
    let input = getInputs();

    if (input.from == input.to || input.amount == 0) {
        $('#result')[0].innerText = getMoneySymbol(input.from) + input.amount + " " + input.from + " = " + getMoneySymbol(input.to) + input.amount + " " + input.to
    }
    else {
        $.getJSON("https://api.exchangerate-api.com/v4/latest/" + input.from, function (json) {
            $('#result')[0].innerText = getMoneySymbol(input.from) + input.amount + " " + input.from + " = " +
                getMoneySymbol(input.to) + (input.amount * json.rates[input.to]).toFixed(2) + " " + input.to
        });
    }
});

$('#getAll').click(function (event) {
    event.preventDefault();
    let input = getInputs();

    $.getJSON("https://api.exchangerate-api.com/v4/latest/" + input.from, function (json) {
        $('#result')[0].innerText = getMoneySymbol(input.from) + input.amount + " " + input.from + " =\n\n"
        Object.keys(json.rates).forEach(function (key, index) {
            if (index != 0) {
                $('#result')[0].innerText += getMoneySymbol(key) + (input.amount * json.rates[key]).toFixed(2) + " " + key + "\n"
            }
        });
    });
});

function getInputs() {
    let from = $('#currencyFrom')[0].value
    let to = $('#currencyTo')[0].value
    let amount = $('#moneyAmount')[0].value

    if (from == "") {
        from = "USD"
    }
    if (to == "") {
        to = "USD"
    }
    if (amount == "") {
        amount = 0
    }

    return { from, to, amount }
}

var currency_symbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
    'AED': 'د.إ', // United Arab Emrites Dirham
    'BGN': 'лв', // Bulgarian Lev
    'CNY': '¥', // Chinese Renminbi
    'CZK': 'Kč', // Czech koruna
    'EGP': '£', // Egyptian Pound
    'CHF': 'Fr', // Swiss Franc
    'DKK': 'Kr. ', // Danish Krone
    'GTQ': 'Q', // Guatemalan Quetzal
    'HRK': 'kn', // Croatian Kuna
    'HUF': 'Ft', // Hungarian Forint
    'IDR': 'Rp', // Indonesian Rupiah
    'ISK': 'kr', // Icelandic Krona
    'KZT': '₸', // Kazakhstani Tenge
    'MYR': 'RM', // Malaysian Ringgit
    'NOK': 'kr', // Norwegian Krone
    'PAB': 'B/', // Panamanian Balboa
    'PEN': 'S/', // Peruvian Sol
    'PKR': 'Rs', // Pakistani Rupee
    'RON': 'lei', // Romainian Leu
    'RUB': '₽', // Russian Ruble
    'SEK': 'kr', // Swedish Krona
    'TRY': '₺', // Turkish Lira
    'ZAR': 'R', // South African Rand
};


function getMoneySymbol(code) {
    var symbol = currency_symbols[code]
    if (symbol == undefined) {
        symbol = '$'
    }
    return symbol
}
