function randomNickColour(nickname){

  /*
  This function takes a nickname and assigns a random HTML colour to it.
  */

  var total = 0;
  // Add the decimal version of each letter to total
  for(var i = 0; i < nickname.length; i++){
    total += nickname.charCodeAt(i);
  }

  // Return either 0, 1, 2, 3 or 4
  randomColour = total % 5;
  // Depending on that number, assign a random colour to the nicks
  switch(randomColour){
    case 0:
      return "<font color='#3465A4'>" + nickname + "</font>";
    case 1:
      return "<font color='#3465A4'>" + nickname + "</font>";
    case 2:
      return "<font color='#CC0000'>" + nickname + "</font>";
    case 3:
      return "<font color='#5C3566'>" + nickname + "</font>";
    case 4:
      return "<font color='#C4A000'>" + nickname + "</font>";
  }
}


function htmlEncode(s){

  /*
  This function encodes special characters.
  */

  for(var i = 0; i < s.length; i++){
    // If the decimal version of the character higher than 255, then encode it
    if(s.charCodeAt(i) > 255){
      s = s.replace(s[i], "&#" + s.charCodeAt(i) + ";");
    }
  }

  return s;
}


function ircFormatToHtml(s){

  /*
  This function converts all IRC formatted text into HTML formatted text.
  */

  var boldChar = false;
  var colourChar = false;
  var italicChar = false;
  var underlineChar = false;
  // Prepare a list of HexChat colours (from 0 to 31)
  var colours = [
    "#D3D7CF", "#2E3436", "#3465A4", "#4E9A06",
    "#CC0000", "#8F3902", "#5C3566", "#CE5C00",
    "#C4A000", "#73D216", "#11A879", "#58A19D",
    "#57799E", "#A04365", "#555753", "#888A85",
    "#D3D7CF", "#2E3436", "#3465A4", "#4E9A06",
    "#CC0000", "#8F3902", "#5C3566", "#CE5C00",
    "#C4A000", "#73D216", "#11A879", "#58A19D",
    "#57799E", "#A04365", "#555753", "#888A85"
  ]
  var newString = "";

  // Loop through each letter and detect if it is a character that is used to format text
  for(var i = 0; i < s.length; i++){
    var letter = s[i];
    // Check if the character is the bold character
    if(letter == "\002"){
      // Check if there is not a starting tag before
      if(!boldChar){
        newString += "<b>";
        // Set this to true so that next time an ending tag will be inserted
        boldChar = true;
      } else {
        newString += "</b>";
        boldChar = false;
      }
    } else if(letter == "\035"){
      if(!italicChar){
        newString += "<i>";
        italicChar = true;
      } else {
        newString += "</i>";
        italicChar = false;
      }
    } else if(letter == "\037"){
      if(!underlineChar){
        newString += "<u>";
        underlineChar = true;
      } else {
        newString += "</u>";
        underlineChar = false;
      }
    } else if(letter == "\017"){
      if(boldChar){
        newString += "</b>";
        boldChar = false;
      }
      if(colourChar){
        newString += "</font>";
        colourChar = false;
      }
      if(italicChar){
        newString += "</i>";
        italicChar = false;
      }
      if(underlineChar){
        newString += "</u>";
        underlineChar = false;
      }
    } else if(letter == "\003"){
      // Take the first 4 characters after the colour character
      var charsAfter = s.substr(i + 1, i + 5);
      var colourRe = /(\d{1,2})(,\d{1,2})?/

      // Check if what is after the colour character causes it to change the text colour
      if(colourRe.exec(charsAfter)){
        // Take the colour number (only the foreground colour number)
        var colourNumber = parseInt(colourRe.exec(charsAfter)[1]);
        // Check if there is an opening tag that was not closed
        if(colourChar){
          // Check if the colour number is valid
          if(colourNumber <= 31){
            newString += "</font><font color='" + colours[colourNumber] + "'>";
          } else {
            newString += "</font><font>";
          }
          // Skip the colour number
          i += colourRe.exec(charsAfter)[0].length;
        } else {
          if(colourNumber <= 31){
            newString += "<font color='" + colours[colourNumber] + "'>";
            colourChar = true;
          } else {
            newString += "<font>";
            colourChar = true;
          }
          i += colourRe.exec(charsAfter)[0].length;
        }
      } else {
        if(colourChar){
          newString += "</font>";
          colourChar = false;
        } else {
          newString += "<font>";
          colourChar = true;
        }
      }
    } else {
      newString += letter;
    }
  }

  // Close all unclosed tags at the end
  if(boldChar){
    newString += "</b>";
    boldChar = false;
  }
  if(colourChar){
    newString += "</font>";
    colourChar = false;
  }
  if(italicChar){
    newString += "</i>";
    italicChar = false;
  }
  if(underlineChar){
    newString += "</u>";
    underlineChar = false;
  }

  return newString;
}


