$(document).ready(function(){

  $("#copy-message").hide().removeClass("hidden");

  // Search function
  $("#search").on("input", function(){
    var searchFor = $("#search").val().toLowerCase().split(" ").filter(function(e){return e});
    $(".rule.hidden").removeClass("hidden");
    $(".h-indent").removeClass("h-indent").addClass("indent");
    if(searchFor.length > 0) $(".indent").removeClass("indent").addClass("h-indent");
    $(".rule").each(function(){
      for(var i = 0; i < searchFor.length; i++){
        var searchIn = $(this).text();
        if(searchIn.toLowerCase().indexOf(searchFor[i]) < 0){
          $(this).addClass("hidden");
        }
      }
    });
  });

  // Copy to clipboard
  $(".rule").click(function(){
    var ruleText = $(this).text().replace("[", "").replace("]", ":");
    $("#copy-text").val(ruleText).select();
    document.execCommand("copy");
    $("#copy-message").fadeIn(300);
    setTimeout(function(){
      $("#copy-message").fadeOut(300);
    }, 1500);
  });
});
