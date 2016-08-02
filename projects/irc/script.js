$(document).ready(function(){

  var clientText =
    "<h2>Switch Client</h2>" +
    "<p>" +
      "IRC clients are programs that are used to communicate with servers to send messages to other clients. Some of them can be installed, some of them can be accessed using web browsers and some of them can be used in games. These are some web IRC clients you can choose from." +
    "</p>";

  var qwebircText =
    "<h2>Qwebirc</h2>" +
    "<p>" +
      "This IRC client can be used to connect to specific servers. It is very basic and simple and good for new users. This web client is one of the most popular web clients available. The designs are not that bad. If you are new, you should probably use it." +
    "</p>";

  var kiwiircText =
    "<h2>KiwiIRC</h2>" +
    "<p>" +
      "This IRC client is very advanced compared to other web clients. You can connect to any server you want, just click on 'Server and network' and enter the server details. The designs are modern and better than other web clients. It is also not that complicated, so it is alright for a new user to use it." +
    "</p>";

  var mibbitText =
    "<h2>Mibbit</h2>" +
    "<p>" +
      "This IRC client can only connect to specific servers. Sadly, you cannot use it to connect to Freenode. The designs are very basic. I do not advise using this client for new users because it is not that simple." +
    "</p>";

  var serverText =
    "<h2>Choose Server</h2>" +
    "<p>" +
      "Choose which server you want to connect to. If you have no idea what to do or you are new, try Freenode." +
    "</p>";

  var colourText =
    "<textarea id='colour' class='copy-text'></textarea>" +
    "<h2>Foreground Colour</h2>" +
    "<div class='btn-group btn-group-justified'>" +
      "<a class='btn btn-default btn-for btn-0' data-add='00'>0</a>" +
      "<a class='btn btn-default btn-for btn-1' data-add='01'>1</a>" +
      "<a class='btn btn-default btn-for btn-2' data-add='02'>2</a>" +
      "<a class='btn btn-default btn-for btn-3' data-add='03'>3</a>" +
      "<a class='btn btn-default btn-for btn-4 selected-for' data-add='04'>4</a>" +
      "<a class='btn btn-default btn-for btn-5' data-add='05'>5</a>" +
      "<a class='btn btn-default btn-for btn-6' data-add='06'>6</a>" +
      "<a class='btn btn-default btn-for btn-7' data-add='07'>7</a>" +
    "</div>" +
    "<div class='btn-group btn-group-justified'>" +
      "<a class='btn btn-default btn-for btn-8' data-add='08'>8</a>" +
      "<a class='btn btn-default btn-for btn-9' data-add='09'>9</a>" +
      "<a class='btn btn-default btn-for btn-10' data-add='10'>10</a>" +
      "<a class='btn btn-default btn-for btn-11' data-add='11'>11</a>" +
      "<a class='btn btn-default btn-for btn-12' data-add='12'>12</a>" +
      "<a class='btn btn-default btn-for btn-13' data-add='13'>13</a>" +
      "<a class='btn btn-default btn-for btn-14' data-add='14'>14</a>" +
      "<a class='btn btn-default btn-for btn-15' data-add='15'>15</a>" +
    "</div>" +
    "<h2>Background Colour</h2>" +
    "<div class='btn-group btn-group-justified'>" +
      "<a class='btn btn-default btn-back btn-no selected-back' data-add='-1'>No Background</a>" +
    "</div>" +
    "<div class='btn-group btn-group-justified'>" +
      "<a class='btn btn-default btn-back btn-0' data-add='00'>0</a>" +
      "<a class='btn btn-default btn-back btn-1' data-add='01'>1</a>" +
      "<a class='btn btn-default btn-back btn-2' data-add='02'>2</a>" +
      "<a class='btn btn-default btn-back btn-3' data-add='03'>3</a>" +
      "<a class='btn btn-default btn-back btn-4' data-add='04'>4</a>" +
      "<a class='btn btn-default btn-back btn-5' data-add='05'>5</a>" +
      "<a class='btn btn-default btn-back btn-6' data-add='06'>6</a>" +
      "<a class='btn btn-default btn-back btn-7' data-add='07'>7</a>" +
    "</div>" +
    "<div class='btn-group btn-group-justified'>" +
      "<a class='btn btn-default btn-back btn-8' data-add='08'>8</a>" +
      "<a class='btn btn-default btn-back btn-9' data-add='09'>9</a>" +
      "<a class='btn btn-default btn-back btn-10' data-add='10'>10</a>" +
      "<a class='btn btn-default btn-back btn-11' data-add='11'>11</a>" +
      "<a class='btn btn-default btn-back btn-12' data-add='12'>12</a>" +
      "<a class='btn btn-default btn-back btn-13' data-add='13'>13</a>" +
      "<a class='btn btn-default btn-back btn-14' data-add='14'>14</a>" +
      "<a class='btn btn-default btn-back btn-15' data-add='15'>15</a>" +
    "</div>";

  var commandsText =
    "<div class='fixed-scroll'>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Away</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/away [&lt;Reason&gt;]</h4>Marks you as being away. Not providing the reason will mark you as being back.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Clear</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/clear</h4>Clears all messages from the current channel, but it will still remain for other users.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Ctcp</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/ctcp &lt;Nickname&gt; &lt;CTCP Name&gt;</h4>Sends a CTCP request to get information about someone. Common CTCP requests: TIME, VERSION.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Help</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/help [&lt;Command&gt;]</h4>Shows information about that command. Not providing the command name will show a list of commands.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Invite</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/invite &lt;Nickname&gt; &lt;Channel&gt;</h4>Invites a user to join a channel.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Join</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/join &lt;Channel&gt;</h4>Joins a channel.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Kick</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/kick &lt;Nickname&gt;</h4>Kicks user out of the current channel.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Me</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/me &lt;Action&gt;</h4>Performs an action in third person.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Mode</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/mode &lt;Channel&gt; &lt;Mode&gt; [&lt;Hostmask|Channel&gt;]</h4>Sets or changes the mode of a hostmask or a channel.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Msg</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/msg &lt;Nickname&gt; &lt;Message&gt;</h4>Sends a private message.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Nick</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/nick &lt;Nickname&gt;</h4>Changes your nickname.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Notice</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/notice &lt;Nickname&gt; &lt;Message&gt;</h4>Sends a notice to someone. A notice is similar to private messages.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Part</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/part [&lt;Channel&gt;] [&lt;Reason&gt;]</h4>Leaves a channel (the current one by default). The part reason is shown to everyone in the channel.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Query</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/query &lt;Nickname&gt; [&lt;Message&gt;]</h4>Opens a new tab for private messages. If the message is provided, it will send that message too.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Say</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/say &lt;Message&gt;</h4>Sends message to the current channel. This is useful for sending messages starting with forward slashes <kbd>/</kbd> without executing commands.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Topic</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/topic [&lt;Channel&gt;] &lt;Topic&gt;</h4>Changes the topic of the channel.</div>" +
      "</div>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>" +
          "<h3 class='panel-title'>Quit</h3>" +
        "</div>" +
        "<div class='panel-body'><h4>/quit [&lt;Reason&gt;]</h4>Quits from the server. The quit reason is shown to everyone in the channel.</div>" +
      "</div>" +
    "</div>";

  var helpText =
    "<h2>Help</h2>" +
    "<p>Choose a topic to learn about.</p>";

  var connectingText = {
    qwebirc: "<h2>Connecting</h2>" +
      "<ul>" +
        "<li>Nickname: The name you want to be known as when you connect. If you enter a nickname that is registered or currently being used, you will either be disconnected or have a new random nickname.</li>" +
        "<li>Channels: The channels you want to automatically join after connecting. You can leave this text field empty if you do not want to automatically join a channel after connecting. You can join multiple channels by separating them with commas <kbd>,</kbd>. Channels start with at least one hash <kbd>#</kbd>. You can still join other channels after connecting using commands.</li>" +
        "<li>Auth to services: Enable this if you have a NickServ account you want to log in.</li>" +
      "</ul>"
    kiwiirc: "<h2>Connecting</h2>" +
      "<ul>" +
        "<li>Featured Networks: A list of very popular IRC networks you can choose from.</li>"
        "<li>Server and networks: Click on this to access advanced connecting features, like enabling SSL, changing the server's port, entering a custom server URL.</li>"
        "<li>Nickname: The name you want to be known as when you connect. If you enter a nickname that is registered or currently being used, you will either be disconnected or have a new random nickname.</li>" +
        "<li>Channel: The channels you want to automatically join after connecting. You can leave this text field empty if you do not want to automatically join a channel after connecting. You can join multiple channels by separating them with commas <kbd>,</kbd>. Channels start with at least one hash <kbd>#</kbd>. You can still join other channels after connecting using commands.</li>" +
        "<li>I have a password: Enable this if you have a NickServ account you want to log in or the server requires a password to access it.</li>" +
      "</ul>",
    mibbit: "<h2>Connecting</h2>" +
      "<ul>" +
        "<li>Connect: Select the server you want to connect to from this dropdown menu.</li>" +
        "<li>Nick: The name you want to be known as when you connect. If you enter a nickname that is registered or currently being used, you will either be disconnected or have a new random nickname.</li>" +
        "<li>Channel: The channels you want to automatically join after connecting. You can leave this text field empty if you do not want to automatically join a channel after connecting. You can join multiple channels by separating them with commas <kbd>,</kbd>. Channels start with at least one hash <kbd>#</kbd>. You can still join other channels after connecting using commands.</li>" +
        "<li>Auth: Click on this if you have a NickServ account you want to log in or the server requires a password to access it.</li>" +
      "</ul>"
  };

  var conceptsText =
    "<h2>Concepts</h2>" +
    "<ul>" +
      "<li>Highlighting: Highlighting someone is mentioning their nickname. This will make their client notify them that someone mentioned their nickname. You can address a message to a user by typing their name at the beginning of the message followed by a colon <kbd>:</kbd> or a comma <kbd>,</kbd>. Example: \"John: hello!\". If you want to highlight a voiced user or an operator, do not include the at sign <kbd>@</kbd> or the plus sign <kbd>+</kbd>.</li>" +
      "<li>Tab: You can easily type the nickname of a user in the current channel by typing the first few letters of their nickname and pressing <kbd>Tab</kbd> to automatically complete it with the right letter casing.</li>" +
      "<li>Operators: Users with special powers which allow them to moderate the channel.</li>" +
      "<li>IRC Bots: Robots that send automated responses to specific commands. Each bot has its own set of commands it can respond to.</li>" +
      "<li>Commands: Things you enter to make your client perform a task. All commands start with a forward slash <kbd>/</kbd>.</li>" +
    "</ul>";

  var behavingText =
    "<h2>Behaving</h2>" +
    "<ul>" +
      "<li>Follow the rules of the channel that you are visiting. Most channel rules are written in the channel topic.</li>" +
      "<li>Do not spam, flood, rejoin the same channel many times or change your nickname many times. If you want to, you can open a new query with yourself and spam there or you can spam in a random abandoned channel that does not have any users.</li>" +
      "<li>Do not highlight users for no reason. You will only waste their time.</li>" +
      "<li>Do not troll or ban evade.</li>" +
      "<li>Do not abuse caps lock or formatted text. It is considered as spam.</li>" +
      "<li>Do not be annoying or rude.</li>" +
      "<li>Do not impersonate other users.</li>" +
      "<li>Do not ask for channel powers if you do not have rights for that. It will only make your chance of having powers smaller.</li>" +
    "</ul>";

  var currentClient = "qwebirc";


  // Enable tooltips
  $("[data-toggle=tooltip]").tooltip();


  // Switch client when #switch is clicked
  $("#switch").click(function(){
    var chosenClient = "qwebirc";
    BootstrapDialog.show({
      title: "Switch Cclient",
      message: clientText,
      closable: false,
      buttons: [{
        label: "Qwebirc",
        id: "btn-qwebirc",
        action: function(dialogItself){
          dialogItself.close();
          BootstrapDialog.show({
            title: "Switch Client",
            message: serverText,
            buttons: [{
              label: "Freenode",
              action: function(dialogItself){
                currentClient = "qwebirc";
                $("#irc-client").attr("src", "https://webchat.freenode.net/");
                dialogItself.close();
              }
            }, {
              label: "QuackNet",
              action: function(dialogItself){
                currentClient = "qwebirc";
                $("#irc-client").attr("src", "https://webchat.quakenet.org/");
                dialogItself.close();
              }
            }, {
              label: "Rizon",
              action: function(dialogItself){
                currentClient = "qwebirc";
                $("#irc-client").attr("src", "https://qchat.rizon.net/");
                dialogItself.close();
              }
            }, {
              label: "GameSurge",
              action: function(dialogItself){
                currentClient = "qwebirc";
                $("#irc-client").attr("src", "https://webchat.gamesurge.net/");
                dialogItself.close();
              }
            }, {
              label: "Cancel",
              cssClass: "btn-primary",
              action: function(dialogItself){dialogItself.close()}
            }]
          });
        }
      }, {
        label: "KiwiIRC",
        id: "btn-kiwiirc",
        action: function(dialogItself){
          currentClient = "kiwiirc";
          $("#irc-client").attr("src", "https://kiwiirc.com/client");
          dialogItself.close();
        }
      }, {
        label: "Mibbit",
        id: "btn-mibbit",
        action: function(dialogItself){
          currentClient = "mibbit";
          $("#irc-client").attr("src", "https://client02.chat.mibbit.com/");
          dialogItself.close();
        }
      }, {
        label: "Cancel",
        cssClass: "btn-primary",
        action: function(dialogItself){dialogItself.close()}
      }],
    });
  });

  $(document).on("mouseenter", "#btn-qwebirc", function(){
    $(".bootstrap-dialog-message").html(qwebircText);
  });

  $(document).on("mouseenter", "#btn-kiwiirc", function(){
    $(".bootstrap-dialog-message").html(kiwiircText);
  });

  $(document).on("mouseenter", "#btn-mibbit", function(){
    $(".bootstrap-dialog-message").html(mibbitText);
  });

  // Copy formatting characters when #copy-* is clicked
  $("#copy-bold").click(function(){
    $("#bold").show().select();
    document.execCommand("copy");
    $("#bold").hide();
  });

  $("#copy-colour").click(function(){
    BootstrapDialog.show({
      title: "Copy Colour Character",
      message: colourText,
      buttons: [{
        label: "Copy Colour",
        action: function(dialogItself){
          if($(".selected-back").attr("data-add") == "-1"){
            $("#colour").val("" + $(".selected-for").attr("data-add")).show().select();
            document.execCommand("copy");
            $("#colour").hide();
          } else {
            $("#colour").val("" + $(".selected-for").attr("data-add") + "," + $(".selected-back").attr("data-add"));
            $("#colour").show().select();
            document.execCommand("copy");
            $("#colour").hide();
          }
          dialogItself.close();
        }
      }, {
        label: "Copy Character Only",
        action: function(dialogItself){
          $("#colour").val("").show().select();
          document.execCommand("copy");
          $("#colour").hide();
          dialogItself.close();
        }
      }, {
        label: "Cancel",
        cssClass: "btn-primary",
        action: function(dialogItself){dialogItself.close()}
      }]
    });
  });

  $("#copy-italic").click(function(){
    $("#italic").show().select();
    document.execCommand("copy");
    $("#italic").hide();
  });

  $("#copy-normal").click(function(){
    $("#normal").show().select();
    document.execCommand("copy");
    $("#normal").hide();
  });

  $("#copy-underline").click(function(){
    $("#underline").show().select();
    document.execCommand("copy");
    $("#underline").hide();
  });

  $(document).on("click", ".btn-for", function(){
    $(".btn-for").removeClass("selected-for");
    $(this).addClass("selected-for");
  });

  $(document).on("click", ".btn-back", function(){
    $(".btn-back").removeClass("selected-back");
    $(this).addClass("selected-back");
  });


  // Show the interface when #interface is clicked
  $("#interface").click(function(){
    if(currentClient == "qwebirc"){
      BootstrapDialog.show({
        title: "Qwebirc Interface",
        message: "<img src='qwebirc.svg' class='img-responsive'>",
        closable: false,
        buttons: [{
          label: "Close",
          action: function(dialogItself){dialogItself.close()}
        }]
      });
    } else if(currentClient == "kiwiirc"){
      BootstrapDialog.show({
        title: "KiwiIRC Interface",
        message: "<img src='kiwiirc.svg' class='img-responsive'>",
        closable: false,
        buttons: [{
          label: "Close",
          action: function(dialogItself){dialogItself.close()}
        }]
      });
    } else {
      BootstrapDialog.show({
        title: "Mibbit Interface",
        message: "<img src='mibbit.svg' class='img-responsive'>",
        closable: false,
        buttons: [{
          label: "Close",
          cssClass: "btn-primary",
          action: function(dialogItself){dialogItself.close()}
        }]
      });
    }
  });


  // Show help screen when #help is clicked
  $("#help").click(function(){
    var text;
    if(currentClient == "qwebirc"){
      text = connectingText["qwebirc"];
    } else if(currentClient == "kiwiirc") {
      text = connectingText["kiwiirc"];
    } else{
      text = connectingText["mibbit"];
    }
    BootstrapDialog.show({
      title: "Help",
      message: helpText,
      closable: false,
      buttons: [{
        label: "Connecting",
        action: function(dialogItself){
          dialogItself.close();
          BootstrapDialog.show({
            title: "Connecting",
            message: text,
            closable: false,
            size: BootstrapDialog.SIZE_WIDE,
            buttons: [{
              label: "Close",
              cssClass: "btn-primary",
              action: function(dialogItself){dialogItself.close()}
            }]
          });
        }
      }, {
        label: "Concepts",
        action: function(dialogItself){
          dialogItself.close();
          BootstrapDialog.show({
            title: "Concepts",
            message: conceptsText,
            closable: false,
            size: BootstrapDialog.SIZE_WIDE,
            buttons: [{
              label: "Close",
              cssClass: "btn-primary",
              action: function(dialogItself){dialogItself.close()}
            }]
          });
        }
      }, {
        label: "Behaving",
        action: function(dialogItself){
          dialogItself.close();
          BootstrapDialog.show({
            title: "Behaving",
            message: behavingText,
            closable: false,
            size: BootstrapDialog.SIZE_WIDE,
            buttons: [{
              label: "Close",
              cssClass: "btn-primary",
              action: function(dialogItself){dialogItself.close()}
            }]
          });
        }
      }, {
        label: "Close",
        cssClass: "btn-primary",
        action: function(dialogItself){dialogItself.close()}
      }]
    });
  });


  // Show the commands when #commands is clicked
  $("#commands").click(function(){
    BootstrapDialog.show({
      title: "Commands",
      message: commandsText,
      closable: false,
      buttons: [{
        label: "Close",
        cssClass: "btn-primary",
        action: function(dialogItself){dialogItself.close()}
      }]
    });
  });


  // Toggle full screen mode when #fullscreen is clicked
  $("#fullscreen").click(function(){
    if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement){
      if(document.documentElement.requestFullscreen){
        document.documentElement.requestFullscreen();
      } else if(document.documentElement.msRequestFullscreen){
        document.documentElement.msRequestFullscreen();
      } else if(document.documentElement.mozRequestFullScreen){
        document.documentElement.mozRequestFullScreen();
      } else if(document.documentElement.webkitRequestFullscreen){
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      $("#fullscreen").html("Windowed");
    } else {
      if(document.exitFullscreen){
        document.exitFullscreen();
      } else if(document.msExitFullscreen){
        document.msExitFullscreen();
      } else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
      }
      $("#fullscreen").html("Fullscreen");
    }
  });


  // Show .panel-body when .panel-head is clicked
  $(document).on("click", ".panel-heading", function(){
    var wasHidden = $(this).parent().children().last().css("display") == "none";
    $(".panel-body").hide(500);
    if(wasHidden){
      $(this).parent().children().last().show(500);
    }
  });
});
