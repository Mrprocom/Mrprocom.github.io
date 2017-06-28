$(document).ready(function(){

  // Show the correct scale when .category is clicked
  $(".category").click(function(){
    var moveTo = $("#" + $(this).attr("data-go"))
    $("#main-page").fadeOut(400);
    setTimeout(function(){
      moveTo.fadeIn(300);
    }, 400);
  });

  // Go back to the category selector when .back-button is clicked
  $(".back-button").click(function(){
    $(".page-hidden").fadeOut(400);
    setTimeout(function(){
      $("#main-page").fadeIn(400);
    }, 400);
  });
});
