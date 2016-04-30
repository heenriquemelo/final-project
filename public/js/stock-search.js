$(function () {
    $('#search').on('keyup', function (e) {
        if (e.keyCode === 13) {
            var params = { symbol: $(this).val() };
            $.get('/stockdata', params, function (data) {
                if (data.hasOwnProperty('message')) {
                    alert(data.message);
                    $('#stock-table').empty();
                    $('#shares-form').css('display', 'none');
                } else {
                    var template = new EJS({url: '../public/js/stock-template.ejs'});
                    template.update('stock-table', data);
                }
            });
            $(this).val('');
        };
    });

    $(document).on('DOMNodeInserted', function(e) {
        if (e.target.id === 'table-element') {
           $('#shares-form').css('display', 'block');
           $('input[name="shares"]').focus();
        }
    });

    $('#shares-form').on('submit', function (e) {
        e.preventDefault();
        if (Number($('input[name="shares"]').val())) {
            var noOfShares = $('input[name="shares"]').val();
            var purchaseData = {
                name: $('#name').html().trim(),
                symbol: $('#symbol').html().trim(),
                priceBought: $('#lastPrice').html().trim(),
                noOfShares: noOfShares
            };
        
            // handle what happens on success/failure here!! 
            $.post('/stockbought', purchaseData, function (response) {
                alert(response);
            });
        } else {
            alert('You must type a number!');
        }

        $('input[name="shares"]').val('')

    });

});
