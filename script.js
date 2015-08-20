$(document).ready(function(){

    // This block switches the IRC client from KiwiIRC to QwebIRC
    $(document).on("click", ".switch-qwebirc", function(){
      $("#irc-client").attr("src", "https://webchat.freenode.net?uio=MTE9MjQ255");
      $("#client-website").attr("href", "https://webchat.freenode.net");
      $(this).html("Switch to KiwiIRC");
      $(this).addClass("switch-kiwiirc");
      $(this).removeClass("switch-qwebirc");
    });

    // This block switches the IRC client from QwebIRC to KiwiIRC
    $(document).on("click", ".switch-kiwiirc", function(){
      $("#irc-client").attr("src", "https://kiwiirc.com/client/irc.freenode.net/?&amp;theme=cli");
      $("#client-website").attr("href", "https://kiwiirc.com");
      $(this).html("Switch to QwebIRC");
      $(this).addClass("switch-qwebirc");
      $(this).removeClass("switch-kiwiirc");
    });

});
