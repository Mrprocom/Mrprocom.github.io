// This function checks if elem is visible
function isVisible(elem){
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
  return (elemBottom <= docViewBottom) && (elemTop >= docViewTop)
}


$(document).ready(function(){
  // Edit the href attribute of all .sub-topic a to redirect to the correct page
  $(".sub-topic a").each(function(){
    $(this).attr("href", window.location.href.replace(/\/pages\/\S+\.html/, "") + $(this).attr("href"));
  });

  // Allow shift-click on .shift-click links to change the iframe
  $(".shift-click").click(function(e){
    if(e.shiftKey && !e.ctrlKey && e.which === 1){
      e.preventDefault();
      window.location.href = $(this).attr("href");
    }
  });

  // Allow shift-control-click on .shift-click links to open them up in a dialog box
  $(".shift-click").click(function(e){
    if(e.shiftKey && e.ctrlKey && e.which === 1){
      e.preventDefault();
      BootstrapDialog.show({
        title: "",
        message: "<iframe src='" + $(this).attr("href") + "' class='dialog-iframe'></iframe>",
        size: BootstrapDialog.SIZE_WIDE,
      });
    }
  });

  // Clicking .clickable-panel toggles the panel body
  $(".clickable-panel .panel-heading").click(function(){
    if($($(this).parent().children()[1]).css("display") != "none"){
      $(".panel-body").hide("300ms");
    } else {
      $(".panel-body").hide("300ms");
      $($(this).parent().children()[1]).toggle("300ms");
    }
  });

  // Only load GIFs when they are visible
  $(".element-gif").each(function(){
    if(isVisible(this)){
      $(this).attr("src", $(this).attr("data-gif"));
    }
  });

  $(window).on("scroll.reached resize", function(){
    $(".element-gif").each(function(){
      if(isVisible(this)){
        $(this).attr("src", $(this).attr("data-gif"));
      }
    });
  });
});
