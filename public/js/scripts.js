$(document).ready(function () {
    $('#get_resp').click(function () {
        let currencyId = +$('#currency_list').val();

        $.ajax({
            url: `/api/metadata/${currencyId}/`,
            success: function (data) {
                var list = `<tr id="row_${currencyId}">
                <td>${data.result.name}</td>
                <td><a href="${data.result.urls.website}">Link</a></td>
                <td>${data.result.description}</td>
                <td><img src="${data.result.logo}" width="50" height="50" alt="${data.result.name}"></td>`;
                $.ajax({
                    url: `/api/quotes/${currencyId}/`,
                    success: function (data) {
                        list +=`<td>${data.result.quote.USD.percent_change_24h}</td></tr>`;
                        $('#tbody').append(list);
                    }
                });
            }
        });


    });
});