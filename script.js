function showPanel(panel){
  $("#logo-wrapper").css({"height": "0", "padding": "0"}).fadeOut(400);
  $(".section").css({"height": "100%"});
  $("#sections-wrapper").css("height", "10%");
  $(".panel-section").hide();
  $(panel).show();
}


$(document).ready(function(){

  setTimeout(function(){$(".section").removeAttr("style")}, 10);

  $(document).on("click", "#about.inactive", function(){
    showPanel("#about-panel");
    $(".section").removeClass("active").addClass("inactive");
    $("#about").removeClass("inactive").addClass("active");
  });

  $(document).on("click", "#projects.inactive", function(){
    showPanel("#projects-panel");
    $(".section").removeClass("active").addClass("inactive");
    $("#projects").removeClass("inactive").addClass("active");
  });

  $(document).on("click", "#tpt.inactive", function(){
    showPanel("#tpt-panel");
    $(".section").removeClass("active").addClass("inactive");
    $("#tpt").removeClass("inactive").addClass("active");
  });

  $(document).on("click", "#scripts.inactive", function(){
    showPanel("#scripts-panel");
    $(".section").removeClass("active").addClass("inactive");
    $("#scripts").removeClass("inactive").addClass("active");
  });

  $(document).on("click", "#midi.inactive", function(){
    showPanel("#midi-panel");
    $(".section").removeClass("active").addClass("inactive");
    $("#midi").removeClass("inactive").addClass("active");
  });


  $(document).on("click", ".active", function(){
    $("#logo-wrapper").fadeIn(400).css({"height": "", "padding": ""});
    $(".section").css({"height": ""}).removeClass("active").addClass("inactive");
    $("#sections-wrapper").css("height", "");
    setTimeout(function(){$(".panel-section").hide()}, 400);
  });
});
