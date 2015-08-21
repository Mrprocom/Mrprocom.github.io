$(document).ready(function(){

    // This block switches the IRC client from KiwiIRC to QwebIRC
    $(document).on("click", ".switch-qwebirc", function(){
      $("#irc-client").attr("src", "https://webchat.freenode.net");
      $("#client-website").attr("href", "https://webchat.freenode.net");
      $(this).html("Switch to KiwiIRC");
      $(this).removeClass("switch-qwebirc");
      $(this).addClass("switch-kiwiirc");
    });

    // This block switches the IRC client from QwebIRC to KiwiIRC
    $(document).on("click", ".switch-kiwiirc", function(){
      $("#irc-client").attr("src", "https://kiwiirc.com/client/irc.freenode.net/?&amp;theme=cli");
      $("#client-website").attr("href", "https://kiwiirc.com");
      $(this).html("Switch to QwebIRC");
      $(this).removeClass("switch-kiwiirc");
      $(this).addClass("switch-qwebirc");
    });

    // This block sets the IRC client and the buttons to fullscreen mode
    $(document).on("click", ".enter-full-screen", function(){
      $("#iframe-menu-wrapper").addClass("full-screen");
      $(this).html("Exit fullscreen mode");
      $(this).removeClass("enter-full-screen");
      $(this).addClass("exit-full-screen");
    });

    // This block exits the fullscreen mode
    $(document).on("click", ".exit-full-screen", function(){
      $("#iframe-menu-wrapper").removeClass("full-screen");
      $(this).html("Enter fullscreen mode");
      $(this).removeClass("exit-full-screen");
      $(this).addClass("enter-full-screen");
    });

});