function stripIrcFmt(s){

  /*
  This function removes all formatted text from s.
  */

  return s.replace(/\003(\d{1,2},)?\d{1,2}/g, "").replace(/(\002|\003|\017|\026|\035|\037)/g, "");
}


function getResult(){

  /*
  This function returns the result after prettifying the quote.
  */

  var messageSyntax       = $("#message-syntax").val();
  var notificationSyntax  = $("#notification-syntax").val();
  var replaceIpWith       = $("#replace-ip-with").val();
  var isHideIpChecked     = $("#hide-ip").is(":checked");
  var isHideHostChecked   = $("#hide-hostmasks").is(":checked");
  var isColourNickChecked = $("#colour-nick").is(":checked");
  var isConvertFmtChecked = $("#convert-format").is(":checked");
  var isEncodeTextChecked = $("#encode-text").is(":checked");
  var isNoSyntaxChecked   = $("#no-syntax").is(":checked");
  var oldQuote            = $("#irc-quote").val();
  var newQuote            = "";
  var ipRe                = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g;
  var hostmaskRe          = /[^! ]+@\S+/g;

  // If the user did not want to the syntaxes to be changed
  if(isNoSyntaxChecked){

    // Replace all < and > with &lt; and &gt;
    oldQuote = oldQuote.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // Hide hostmaks and/or IPs if the user wanted to
    if(isHideHostChecked){
      oldQuote = oldQuote.replace(hostmaskRe, replaceIpWith);
    }
    if(isHideIpChecked){
      oldQuote = oldQuote.replace(ipRe, replaceIpWith);
    }
    // Encode special characters if the user wanted to
    if(isEncodeTextChecked){
      oldQuote = htmlEncode(oldQuote);
    }
    // Convert all IRC formatted text into HTML formatted text if the user wanted to
    if(isConvertFmtChecked){
      var quotelines = oldQuote.split("\n");
      for(var i = 0; i < quotelines.length; i++){
        newQuote += ircFormatToHtml(quotelines[i]) + "\n";
      }

    } else {
      // Remove all IRC formatted text if the user did not want to convert them
      newQuote = stripIrcFmt(oldQuote);
    }

    return newQuote;

  } else {

    // check if input is valid
    if(messageSyntax.indexOf("nickname") == -1 ||
      messageSyntax.indexOf("message") == -1 ||
      notificationSyntax.indexOf("message") == -1){
      alert("Invalid Arguments. The message syntax must contain \"nickname\" and \"message\" and the notification syntax must contain \"message\". Make sure you paste your quote in the big text area.");

    } else {
      // Turn message and notification syntaxes into RegExp
      messageSyntax = messageSyntax.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      notificationSyntax = notificationSyntax.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      var messageRe = new RegExp(messageSyntax.replace("timestamp", "(.+)").replace("nickname", "(\\S+)").replace("message", "(.+)"));
      var notificationRe = new RegExp(notificationSyntax.replace("timestamp", "(.+)").replace("message", "(.+)"));

      // Remove all IRC formatted text if the user did not want to convert them
      if(!isConvertFmtChecked){
        oldQuote = stripIrcFmt(oldQuote);
      }

      var quotelines = oldQuote;
      if(isHideHostChecked){
        quotelines = quotelines.replace(hostmaskRe, replaceIpWith);
      }
      if(isHideIpChecked){
        quotelines = quotelines.replace(ipRe, replaceIpWith);
      }
      quotelines = quotelines.split("\n");

      // Loop through each line and change the syntaxes if they match
      for(var i = 0; i < quotelines.length; i++){
        var quoteline = quotelines[i];
        if(messageRe.exec(quoteline) && messageRe.exec(quoteline)[0] == quoteline){
          // Check if the user did not use timestamps
          if(messageSyntax.indexOf("timestamp") == -1){
            var nickname = messageRe.exec(quoteline)[1];
            var message = messageRe.exec(quoteline)[2];
            message = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

            if(isEncodeTextChecked){
              message = htmlEncode(message);
            }

            if(isColourNickChecked){
              nickname = randomNickColour(nickname);
            }

            if(isConvertFmtChecked){
              message = ircFormatToHtml(message);
            }

            var newline = "&lt;" + nickname + "&gt; " + message + "\n";
          } else {
            var timestamp = messageRe.exec(quoteline)[1];
            var nickname = messageRe.exec(quoteline)[2];
            var message = messageRe.exec(quoteline)[3];
            message = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if(isEncodeTextChecked){
              message = htmlEncode(message);
            }
            if(isColourNickChecked){
              nickname = randomNickColour(nickname);
            }
            if(isConvertFmtChecked){
              message = ircFormatToHtml(message);
            }
            var newline = "[" + timestamp + "] &lt;" + nickname + "&gt; " + message + "\n";
          }
          newQuote += newline;

        // Do the same thing but with notifications if they match
        } else if(notificationRe.exec(quoteline) && notificationRe.exec(quoteline)[0] == quoteline){
          if(notificationSyntax.indexOf("timestamp") == -1){
            var message = notificationRe.exec(quoteline)[1];
            message = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if(isEncodeTextChecked){
              message = htmlEncode(message);
            }
            if(isConvertFmtChecked){
              message = ircFormatToHtml(message);
            }
            var newline = "* " + message + "\n";
          } else {
            var timestamp = notificationRe.exec(quoteline)[1];
            var message = notificationRe.exec(quoteline)[2];
            message = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if(isEncodeTextChecked){
              message = htmlEncode(message);
            }
            if(isConvertFmtChecked){
              message = ircFormatToHtml(message);
            }
            var newline = "[" + timestamp + "] * " + message + "\n";
          }
          newQuote += newline;

        } else {
          if(isHideHostChecked){
            quoteline = quoteline.replace(hostmaskRe, replaceIpWith);
          }
          if(isHideIpChecked){
            quoteline = quoteline.replace(ipRe, replaceIpWith);
          }
          if(isEncodeTextChecked){
            quoteline = htmlEncode(quoteline) + "\n";
          }
          if(isConvertFmtChecked){
            quoteline = ircFormatToHtml(quoteline) + "\n";
          }
          newQuote += quoteline;
        }
      }
      return newQuote;
    }
  }
}


