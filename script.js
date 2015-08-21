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

    $(document).on("click", ".make-iframe-larger", function(){
      $("#iframe-menu-wrapper").addClass("large-screen");
      $(this).html("Exit large screen mode");
      $(this).removeClass("make-iframe-larger");
      $(this).addClass("make-iframe-smaller");
    });

    $(document).on("click", ".make-iframe-smaller", function(){
      $("#iframe-menu-wrapper").removeClass("large-screen");
      $(this).html("Enter large screen mode");
      $(this).removeClass("make-iframe-smaller");
      $(this).addClass("make-iframe-larger");
    });

});
