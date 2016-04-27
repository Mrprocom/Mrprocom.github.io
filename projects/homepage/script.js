$(document).ready(function(){

  // Store settings
  var storage = $.localStorage;
  var defaultSettings = {
    quickAccess: [],
    customPages0: [],
    customPages1: [],
    customPages2: [],
    customPages3: [],
    background: 0,
    gradient: false,
    customFirst: false
  }
  var sections = {
    access: ["icons/access.svg", "Quick Access"],
    communication: ["icons/communication.svg", "Communication"],
    entertainment: ["icons/entertainment.svg", "Entertainment"],
    games: ["icons/games.svg", "Games"],
    knowledge: ["icons/knowledge.svg", "Knowledge"],
    media: ["icons/media.svg", "Media Share"],
    microsoft: ["icons/microsoft.svg", "Microsoft"],
    miscellaneous: ["icons/miscellaneous.svg", "Miscellaneous"],
    news: ["icons/news.svg", "News"],
    search: ["icons/search.svg", "Search"],
    social: ["icons/social.svg", "Social Media"],
    store: ["icons/store.svg", "Store"],
    tools: ["icons/tools.svg", "Online Tools"]
  }
  var message = 
    "<ul>" +
      "<li><kbd>Click</kbd> to open tile in current tab.</li>" +
      "<li><kbd>Ctrl</kbd> + <kbd>Click</kbd> to open tile in new tab.</li>" +
      "<li><kbd>Shift</kbd> + <kbd>Click</kbd> to open tile in tab screen.</li>" +
      "<li><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Click</kbd> to open tile in new tab and move to it.</li>" +
      "<li>Input text in the search text field to search for that using different search engines</li>" +
      "<li>Over 60% of all icons are from <a href='http://www.flaticon.com/'>Flaticon</a>.</li>" +
    "</ul>";

  if(!storage.get("dim")){
    storage.set("dim", "0");
  }
  
  var dim = storage.get("dim");

  if(!storage.get("settings")){
    storage.set("settings", defaultSettings);
    var settings = storage.get("settings");
  } else {
    var settings = storage.get("settings");
    var newQuickAccess = "";
    var newCustomPages0 = "";
    var newCustomPages1 = "";
    var newCustomPages2 = "";
    var newCustomPages3 = "";
    for(var i = 0; i < settings["quickAccess"].length; i++){
      newQuickAccess += settings["quickAccess"][i].join(" ") + "\n";
    }
    for(var i = 0; i < settings["customPages0"].length; i++){
      newCustomPages0 += settings["customPages0"][i].join(" ") + "\n";
    }
    for(var i = 0; i < settings["customPages1"].length; i++){
      newCustomPages1 += settings["customPages1"][i].join(" ") + "\n";
    }
    for(var i = 0; i < settings["customPages2"].length; i++){
      newCustomPages2 += settings["customPages2"][i].join(" ") + "\n";
    }
    for(var i = 0; i < settings["customPages3"].length; i++){
      newCustomPages3 += settings["customPages3"][i].join(" ") + "\n";
    }
    $("#quick-access-input").val(newQuickAccess.slice(0, -1));
    $("#custom-pages0-input").val(newCustomPages0.slice(0, -1));
    $("#custom-pages1-input").val(newCustomPages1.slice(0, -1));
    $("#custom-pages2-input").val(newCustomPages2.slice(0, -1));
    $("#custom-pages3-input").val(newCustomPages3.slice(0, -1));
    $($("#background-select").children()[settings["background"]]).prop("selected", true);
    $("#gradient-checkbox").prop("checked", settings["gradient"]);
    $("#custom-first-checkbox").prop("checked", settings["customFirst"]);
  }


  // Save new settings
  $("#save").click(function(){
    var currentQuickAccess = $("#quick-access-input").val();
    var currentCustom = [
      $("#custom-pages0-input").val(),
      $("#custom-pages1-input").val(),
      $("#custom-pages2-input").val(),
      $("#custom-pages3-input").val()
    ];
    var currentBackground = $("#background-select *:selected").index();
    var currentGradient = $("#gradient-checkbox").prop("checked");
    var currentCustomFirst = $("#custom-first-checkbox").prop("checked");
    var newQuickAccess = [];
    var newCustom = [];
    if((!/^(\S+ .+(\n+)?)+$/g.test(currentQuickAccess)) && (currentQuickAccess != "")){
      alert("There is something wrong with your quick access list. Please follow the syntax and try again.");
      return false
    }
    if((!/^((section (access|communication|entertainment|games|knowledge|media|microsoft|miscellaneous|news|search|social|store|tools) (small|wide) (blue|green|orange|purple|red) (icon|text)|website \S+ (small|wide) (blue|green|orange|purple|red) (icon \S+ .+|text .+))(\n+)?)+$/g.test(currentCustom[0])) && (currentCustom[0] != "")){
      alert("There is something wrong with your custom pages list (column 1). Please follow the syntax and try again.");
      return false;
    }
    if((!/^((section (access|communication|entertainment|games|knowledge|media|microsoft|miscellaneous|news|search|social|store|tools) (small|wide) (blue|green|orange|purple|red) (icon|text)|website \S+ (small|wide) (blue|green|orange|purple|red) (icon \S+ .+|text .+))(\n+)?)+$/g.test(currentCustom[1])) && (currentCustom[1] != "")){
      alert("There is something wrong with your custom pages list (column 2). Please follow the syntax and try again.");
      return false;
    }
    if((!/^((section (access|communication|entertainment|games|knowledge|media|microsoft|miscellaneous|news|search|social|store|tools) (small|wide) (blue|green|orange|purple|red) (icon|text)|website \S+ (small|wide) (blue|green|orange|purple|red) (icon \S+ .+|text .+))(\n+)?)+$/g.test(currentCustom[2])) && (currentCustom[2] != "")){
      alert("There is something wrong with your custom pages list (column 3). Please follow the syntax and try again.");
      return false;
    }
    if((!/^((section (access|communication|entertainment|games|knowledge|media|microsoft|miscellaneous|news|search|social|store|tools) (small|wide) (blue|green|orange|purple|red) (icon|text)|website \S+ (small|wide) (blue|green|orange|purple|red) (icon \S+ .+|text .+))(\n+)?)+$/g.test(currentCustom[3])) && (currentCustom[3] != "")){
      alert("There is something wrong with your custom pages list (column 4). Please follow the syntax and try again.");
      return false;
    }
    currentQuickAccess = currentQuickAccess.split("\n").filter(function(x){return x !== ""});
    for(var i = 0; i < currentQuickAccess.length; i++){
      newQuickAccess.push([currentQuickAccess[i].split(" ")[0], currentQuickAccess[i].split(" ").splice(1).join(" ")]);
    }
    for(var i = 0; i < 4; i++){
      var newCustomSet = [];
      currentCustom[i] = currentCustom[i].split("\n").filter(function(x){return x !== ""});
      if(currentCustom[i] == []){
        currentCustom[i] = "empty";
      }
      for(var j = 0; j < currentCustom[i].length; j++){
        if(currentCustom[i][j].split(" ")[0] == "section"){
          var newCustomItem = [
            "section",
            currentCustom[i][j].split(" ")[1],
            currentCustom[i][j].split(" ")[2],
            currentCustom[i][j].split(" ")[3],
            currentCustom[i][j].split(" ")[4]
          ];
          newCustomSet.push(newCustomItem);
        } else {
          if(currentCustom[i][j].split(" ")[4] == "icon"){
            var newCustomItem = [
              "website",
              currentCustom[i][j].split(" ")[1],
              currentCustom[i][j].split(" ")[2],
              currentCustom[i][j].split(" ")[3],
              "icon",
              currentCustom[i][j].split(" ")[5],
              currentCustom[i][j].split(" ").splice(6).join(" ")
            ];
            newCustomSet.push(newCustomItem);
          } else {
            var newCustomItem = [
              "website",
              currentCustom[i][j].split(" ")[1],
              currentCustom[i][j].split(" ")[2],
              currentCustom[i][j].split(" ")[3],
              "text",
              currentCustom[i][j].split(" ").splice(5).join(" ")
            ]
            newCustomSet.push(newCustomItem);
          }
        }
      }
      newCustom.push(newCustomSet);
    }
    var newSettings = {
      quickAccess: newQuickAccess,
      customPages0: newCustom[0],
      customPages1: newCustom[1],
      customPages2: newCustom[2],
      customPages3: newCustom[3],
      background: currentBackground,
      gradient: currentGradient,
      customFirst: currentCustomFirst
    }
    storage.set("settings", newSettings);
    window.top.location.href = "index.html";
  });


  // Fill in the quick access list
  for(var i = 0; i < settings["quickAccess"].length; i++){
    var newItem = "<li><a href='" + settings["quickAccess"][i][0] + "'>" + settings["quickAccess"][i][1] + "</a></li>";
    $("#quick-access").append(newItem);
  }


  // Fill the custom pages list
  var customPages = [settings["customPages0"], settings["customPages1"], settings["customPages2"], settings["customPages3"]];
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < customPages[i].length; j++){
      var currentItem = customPages[i][j];
      if(currentItem[0] == "section"){
        if(currentItem[4] == "icon"){
          var newTile =
            "<a class='tile " + currentItem[2] + " app bg-color-" + currentItem[3] + " goto' data-goto='section-" + currentItem[1] + "'>" +
              "<div class='image-wrapper'>" +
                "<img src='" + sections[currentItem[1]][0] + "'>" +
              "</div>" +
              "<div class='app-label'>" + sections[currentItem[1]][1] + "</div>" +
            "</a>";
        } else {
          var newTile =
            "<a class='tile " + currentItem[2] + " text bg-color-" + currentItem[3] + " goto' data-goto='section-" + currentItem[1] + "'>" +
              "<div class='text'><h3>" + sections[currentItem[1]][1] + "</h3></div>" +
            "</a>";
        }
      } else {
        if(currentItem[4] == "icon"){
          var newTile =
            "<a class='tile " + currentItem[2] + " app bg-color-" + currentItem[3] + "' href='" + currentItem[1] + "'>" +
              "<div class='image-wrapper'>" +
                "<img src='" + currentItem[5] + "'>" +
              "</div>" +
              "<div class='app-label'>" + currentItem[6] + "</div>" +
            "</a>";
        } else {
          var newTile =
            "<a class='tile " + currentItem[2] + " text bg-color-" + currentItem[3] + "' href='" + currentItem[1] + "'>" +
              "<div class='text'><h3>" + currentItem[5] + "</h3></div>" +
            "</a>";
        }
      }
      $("#column-" + (i + 1)).append(newTile);
    }
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


  // Set dim level to how it used it be last time
  $("#dimmer").css("opacity", dim);


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


  // Alert the IP address when #ip is clicked
  $("#ip").click(function(){
    $.get("https://api.ipify.org/", function(data){
      BootstrapDialog.show({
        size: BootstrapDialog.SIZE_SMALL,
        closable: false,
        title: "Your Visible IP Address",
        message: "<input type='text' class='ip-input' value='" + data + "' readonly></input>",
        buttons: [{
          id: "copy",
          label: "Copy",
          cssClass: "btn-default no-radius"
        }, {
          label: "Close",
          cssClass: "btn-default no-radius",
          action: function(dialogItself){
            dialogItself.close();
          }
        }]
      });
    });
  });

  $(document).on("click", "#copy", function(){
    $(".ip-input").select();
    document.execCommand("copy");
  });

  $(document).on("click", ".ip-input", function(){
     $(this).select();
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
  $("#dim-0").click(function(){$("#dimmer").css("opacity", "0"); storage.set("dim", "0");});
  $("#dim-01").click(function(){$("#dimmer").css("opacity", "0.1"); storage.set("dim", "0.1");});
  $("#dim-02").click(function(){$("#dimmer").css("opacity", "0.2"); storage.set("dim", "0.2");});
  $("#dim-03").click(function(){$("#dimmer").css("opacity", "0.3"); storage.set("dim", "0.3");});
  $("#dim-04").click(function(){$("#dimmer").css("opacity", "0.4"); storage.set("dim", "0.4");});
  $("#dim-05").click(function(){$("#dimmer").css("opacity", "0.5"); storage.set("dim", "0.5");});
  $("#dim-06").click(function(){$("#dimmer").css("opacity", "0.6"); storage.set("dim", "0.6");});
  $("#dim-07").click(function(){$("#dimmer").css("opacity", "0.7"); storage.set("dim", "0.7");});
  $("#dim-08").click(function(){$("#dimmer").css("opacity", "0.8"); storage.set("dim", "0.8");});
  $("#dim-09").click(function(){$("#dimmer").css("opacity", "0.9"); storage.set("dim", "0.9");});
  $("#dim-1").click(function(){$("#dimmer").css("opacity", "1"); storage.set("dim", "1");});


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
  if(settings["customFirst"]){
    $("#section-custom").show().removeClass("tile-hidden");
  } else {
    $("#section-main").show().removeClass("tile-hidden");
  }


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


  // Return to main section when back arrow is clicked
  $("#custom-back").click(function(){
    $(".tile-container").addClass("tile-hidden");
    setTimeout(function(){
      $(".tile-container").hide();
      $("#section-main").show();
      $("#section-main").removeClass("tile-hidden");
    }, 230);
  });

  $(".win-backbutton:not(#custom-back)").click(function(){
    $(".tile-container").addClass("tile-hidden");
    setTimeout(function(){
      $(".tile-container").hide();
      if(settings["customFirst"]){
        $("#section-custom").show();
        $("#section-custom").removeClass("tile-hidden");
      } else {
        $("#section-main").show();
        $("#section-main").removeClass("tile-hidden");
      }
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
