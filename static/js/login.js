(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    var user_id = null, password = null;
    $('.validate-form').submit(function (e) {
        e.preventDefault();
    });
    $('.validate-form').on('submit', function () {
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (check) {
            $.ajax({
                url: Flask.url_for('login'),
                data: {"user_id": user_id, "password": password},
                type: "POST",
                success: function (data) {
                    window.location = data;
                }
            })
        }
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'text' || $(input).attr('user_id') == 'email') {
            user_id = $(input).val().trim();
            if ($(input).val().trim().match(/^[0-9]{7}$/) == null) {
                return false;
            }
        }
        else {
            password = $(input).val().trim();
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


})(jQuery);