$(document).ready(function(){

  $("#switch-main").on("click", function(){
    $("#iframe-screen").attr("src", "main-page.html");
  });

  $("#switch-custom").on("click", function(){
    $("#iframe-screen").attr("src", "custom.html")
  });

});
