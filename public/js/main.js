$(function () {
    $('#search').on('keyup', function (e) {
        if (e.keyCode === 13) {
            var params = { symbol: $(this).val() };
            $.get('/endpoint', params, function (data) {
                var template = new EJS({url: '../public/js/template.ejs'})
                template.update('stock-table', data);
            });
            $(this).val('');
        };
    });

    $(document).on('DOMNodeInserted', function(e) {
        if (e.target.id == 'table-element') {
           $('form').css('display', 'block');
        }
    });

    $('form').on('submit', function (e) {
        e.preventDefault();
        var noOfShares = $('input[name="shares"]').val();
        var purchaseData = {
            name: $('#name').html().trim(),
            symbol: $('#symbol').html().trim(),
            priceBought: $('#lastPrice').html().trim(),
            noOfShares: noOfShares
        };
        
        // handle what happens on success/failure here!! 
        $.post('/stockdata', purchaseData, function (response) {
            console.log(response);
        });

        $('input[name="shares"]').val('')

    });

});
