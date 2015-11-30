$(document).ready(function(){

//Landing Page Display
$("#login-form").click(function() {
    $(".holiday-view").show();
    // $("#logout-button").show();
    $("#registration-form").hide();
    $("#login-form").hide();
    $('#logged-in').hide();
    $('#registration-complete').hide();
    $('#login-complete').show();
  });
});
