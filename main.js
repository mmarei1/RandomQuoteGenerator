$(document).ready(function () {

    var quote;
    var author;
    function getNewQuote() {
        console.log('begin AJAX API Request');
        $.ajax({
            url: 'http://quotes.stormconsultancy.co.uk/random.json',
            dataType: 'json',
            success: function (response) {
                console.log('success', response);
                quote = response.quote;
                author = response.author;
                //var comb = '"' + quote + '" -' + author + '.';
                $('#quote').text('"'+quote+'"');
                if (response.author) {
                    $('#author').text('- ' + response.author);
                } else {
                    $('#author').text('- unkown');
                }
            },
            failure: function (response) {
                console.log('Could not retrieve desired quote');
            }
        });
    }

    getNewQuote();

    $('#getQ').on('click', function (e) {
        e.preventDefault();
        getNewQuote();
    });

    $('#tweet').on('click', function (e) {
        e.preventDefault();
       // Only post a full quote if it's shorter than 140-author.length
        if (quote.length > 140-author.length) {
            quote = quote.slice(0, 130 - (author.length));
        }
        quote = '"' + quote + '..." -' + author + '.';
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote));
    });

});
