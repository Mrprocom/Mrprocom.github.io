$(document).ready(function(){

  // Switch to main-page.html when #switch-main is clicked
  $("#switch-main").on("click", function(){
    $("#iframe-screen").attr("src", "main-page.html");
  });


  // Switch to custom.html when #switch-main is clicked
  $("#switch-custom").on("click", function(){
    $("#iframe-screen").attr("src", "custom.html");
  });


  // Google search
  $(".google").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/search?q=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  // YouTube search
  $(".youtube").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.youtube.com/results?search_query=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  // Imgaes search
  $(".images").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/search?q=" + searchUrl + "&tbm=isch";
    window.open(searchUrl, "_blank");
  });


  // Maps search
  $(".maps").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/maps?q=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  // URL search
  $(".url").on("click", function(){
    var searchUrl = $("#search-input").val();
    $("#iframe-screen").attr("src", searchUrl);;
  });

});
