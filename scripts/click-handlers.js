$(document).ready(function() {

    //Landing Page Display
    // $("#login-page-buttons").click(function() {
    //     // $("#logout-button").show();
    //     $("#login-button-text").hide();
    //     $('#login-complete').show();
    //   });
    // $("#login-page-buttons").click(function() {
    //     // $("#logout-button").show();
    //     $("#login-button-text").hide();
    //     $('#login-complete').show();
    //   });

    ////////////Login / Register Helper Fucntions

    var handleError = function handleError(error, data, optional_alert) {
      if (error) {
        console.error(error);
        if(optional_alert){
          optional_alert();
        }
        throw error;
      } else {
        console.log(data);
      }
    };

    var form2object = function(form) {
        var data = {};
        $(form).find('input').each(function(index, element) {
            var type = $(this).attr('type');
            if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
                data[$(this).attr('name')] = $(this).val();
            }
        });
        return data;
    };

    var wrap = function wrap(root, formData) {
        var wrapper = {};
        wrapper[root] = formData;
        return wrapper;
    };

    /////////////////////Register and Login/Logout Click Handlers


    ////Register

    $('#reg-form').on('submit', function(e) {
        e.preventDefault();
        var credentials = form2object(this);
        console.log(credentials);
        bucketList_api.signup(credentials, function(err, data) {
            handleError(err, data, function() {
                console.log(err);
            });
            console.log(data);
            $('#reg-form').hide();
            // $('#login_form').css('margin', '0px auto');

        });

    });

    // Login
    $('#login').on('submit', function(e) {
        var credentials = wrap('credentials', form2object(this));
        buckList_api.login(credentials, function(err, data) {
            handleError(err, data, function() {
                alert("Invalid credentials");
            });
            token = data.user.token;
            user_id = data.user.id;
            $('.modal-dialog').hide();
            $('#spacer').removeClass('col-xs-3');
            $('#logout').show();
            $("#profile_buttons_display").show();
        });
        e.preventDefault();
    });

    // Logout
    $('#logout').on('click', function(e) {
        bucketList_api.logout(user_id, token, function(err, data) {
            handleError(err, data);
            console.log("logged out");
            $('.modal-dialog').show();
            $('#register_form').show();
            $("#logout, #profile_buttons_display, #profile_buttons, #profile, #profile_update, #profile_submit").hide();
            $('#pairs, #pairings-table, #sc-widget, .alarm-button, #weather_display, #genre_display').hide();
        });
        e.preventDefault();
    });


});
