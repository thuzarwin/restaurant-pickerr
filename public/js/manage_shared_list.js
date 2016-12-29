$(document).on('click', '#add_shared_list_btn', function(event) {
    if ($('#add_shared_list_input').val() == "") {
        toastr.warning('Please provide a name!');
        return;
    }

    // Get all the inputs.
    var name = $('#add_shared_list_input').val();

    $.ajax({
        url: '/db/shared_list/create',
        method: "POST",
        data: JSON.stringify({
            email: $('#nav_email').attr('title'),
            name: name,
        }),
        contentType: 'application/json',
        success: function(data) {
            if (data.status === 'error') {
                toastr.warning(data.message);
            } else {
                toastr.success(data.message);
                var items = [];
                var rowCount = $('#shared_list_table tbody tr').length;

                items.push("<tr tabindex='" + rowCount + "' class='list_table_row'>");
                items.push("<td hidden id='list_id_" + rowCount + "'>" + data.list_id + "</td>");
                items.push("<td><a href='/shared_list?list_id=" + data.list_id + "' id='list_name_" + rowCount + "'>" + name + "</a></td>");
                items.push("<td>");
                items.push("<form action='javascript:void(0);'>");
                items.push("<button type='submit' class='btn btn-outline-danger' tabindex='" + rowCount + "' id='remove_list_btn'>Remove</button>");
                items.push("</form>");
                items.push("</td>");
                items.push( "</tr> ");

                $('#shared_list_table > tbody:last-child').append(items.join('\n'));
            }
        }
    });
});

$(document).on('click', '#remove_list_btn', function(event) {
    NProgress.start();
    var index = $(this).attr('tabindex');

    $.ajax({
        url: '/db/shared_list/delete',
        method: 'POST',
        data: JSON.stringify({
            email: $('#nav_email').attr('title'),
            list_id: $('#list_id_' + index).text()
        }),
        contentType: 'application/json',
        success: function(data) {
            if (data.status == 'error') {
                toastr.warning(data.message);
            } else {
                toastr.success(data.message);
                $('.list_table_row[tabindex=' + index + ']').remove();
            }
            NProgress.done(true);
        }
    });
});