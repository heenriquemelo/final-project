$(function () {
    $('#symbol').on('keyup', function (e) {
        if (e.keyCode === 13) {
            var params = { symbol: $(this).val() };
            $.get('/endpoint', params, function (data) {
                console.log(data);
                var template = new EJS({url: '../public/js/template.ejs'})
                template.update('stock-table', data);
            });
            $(this).val('');
        };
    });
});
