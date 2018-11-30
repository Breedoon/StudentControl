function profile(id) {
    window.location.href = Flask.url_for('profile', {'user_id': id});
}

icons = {'success': 'ti-check', 'danger': 'ti-na'};

// function get_position(n) { //TODO
//     var position = "Student"
//     if permission_level is 1:
//         position = 'Teacher'
//     elif permission_level is 2:
//         position = "Admin"
//     return position
// }

function notify(msg, mood) {
    $.notify({
        icon: icons[mood],
        message: msg

    }, {
        type: mood,
        timer: 3000,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
}

function change_profile(old_id, new_id, first, last, position) {
    $.ajax({
        url: Flask.url_for('profile'),
        data: {"old_user_id": old_id, "new_user_id": new_id, "first_name": first, 'last_name': last, 'position': position},
        type: "POST",
        success: function (data) {
            if (data === 'success') {
                if (parseInt(old_id) !== parseInt(new_id)) {
                    window.location = Flask.url_for('profile', {'id': new_id})
                } else{
                    $('#name').html(first + " " + last);
                    $('#position_label').html(first + " " + last);
                }
                notify("Profile updated", 'success');
            } else {
                notify("<b>Error</b> — cannot update the profile", 'danger');
            }
        }
    })
}


function update_points(add_points, set_assignment, id) {
    $.ajax({
        url: Flask.url_for('points'),
        data: {"to_user": id, "added_points": add_points, "assignment": set_assignment},
        type: "POST",
        success: function (data) {
            if (data === 'success') {
                notify("Profile updated", 'success');
                $('#assignment_label').html(first + " " + last); //TODO

            } else {
                notify("<b>Error</b> — cannot update points or assignment", 'danger');
            }
        }
    })
}