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

  // Clicking .clickable-panel toggles the panel body
  $(".clickable-panel .panel-heading").click(function(){
    if($($(this).parent().children()[1]).css("display") != "none"){
      $(".panel-body").hide("300ms");
    } else {
      $(".panel-body").hide("300ms");
      $($(this).parent().children()[1]).toggle("300ms");
    }
  });

  // Change the layout of the elements page when the window is small
  if($("body").hasClass("elements-body")){
    if($(window).width() >= 977){
      $(".element-row").each(function(){
        $(this).find(".well").css("height", $(this).find(".carousel").height());
        $(this).find(".well").css("margin-bottom", "0");
      });
    }

    $(window).resize(function(){
      if($(window).width() >= 977){
        $(".element-row").each(function(){
          $(this).find(".well").css("height", $(this).find(".carousel").height());
          $(this).find(".well").css("margin-bottom", "0");
        });
      } else {
        $(".element-row").each(function(){
          $(this).find(".well").css("height", "auto");
          $(this).find(".well").css("margin-bottom", "15px");
        });
      }
    });
  }

  // Update the size of wells when .carousel-control is clicked
  $(".carousel-control").click(function(){
    setTimeout(function(){
      $(".element-row").each(function(){
        $(this).find(".well").css("height", $(this).find(".carousel").height());
        $(this).find(".well").css("margin-bottom", "0");
      });
    }, 614);
  });



  // Only load GIFs when they are visible and also update the size of wells at the same time
  $(".element-gif").each(function(){
    if(isVisible(this)){
      $(this).attr("src", $(this).attr("data-gif"));
      setTimeout(function(){
        $(".element-row").each(function(){
          $(this).find(".well").css("height", $(this).find(".carousel").height());
          $(this).find(".well").css("margin-bottom", "0");
        });
      }, 1);
    }
  });

  $(window).on("scroll.reached resize", function(){
    $(".element-gif").each(function(){
      if(isVisible(this)){
        $(this).attr("src", $(this).attr("data-gif"));
        $(".element-row").each(function(){
          $(this).find(".well").css("height", $(this).find(".carousel").height());
          $(this).find(".well").css("margin-bottom", "0");
        });
      }
    });
  });
});
