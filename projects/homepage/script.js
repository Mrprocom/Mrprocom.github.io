$(document).ready(function(){

  var defaultCustom = [
    ["Main", "1", "website", "https://google.com/", "wide", "orange", "icon", "icons/google.svg", "Google"],
    ["Main", "1", "website", "http://www.bbc.com/", "wide", "green", "icon", "icons/bbc.svg", "BBC"],
    ["Main", "1", "website", "https://www.facebook.com/", "small", "blue", "icon", "icons/facebook.svg", "Facebook"],
    ["Main", "1", "website", "https://twitter.com/", "small", "purple", "icon", "icons/twitter.svg", "Twitter"],
    ["Main", "2", "website", "https://www.wunderground.com/", "wide", "blue", "icon", "icons/weather.svg", "Weather"],
    ["Main", "2", "website", "https://youtube.com/", "small", "red", "icon", "icons/youtube.svg", "YouTube"],
    ["Main", "2", "website", "https://mail.google.com/", "small", "purple", "icon", "icons/gmail.svg", "Gmail"],
    ["Main", "2", "website", "https://www.amazon.com/", "wide", "orange", "icon", "icons/amazon.svg", "Amazon"],
    ["Main", "3", "website", "https://www.hulu.com/", "wide", "green", "icon", "icons/hulu.svg", "Hulu"],
    ["Main", "3", "website", "http://www.kongregate.com/", "wide", "red", "icon", "icons/kongregate.svg", "Kongregate"],
    ["Main", "3", "website", "http://www.rapidtables.com/tools/notes.htm", "wide", "blue", "icon", "icons/notes.svg", "Notes"],
    ["Main", "4", "website", "http://www.crunchyroll.com/", "small", "orange", "icon", "icons/crunchyroll.svg", "Crunchyroll"],
    ["Main", "4", "website", "https://www.netflix.com/", "small", "red", "icon", "icons/netflix.svg", "Netflix"],
    ["Main", "4", "website", "https://www.twitch.tv/", "wide", "purple", "icon", "icons/twitch.svg", "Twitch"],
    ["Main", "4", "section", "Online_Tools", "wide", "green", "icon", "icons/tools.svg"],
    ["Online_Tools", "1", "website", "https://www.wolframalpha.com/", "wide", "red", "icon", "icons/wolframalpha.svg", "WolframAlpha"],
    ["Online_Tools", "1", "website", "https://translate.google.com/", "small", "green", "icon", "icons/googletranslate.svg", "Google Translate"],
    ["Online_Tools", "1", "website", "https://maps.google.com/", "small", "orange", "icon", "icons/googlemaps.svg", "Google Maps"],
    ["Online_Tools", "1", "website", "https://www.virustotal.com/", "wide", "blue", "icon", "icons/virustotal.svg", "VirusTotal"],
    ["Online_Tools", "2", "website", "http://www.online-convert.com/", "wide", "green", "icon", "icons/onlineconverter.svg", "Online Converter"],
    ["Online_Tools", "2", "website", "https://pixlr.com/", "wide", "purple", "icon", "icons/pixlr.svg", "Pixlr"],
    ["Online_Tools", "2", "website", "http://pastebin.com/", "wide", "red", "icon", "icons/pastebin.svg", "Paste Bin"],
    ["Online_Tools", "3", "website", "http://web2.0calc.com/widgets/horizontal/?options=…ions%22%3A%22hide%22%2C%22menu%22%3A%22show%22%7D", "wide", "blue", "icon",  "icons/calculator.svg", "Calculator"],
    ["Online_Tools", "3", "website", "https://mdn.mozillademos.org/en-US/docs/Web/CSS/CS…Colors/Color_picker_tool$samples/ColorPicker_Tool", "wide", "orange", "icon",  "icons/colourpicker.svg", "Colour Picker"],
    ["Online_Tools", "3", "website", "http://textmechanic.com/", "small", "green", "icon", "icons/textmechanic.svg", "Text Mechanic"],
    ["Online_Tools", "3", "website", "http://www.speedtest.net/", "small", "purple", "icon", "icons/speedtest.svg", "Speed Test"],
    ["Online_Tools", "4", "website", "https://bitly.com/", "wide", "orange", "icon", "icons/bitly.svg", "Bit.ly"],
    ["Online_Tools", "4", "website", "https://www.draw.io/", "wide", "green", "icon", "icons/drawio.svg", "Draw.io"],
    ["Online_Tools", "4", "website", "https://repl.it/", "wide", "blue", "icon", "icons/replit.svg", "Repl.it"]
  ]

  // Store settings
  var storage = $.localStorage;
  var defaultSettings = {
    version: 2,
    dim: "0",
    quickAccess: [],
    customPages: defaultCustom.slice(0),
    background: 0,
    gradient: false
  }
  var message = 
    "<ul>" +
      "<li><kbd>Click</kbd> to open tile in current tab.</li>" +
      "<li><kbd>Ctrl</kbd> + <kbd>Click</kbd> to open tile in new tab.</li>" +
      "<li><kbd>Shift</kbd> + <kbd>Click</kbd> to open tile in tab screen.</li>" +
      "<li><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Click</kbd> to open tile in new tab and move to it.</li>" +
      "<li>Input text in the search text field to search for that using different search engines</li>" +
      "<li>Most icons were taken from <a href='http://www.flaticon.com/'>Flaticon</a>.</li>" +
    "</ul>";

  if(!storage.get("homepage") || !storage.get("homepage")["version"] || storage.get("homepage")["version"] != 2){
    storage.set("homepage", defaultSettings);
    var settings = storage.get("homepage");
    var dim = storage.get("homepage")["dim"];
  } else {
    var settings = storage.get("homepage");
    var dim = storage.get("homepage")["dim"];
    var newQuickAccess = "";
    var newCustomPages = "";
    for(var i = 0; i < settings["quickAccess"].length; i++){
      newQuickAccess += settings["quickAccess"][i].join(" ") + "\n";
    }
    for(var i = 0; i < settings["customPages"].length; i++){
      newCustomPages += settings["customPages"][i].join(" ") + "\n";
    }
    $("#dimmer").css("opacity", dim);
    $("#quick-access-input").val(newQuickAccess.slice(0, -1));
    $("#custom-pages-input").val(newCustomPages.slice(0, -1));
    $($("#background-select").children()[settings["background"]]).prop("selected", true);
    $("#gradient-checkbox").prop("checked", settings["gradient"]);
  }


  // Save new settings
  $("#save").click(function(){
    var currentQuickAccess = $("#quick-access-input").val();
    var currentCustom = $("#custom-pages-input").val();
    var currentBackground = $("#background-select *:selected").index();
    var currentGradient = $("#gradient-checkbox").prop("checked");
    var newQuickAccess = [];
    var newCustom = [];
    if((!/^(\S+ .+(\n+)?)+$/g.test(currentQuickAccess)) && (currentQuickAccess != "")){
      alert("There is something wrong with your quick access list. Please follow the syntax and try again.");
      return false
    }
    if((!/^((\S+ [1-4] section \S+ (small|wide) (blue|green|orange|purple|red) (icon \S+|text)|\S+ [1-4] website \S+ (small|wide) (blue|green|orange|purple|red) (icon \S+ .+|text .+))(\n+)?)+$/g.test(currentCustom)) && (currentCustom != "")){
      alert("There is something wrong with your custom pages list. Please follow the syntax and try again.");
      return false;
    }
    currentQuickAccess = currentQuickAccess.split("\n").filter(function(x){return x !== ""});
    for(var i = 0; i < currentQuickAccess.length; i++){
      newQuickAccess.push([currentQuickAccess[i].split(" ")[0], currentQuickAccess[i].split(" ").splice(1).join(" ")]);
    }
    var newCustom = [];
    currentCustom = currentCustom.split("\n").filter(function(x){return x !== ""});
    if(currentCustom == []){
      currentCustom = "empty";
    }
    for(var i = 0; i < currentCustom.length; i++){
      if(currentCustom[i].split(" ")[2] == "section"){
        var newCustomItem = [
          currentCustom[i].split(" ")[0],
          currentCustom[i].split(" ")[1],
          "section",
          currentCustom[i].split(" ")[3],
          currentCustom[i].split(" ")[4],
          currentCustom[i].split(" ")[5],
          currentCustom[i].split(" ")[6],
          currentCustom[i].split(" ").splice(7).join(" ")
        ];
        newCustom.push(newCustomItem);
      } else {
        if(currentCustom[i].split(" ")[6] == "icon"){
          var newCustomItem = [
            currentCustom[i].split(" ")[0],
            currentCustom[i].split(" ")[1],
            "website",
            currentCustom[i].split(" ")[3],
            currentCustom[i].split(" ")[4],
            currentCustom[i].split(" ")[5],
            "icon",
            currentCustom[i].split(" ")[7],
            currentCustom[i].split(" ").splice(8).join(" ")
          ];
          newCustom.push(newCustomItem);
        } else {
          var newCustomItem = [
            currentCustom[i].split(" ")[0],
            currentCustom[i].split(" ")[1],
            "website",
            currentCustom[i].split(" ")[3],
            currentCustom[i].split(" ")[4],
            currentCustom[i].split(" ")[5],
            "text",
            currentCustom[i].split(" ").splice(7).join(" ")
          ]
          newCustom.push(newCustomItem);
        }
      }
    }
    var newSettings = {
      version: 2,
      dim: storage.get("homepage")["dim"],
      quickAccess: newQuickAccess,
      customPages: newCustom,
      background: currentBackground,
      gradient: currentGradient,
    }
    storage.set("homepage", newSettings);
    window.top.location.href = "index.html";
  });


  // Reset settings when #reset is clicked
  $("#reset").click(function(){
    storage.remove("homepage");
    window.top.location.href = "index.html";
  });


  // Fill in the quick access list
  for(var i = 0; i < settings["quickAccess"].length; i++){
    var newItem = "<li><a href='" + settings["quickAccess"][i][0] + "'>" + settings["quickAccess"][i][1] + "</a></li>";
    $("#quick-access").append(newItem);
  }


  // Fill the custom pages list
  var customPages = settings["customPages"];
  for(var i = 0; i < customPages.length; i++){
    var currentItem = customPages[i];
    if($("#section-" + currentItem[0]).length == 0){
      var newSection =
        "<div id='section-" + currentItem[0] + "' class='container tile-container display-none'>" +
          "<div id='nav-bar'>" +
            "<div class='row'>" +
              "<div class='span9'>" +
                "<div id='header-container'>" +
                  "<a id='custom-back' class='win-backbutton win-commandicon win-commandring pointer'></a>" +
                  "<div class='dropdown'>" +
                    "<h1 class='header-dropdown'>" + currentItem[0].replace(/_/g, " ") + "</h1>" +
                  "</div>" +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
          "<div class='metro'>" +
            "<div class='tile-column-span-2 column-1'></div>" +
            "<div class='tile-column-span-2 column-2'></div>" +
            "<div class='tile-column-span-2 column-3'></div>" +
            "<div class='tile-column-span-2 column-4'></div>" +
          "</div>" +
        "</div>";
      $("#main-html body").append(newSection);
    }
    if(currentItem[2] == "section"){
      if(currentItem[6] == "icon"){
        var newTile =
          "<a class='tile " + currentItem[4] + " app bg-color-" + currentItem[5] + " goto' data-goto='section-" + currentItem[3] + "'>" +
            "<div class='image-wrapper'>" +
              "<img src='" + currentItem[7] + "'>" +
            "</div>" +
            "<div class='app-label'>" + currentItem[3].replace(/_/g, " ") + "</div>" +
          "</a>";
      } else {
        var newTile =
          "<a class='tile " + currentItem[4] + " text bg-color-" + currentItem[5] + " goto' data-goto='section-" + currentItem[3] + "'>" +
            "<div class='text'><h3>" + currentItem[3].replace(/_/g, " ") + "</h3></div>" +
          "</a>";
      }
    } else {
      if(currentItem[6] == "icon"){
        var newTile =
          "<a class='tile " + currentItem[4] + " app bg-color-" + currentItem[5] + "' href='" + currentItem[3] + "'>" +
            "<div class='image-wrapper'>" +
              "<img src='" + currentItem[7] + "'>" +
            "</div>" +
            "<div class='app-label'>" + currentItem[8] + "</div>" +
          "</a>";
      } else {
        var newTile =
          "<a class='tile " + currentItem[4] + " text bg-color-" + currentItem[5] + "' href='" + currentItem[3] + "'>" +
            "<div class='text'><h3>" + currentItem[7] + "</h3></div>" +
          "</a>";
      }
    }
    $("#section-" + currentItem[0] + " .column-" + currentItem[1]).append(newTile);
  }


  // Change the background
  switch(settings["background"]){
    case 0:
      $("html#main-html, body#index-body").css("background-color", "#1d1d1d");
      break;
    case 1:
      $("html#main-html, body#index-body").css("background-color", "#09091c");
      break;
    case 2:
      $("html#main-html, body#index-body").css("background-color", "#091c1c");
      break;
    case 3:
      $("html#main-html, body#index-body").css("background-color", "#091c09");
      break;
    case 4:
      $("html#main-html, body#index-body").css("background-color", "#1c1209");
      break;
    case 5:
      $("html#main-html, body#index-body").css("background-color", "#1c091c");
      break;
    case 6:
      $("html#main-html, body#index-body").css("background-color", "#12091c");
      break;
    case 7:
      $("html#main-html, body#index-body").css("background-color", "#1c0909");
      break;
    case 8:
      $("html#main-html, body#index-body").css("background-color", "#1c1c09");
  }


  // Add gradient effect if needed
  if(settings["gradient"]){
    $(".bg-color-blue").css("cssText", "background: linear-gradient(to right, #2672ec 0%,#2e8def 100% !important");
    $(".bg-color-green").css("cssText", "background: linear-gradient(to right, #008a00 0%,#00a600 100% !important");
    $(".bg-color-orange").css("cssText", "background: linear-gradient(to right, #d24726 0%,#dc572e 100% !important");
    $(".bg-color-purple").css("cssText", "background: linear-gradient(to right, #5133ab 0%,#643ebf 100% !important");
    $(".bg-color-red").css("cssText", "background: linear-gradient(to right, #ac193d 0%,#bf1e4b 100% !important");
  }


  // Add hotkeys
  $(".tile:not(.goto)").click(function(e){
    if(e.shiftKey && !e.ctrlKey && e.which === 1){
      e.preventDefault();
      window.location.href = $(this).attr("href");
    } else if(!e.shiftKey && !e.ctrlKey && e.which === 1){
      e.preventDefault();
      window.top.location.href = $(this).attr("href");
    }
  });


  // Switch to main.html when #home is clicked
  $("#home").on("click", function(){
    $("#iframe-screen").attr("src", "main.html");
  });


  // Switch to settings.html when #settings is clicked
  $("#settings").on("click", function(){
    $("#iframe-screen").attr("src", "settings.html");
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
    }
  });


  // Show information when #info is clicked
  $("#info").click(function(){
    BootstrapDialog.show({
      closable: false,
      title: "Information",
      message: message,
      buttons: [{
        label: "Close",
        cssClass: "btn-default no-radius",
        action: function(dialogItself){
          dialogItself.close();
        }
      }]
    });
  });


  // Dim screen when needed
  $("#dim-0").click(function(){$("#dimmer").css("opacity", "0"); settings["dim"] = "0"; storage.set("homepage", settings);});
  $("#dim-01").click(function(){$("#dimmer").css("opacity", "0.1"); settings["dim"] = "0.1"; storage.set("homepage", settings);});
  $("#dim-02").click(function(){$("#dimmer").css("opacity", "0.2"); settings["dim"] = "0.2"; storage.set("homepage", settings);});
  $("#dim-03").click(function(){$("#dimmer").css("opacity", "0.3"); settings["dim"] = "0.3"; storage.set("homepage", settings);});
  $("#dim-04").click(function(){$("#dimmer").css("opacity", "0.4"); settings["dim"] = "0.4"; storage.set("homepage", settings);});
  $("#dim-05").click(function(){$("#dimmer").css("opacity", "0.5"); settings["dim"] = "0.5"; storage.set("homepage", settings);});
  $("#dim-06").click(function(){$("#dimmer").css("opacity", "0.6"); settings["dim"] = "0.6"; storage.set("homepage", settings);});
  $("#dim-07").click(function(){$("#dimmer").css("opacity", "0.7"); settings["dim"] = "0.7"; storage.set("homepage", settings);});
  $("#dim-08").click(function(){$("#dimmer").css("opacity", "0.8"); settings["dim"] = "0.8"; storage.set("homepage", settings);});
  $("#dim-09").click(function(){$("#dimmer").css("opacity", "0.9"); settings["dim"] = "0.9"; storage.set("homepage", settings);});
  $("#dim-1").click(function(){$("#dimmer").css("opacity", "1"); settings["dim"] = "1"; storage.set("homepage", settings);});


  // Google search
  $("#search, #search-web").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/search?q=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  $("#search-images").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/search?tbm=isch&q=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  $("#search-videos").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/search?tbm=vid&q=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  $("#search-maps").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/maps?q=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  $("#search-youtube").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.youtube.com/results?search_query=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  $("#search-url").on("click", function(){
    var searchUrl = $("#search-input").val();
    if(searchUrl.substring(0, 8) == "https://" || searchUrl.substring(0, 7) == "http://"){
      $("#iframe-screen").attr("src", searchUrl);
    } else {
      $("#iframe-screen").attr("src", "http://" + searchUrl);
    }
  });


  $("#search-input").keypress(function(e){
    if(e.which == 13){
      e.preventDefault();
      var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
      searchUrl = "https://www.google.com/search?q=" + searchUrl;
      window.open(searchUrl, "_blank");
    }
  });

  // Hide all containers then show the main container
  $(".tile-container").hide().addClass("tile-hidden");
  $("#section-Main").show().removeClass("tile-hidden");


  // Remove display-none from all containers
  $(".display-none").removeClass("display-none");


  // Show a specific container when needed
  $(".goto").click(function(){
    gotoContainer = $("#" + $(this).attr("data-goto"));
    $(".tile-container").addClass("tile-hidden");
    setTimeout(function(){
      $(".tile-container").hide();
      gotoContainer.show();
      gotoContainer.removeClass("tile-hidden");
    }, 230);
  });


  $(".win-backbutton").click(function(){
    $(".tile-container").addClass("tile-hidden");
    setTimeout(function(){
      $(".tile-container").hide();
      $("#section-Main").show();
      $("#section-Main").removeClass("tile-hidden");
    }, 230);
  });

  // Resize .tile-container depending on the size of the window
  if($(window).width() >= 1296){
    $(".tile-container").css("width", "1296px");
  } else if($(window).width() <= 1295 && $(window).width() >= 667){
    $(".tile-container").css("width", "648px");
  } else if($(window).width() <= 667){
    $(".tile-container").css("width", "324px");
  }
  if(($(window).height() - $(".tile-container").height()) / 2 >= 16){
    $(".tile-container").css("margin-top", ($(window).height() - $(".tile-container").height()) / 2 - 10 + "px");
  } else {
    $(".tile-container").css("margin-top", "15px");
  }


  // Resize .tile-container on window resize
  $(window).resize(function(){
    if($(window).width() >= 1296){
      $(".tile-container").css("width", "1296px");
    } else if($(window).width() <= 1295 && $(window).width() >= 667){
      $(".tile-container").css("width", "648px");
    } else if($(window).width() <= 667){
      $(".tile-container").css("width", "324px");
    }
    if(($(window).height() - $(".tile-container").height()) / 2 >= 16){
      $(".tile-container").css("margin-top", ($(window).height() - $(".tile-container").height()) / 2 - 10 + "px");
    } else {
      $(".tile-container").css("margin-top", "15px");
    }
  });


  // Show more info when #settings-quick-access or #settings-custom-pages is clicked
  $("#settings-quick-access").click(function(){
    $("#help-quick-access").fadeToggle();
  });

  $("#settings-custom-pages").click(function(){
    $("#help-custom-pages").fadeToggle();
  });
});
