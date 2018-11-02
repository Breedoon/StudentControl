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

function name_submit(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode === '13') {
        name_search($('#first_name').val(), $('#last_name').val());
        return false;
    }
}

function id_submit(e) {
    console.log("KEYUP");
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode === '13') {
        id_search($('#student_id').val());
        return false;
    }
}

(function ($) {
    $('#first_name').keyup(name_submit);
    $('#last_name').keyup(name_submit);
    $('#student_id').keyup(id_submit);
    $("#search_id").on('click',(function () {
        id_search($('#student_id').val());
    }));
    $("#search_name").click(function () {
        name_search($('#first_name').val(), $('#last_name').val());
    });
})(jQuery);