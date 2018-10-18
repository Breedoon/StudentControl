function id_search(user_id) { // TODO: validity of id
    $.ajax({
        url: Flask.url_for('search'),
        data: {"user_id": user_id},
        type: "POST",
        success: function (data) {
            console.log(data);
            $('#inner_container').html(data);
        }

    })
}

function name_search(first, last) { // TODO: validity of name
    $.ajax({
        url: Flask.url_for('search'),
        data: {"first_name": first, 'last_name': last},
        type: "POST",
        success: function (data) {
            $('#inner_container').html(data);

        }
    })
}