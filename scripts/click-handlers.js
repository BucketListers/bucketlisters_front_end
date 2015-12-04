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
        var credentials = form2object(this);
        console.log(credentials);
        bucketList_api.signup(credentials, function(err, data) {
            handleError(err, data, function() {
                alert("Invalid credentials");
             });
            // $('.register').hide();
            $('#reg-popup').modal('hide');
            $('.modal-backdrop').remove();
            // $('#landing-page-reg-button').hide();
            $('#login-popup').modal('show');
            // $('#logout-button-text').show();
            // $('.jumbotron').hide();
            // $('#activity-table-header').show();
            // $('#show-activity-list').show();
            // $('#activity-table').show();
            // $('#add-new-activity').show();
            // $('#update-activity').show();
           });
            // $('#login_form').css('margin', '0px auto');
        e.preventDefault();

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
            $('#logout-button-text').css('display', 'inline-block');
            $('.jumbotron').hide();
            $('#activity-table-header').show();
            $('#show-activity-list').show();
            $('#activity-table').show();
            $('#add-new-activity').show();
            $('#update-activity').show();
        });
        e.preventDefault();
    });

    // Logout
    $('#logout-button-text').on('click', function(e) {
        bucketList_api.logout(function(err, data) {
            handleError(err, data);
            console.log("logged out");
            $('#logout-button-text').hide();
            $('.jumbotron').show();
            $('#activity-table-header').hide();
            $('#show-activity-list').hide();
            $('#activity-table').hide();
            $('#add-new-activity').hide();
            $('#update-activity').hide();
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
                '<tr data-id=' + item._id + '><td>' + item.name +  '</td><td>' + item.city + '</td><td><button class="edit btn btn-primary" data-toggle="modal" data-target="#update-activity-popup">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
            });
            $('#update-activity-popup').modal('hide');
            $('.modal-backdrop').remove();
            $('#show-activity-list').hide();
        });
    });

    // CreateListItem
     $('#create-activity').on('submit', function(e) {
        e.preventDefault();
        var credentials = form2object(this);
        $('input:text').val('');
        $('#add-new-activity-popup').hide();
        $('.modal-backdrop').remove();
        bucketList_api.createListItem(credentials, function(err, data){
          handleError(err,data);
          $('#activity-table tr:last').after(
            '<tr data-id=' + data._id + '><td>' + data.name +  '</td><td>' + data.city + '</td><td><button class="edit btn btn-primary" data-toggle="modal" data-target="#update-activity-popup">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
        $('#update-activity-popup').modal('hide');
        $('.modal-backdrop').remove();
        });
    });
    $('#activity-table').on('click', function(event){
        event.preventDefault();
        var $target = $(event.target);
        id = $target.parent().parent().data('id');
        if($target.hasClass("delete")){
            console.log("deleting ", id);
            $target.parent().parent().remove();

            bucketList_api.destroyListItem(id, function(err, data){});
        }else if($target.hasClass("edit")){
            console.log("editing ", id);

            $('#update-name').val($target.parent().prev().prev().text());
            $('#update-city').val($target.parent().prev().text())
            $target.parent().parent().remove();

            // // otherasutff
            // console.log("editting ", id);
            // //display new form GET TO THIS LATER
            // //populate new form from row

            // $target.parent().parent().remove();
            // // $('#activity-table tr:last').after('<tr data-id=' + data._id + '><td>' + data.name +  '</td><td>' + data.city + '</td><td><button class="edit btn btn-primary">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>'
            // // );

            // bucketList_api.updateListItem(id, function(err, data){});
        }
    });
    // UpdateListItem
     $('#update-activity').on('submit', function(e) {
        e.preventDefault();
        var credentials = form2object(this);
        $('input:text').val('');
        console.log(credentials);
        console.log(id);
        bucketList_api.updateListItem(id, credentials, function(err, data){
          handleError(err,data);
          console.log('inside update AJAX');
          $('#activity-table tr:last').after(
            '<tr data-id=' + data._id + '><td>' + data.name +  '</td><td>' + data.city + '</td><td><button class="edit btn btn-primary" data-toggle="modal" data-target="#update-activity-popup">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
        });
        $('#update-activity-popup').modal('hide');
        $('.modal-backdrop').remove();
    });

});
