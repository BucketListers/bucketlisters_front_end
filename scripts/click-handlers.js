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
            if (optional_alert) {
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
                alert("Invalid credentials");
             });
            // $('.register').hide();
            $('#reg-popup').modal('hide');
            $('.modal-backdrop').remove();
            });
            $('.register').hide();
            // $('#login_form').css('margin', '0px auto');

        });


    // Login
    $('#login-form').on('submit', function(e) {
        var credentials = form2object(this);
        bucketList_api.login(credentials, function(err, data) {
            handleError(err, data, function() {
                alert("Invalid credentials");
            });
            $('#login-popup').modal('hide');
            $('.modal-backdrop').remove();
            $('#logout-button-text').show();
        });
        e.preventDefault();
    });

    // Logout
    $('#logout-button-text').on('click', function(e) {
        bucketList_api.logout(function(err, data) {
            handleError(err, data);
            console.log("logged out");
            $('#logout-button-text').hide();
        });
        e.preventDefault();
    });

    // showList
    $('#show-activity-list').on('click', function(e){
        e.preventDefault();
        bucketList_api.showList(function(err, data){
            handleError(err,data);
            data.forEach(function(item){
              $('#activity-table tr:last').after(
                '<tr data-id=' + item._id + '><td>' + item.name +  '</td><td>' + item.city + '</td><td><button class="edit btn btn-primary">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
            });
            $('#show-activity-list').hide();
        });
    });

    // CreateListItem
     $('#create-activity').on('submit', function(e) {
        e.preventDefault();
        var credentials = form2object(this);
        bucketList_api.createListItem(credentials, function(err, data){
          handleError(err,data);
          $('#activity-table tr:last').after(
            '<tr data-id=' + data._id + '><td>' + data.name +  '</td><td>' + data.city + '</td><td><button class="edit btn btn-primary">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
        });
    });
    $('#activity-table').on('click', function(event){
        event.preventDefault();
        console.log("button on table");
        var $target = $(event.target);
        if($target.hasClass("delete")){
            console.log("deleting ", $target);
            $target.parent().parent().remove();

           // bucketList_api.destroyListItem();
        }else if($target.hasClass("edit")){
            // otherasutff
            console.log("editting ", $target)

        }
    });


});