$(document).ready(function(){

  $("#prettify").click(function(){
    var result = getResult();
    if(result){
      $("#result").val(result);
    }
  });

  $("#preview").click(function(){
    var result = getResult();
    result = "<div id='preview-container'>" + result + "</div>"
    if(result){
      // Show a dialog of the results
      BootstrapDialog.show({
        title: "Preview",
        message: result,
        buttons: [{
          label: "Close",
          action: function(dialogItself){dialogItself.close();}
        }]
      });
    }
  });

  $("#help").click(function(){
    var result =
      "<ul>" +
        "<li>Paste your quote in the Your quote text field</li>" +
        "<li>If you want the syntax to be change, make sure you do not check the last checkbox and enter the message syntax and the notification syntax your client uses in their own text fields. This will not work with quotes that have different syntaxes. Message syntax must contain the word \"nickname\" and the word \"message\". Notification syntaxes must contain the word \"message\". The word \"timestamp\" is optional.</li>" +
        "<li>If you want IPs and/or hostmasks to be hidden, check the first and/or the second checkbox and enter what you want them to be replaced with in the \"Replace IPs with text\" field.</li>" +
        "<li>If you want each nickname to have a random colour, check the third checkbox. This will only work if the last checkbox is not checked.</li>" +
        "<li>If you want IRC formatted text to be converted into HTML formatted text, check the fourth checkbox.</li>" +
        "<li>If you want special characters that have a decimal value that is more than 255 to be encoded, check the fifth checkbox.</li>" +
        "<li>Press \"Prettify\" to get the new HTML code or \"Preview\" to see how it looks first.</li>" +
        "<li>After pressing \"Prettify\" the \"Result\" text field will have the new HTML code, copy it and do whatever you want with it.</li>" +
      "</ul>";
    BootstrapDialog.show({
        title: "How to use",
        message: result,
        buttons: [{
          label: "Close",
          action: function(dialogItself){dialogItself.close();}
        }]
      });
  });
});
