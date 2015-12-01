$(document).ready(function(){

//Landing Page Display
$("#login-page-buttons").click(function() {
    // $("#logout-button").show();
    $("#login-button-text").hide();
    $('#login-complete').show();
  });
$("#login-page-buttons").click(function() {
    // $("#logout-button").show();
    $("#login-button-text").hide();
    $('#login-complete').show();
  });

 $('#register').on('submit', function(e) {
        var credentials = wrap('credentials', form2object(this));
        weather_api.register(credentials, function(err, data){
          handleError(err, data, function(){
            alert("Invalid registration");
          });
          $('#register_form').hide();
          $('#login_form').css('margin', '0px auto');
          $('#spacer').addClass('col-xs-3');
        });
        e.preventDefault();
      });


});
