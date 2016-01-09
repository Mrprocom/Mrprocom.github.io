$(document).ready(function(){

  $("[data-toggle=tooltip]").tooltip();

  var connectText =
    "<ul>" +
      "<li>Enter a valid nickname that is not currently being used in the Nickname text field.</li>" +
      "<li>Enter the channel name you want to join after connecting. All channels start with at least one pound sign (#). Separate your channel names with a comma if you want to join multiple channels. This field can be left empty.</li>" +
      "<li>If you have a NickServ account and want to identify to your account, ckeck the Auth to services checkbox and enter your username and your password in their own text fields. You can ignore it if you do not want to identify.</li>" +
      "<li>Complete the reCAPTCHA by following the instructions. This is only used to prevent abuse.</li>" +
      "<li>Click \"Connect\" to connect to the server.</li>" +
    "</ul>";

  var conceptsText =
    "<ul>" +
      "<li>If you want to get someone's attention, highlight them by mentioning their name.</li>" +
      "<li>If you want to addreess them, type their nick at the beginning then either add a colon <kbd>:</kbd> or a comma <kbd>,</kbd> followed by a space and your message.</li>" +
      "<li>Typing the first few letters of someone's nickname and pressing <kbd>Tab</kbd> will automatically complete it with the right letter casing.</li>" +
      "<li>If you want to mention a channel operator or a voiced user, do not include the at sign <kbd>@</kbd> or the plus sign <kbd>+</kbd>.</li>" +
      "<li>Channel operators have special powers that are used to manage the channel and get rid of unwanted users.</li>" +
      "<li>Voiced users can talk even if the channel is in moderation mode and even if they are banned or quieted from talking in the channel.</li>" +
    "</ul>";

  var commandsText =
    "<div class='fixed-scroll'>" +
      "<dl>" +
        "<dt>/away [&lt;Reason&gt;]</dt>" +
        "<dd>Marks you as being away. Not providing the reason will mark you as being back.</dd>" +
        "<dt>/ctcp &lt;Nickname&gt; &lt;CTCP Name&gt;</dt>" +
        "<dd>Sends a CTCP request to get information about someone. Common CTCP requests: TIME, VERSION.</dd>" +
        "<dt>/help [&lt;Command&gt;]</dt>" +
        "<dd>Shows information about that command. Not providing the command name will show a list of commands.</dd>" +
        "<dt>/invite &lt;Nickname&gt; &lt;Channel&gt;</dt>" +
        "<dd>Invites a user to join a channel.</dd>" +
        "<dt>/join &lt;Channel&gt;</dt>" +
        "<dd>Joins a channel.</dd>" +
        "<dt>/me &lt;Action&gt;</dt>" +
        "<dd>Performs an action in third person.</dd>" +
        "<dt>/msg &lt;Nickname&gt; &lt;Message&gt;</dt>" +
        "<dd>Sends a private message.</dd>" +
        "<dt>/nick &lt;Nickname&gt;</dt>" +
        "<dd>Changes your nickname.</dd>" +
        "<dt>/notice &lt;Nickname&gt; &lt;Message&gt;</dt>" +
        "<dd>Sends a notice to someone. A notice is similar to private messages.</dd>" +
        "<dt>/part [&lt;Channel&gt;] [&lt;Reason&gt;]</dt>" +
        "<dd>Leaves a channel (the current one by default). The part reason is shown to everyone in the channel.</dd>" +
        "<dt>/query &lt;Nickname&gt; [&lt;Message&gt;]</dt>" +
        "<dd>Opens a new tab for private messages. If the message is provided, it will send that message too.</dd>" +
        "<dt>/quit [&lt;Reason&gt;]</dt>" +
        "<dd>Quits from the server. The quit reason is shown to everyone in the channel.</dd>" +
      "</dl>" +
    "</div>";

  var tipsText =
    "<ul>" +
      "<li>Follow the rules of the channel that you are visiting (read the topic of the channel).</li>" +
      "<li>Do not spam or flood (including rejoining the same channel and changing the nickname rapidly). If you want to, you can open up a new query with yourself and spam there or spam in a random abandoned channel that does not have any users.</li>" +
      "<li>Do not highlight users for no reason or mass-highlight the entire channel.</li>" +
      "<li>Do not troll.</li>" +
      "<li>Do not ban evade.</li>" +
      "<li>Do not abuse caps lock or formatted characters.</li>" +
      "<li>Do not be annoying.</li>" +
      "<li>Do not be rude to people, be friendly to them and to new users instead.</li>" +
      "<li>Do not impersonate other users.</li>" +
      "<li>Do not ask for channel powers if you do not have rights to do that.</li>" +
    "</ul>";


  $("#connect").click(function(){
    BootstrapDialog.show({
      title: "How to Connect",
      message: connectText,
    });
  });

  $("#interface").click(function(){
    BootstrapDialog.show({
      title: "Qwebirc Interface",
      message: "<img src='interface.png' id='interface-img'>",
    });
  });

  $("#concepts").click(function(){
    BootstrapDialog.show({
      title: "Concepts",
      message: conceptsText,
    });
  });

  $("#commands").click(function(){
    BootstrapDialog.show({
      title: "Commands",
      message: commandsText,
    });
  });

  $("#tips").click(function(){
    BootstrapDialog.show({
      title: "Commands",
      message: tipsText,
    });
  });
});
