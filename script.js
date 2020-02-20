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
        $('#result')[0].innerText = "$" + input.amount + " " + input.from + " is $" + input.amount + " " + input.to
    }
    else {
        $.getJSON("https://api.exchangerate-api.com/v4/latest/" + input.from, function (json) {
            $('#result')[0].innerText = "$" + input.amount + " " + input.from + " is $" +
                (input.amount * json.rates[input.to]).toFixed(2) + " " + input.to
        });
    }
});

$('#getAll').click(function (event) {
    event.preventDefault();
    let input = getInputs();

    $.getJSON("https://api.exchangerate-api.com/v4/latest/" + input.from, function (json) {
        $('#result')[0].innerText = ""
        Object.keys(json.rates).forEach(function (key, index) {
            if (index != 0) {
                $('#result')[0].innerText += "$" + input.amount + " " + input.from + " is $" +
                    (input.amount * json.rates[key]).toFixed(2) + " " + key + "\n"
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
