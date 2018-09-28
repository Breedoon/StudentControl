var prev_doc = "";

function id_search(user_id) { // TODO: validity of id
    $.ajax({
        url: Flask.url_for('search'),
        data: {"user_id": user_id},
        type: "POST",
        success: function (data) {
            prev_doc = $('#inner_container');
        }

    })
}

function name_search(first, last) { // TODO: validity of name
    $.ajax({
        url: Flask.url_for('search'),
        data: {"first_name": first, 'last_name': last},
        type: "POST",
        success: function (data) {
            window.location = data;
        }
    })
}