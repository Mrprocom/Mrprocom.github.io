$(document).ready(function(){
  var smallScreen = false;
  var hashChangeTree = false;
  var tree = [{
    text: "Reference",
    selectable: false,
    nodes: [
      {text: "Welcome", state: {selected: true}},
      {text: "Useful Pages"},
      {text: "Game Interface"},
      {text: "Game Shortcuts"},
      {text: "Elements List"},
      {text: "Element Properties"},
      {text: "Console"},
      {text: "Saves"},
      {text: "Forum"},
      {text: "Tutorials"},
      {text: "IRC Channel"},
      {text: "Mods and Lua Scripts"},
      {text: "Official Wiki"},
      {text: "Lua Reference"},
      {text: "C++ Reference"},
      {text: "Rules"},
      {text: "Notable Users"},
      {text: "Tips and FAQ"}
    ]
  }];

  var treeId = [
    "main",
    "welcome",
    "pages",
    "interface",
    "shortcuts",
    "elements",
    "elementprop",
    "console",
    "saves",
    "forum",
    "savetutorials",
    "irc",
    "mods",
    "wiki",
    "lua",
    "cpp",
    "rules",
    "notable",
    "faq"
  ];

  var welcomeDialog =
    "<div id='welcome-carousel' class='carousel slide' data-interval='false'>" +
      "<div class='carousel-inner' role='listbox'>" +
        "<div class='item active'><img src='images/welcome.png' alt='Image'>" +
        "<div class='carousel-caption'>Welcome to The Ultimate Powder Toy Reference, a huge reference containing a lot of useful information to learn and come back to. It even includes the whole wiki page, which makes it more useful.</div></div>" +
        "<div class='item'><img src='gif/welcome/welcome1.gif' alt='Animation'>" +
        "<div class='carousel-caption'>Click on a title from the column on the left to read more about it. It is recommended to view them in order for beginners. Some topics like the ones related to coding are optional to read about.</div></div>" +
        "<div class='item'><img src='gif/welcome/welcome2.gif' alt='Animation'>" +
        "<div class='carousel-caption'>Clicking a title or a subtitle within a topic will change the URL of the page, this is useful for giving direct links to specific parts and topics of the reference to someone else to read more about it.</div></div>" +
        "<div class='item'><img src='gif/welcome/welcome3.gif' alt='Animation'>" +
        "<div class='carousel-caption'>Holding <kbd>Shift</kbd> and clicking on any link changes this area of the page to view the page the link directs to, this is useful for opening links without leaving this page. Not all links can be viewed this way.</div></div>" +
        "<div class='item'><img src='gif/welcome/welcome4.gif' alt='Animation'>" +
        "<div class='carousel-caption'>Holding <kbd>Ctrl+Shift</kbd> and clicking on any link opens up the link as a dialog box, this also allows viewing links without leaving this page, and not all links can be viewed this way as well.</div></div>" +
        "<div class='item'><img src='gif/welcome/welcome5.gif' alt='Animation'>" +
        "<div class='carousel-caption'>Press the Quick Search button in the Welcome page to quickly navigate to a specific topic, or press <kbd>E</kbd> while viewing any topic to bring up Quick Search with a search query that views all subtopics of the current topic.</div></div>" +
        "<div class='item'><img src='images/responsive.png' alt='Image'>" +
        "<div class='carousel-caption'>The design used to make this reference is simple and comfortable for the eyes, especially at night. The design used in the reference is also responsive, meaning that it can be viewed on smaller devices.</div></div>" +
      "</div>" +
      "<a class='left carousel-control' href='#welcome-carousel' role='button' data-slide='prev'>" +
      "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span></a>" +
      "<a class='right carousel-control' href='#welcome-carousel' role='button' data-slide='next'>" +
      "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span></a>" +
    "</div>";

  // Add the tree
  $("#tree").treeview({
    data: tree,
    expandIcon: "glyphicon glyphicon-chevron-right",
    collapseIcon: "glyphicon glyphicon-chevron-down",
    emptyIcon: "glyphicon glyphicon-record"
  });

  // Make #back-button view the tree
  $("#back-button").click(function(){
    $("#tree").css("display", "block")
  });

  // Change the layout of the page when the window is small
  if($(window).width() <= 767){
    $("#back-button").css("display", "block");
    $("#viewer-frame").css("height", "calc(100% - 45px)");
    $("#title h2").text("Powder Toy Reference");
    smallScreen = true;
  }

  $(window).resize(function(){
    if($(window).width() <= 767){
      $("#back-button").css("display", "block");
      $("#viewer-frame").css("height", "calc(100% - 45px)");
      $("#title h2").text("Powder Toy Reference");
      smallScreen = true;
    } else {
      $("#back-button").css("display", "none");
      $("#tree").css("display", "block");
      $("#viewer-frame").css("height", "100%");
      $("#title h2").text("The Ultimate Powder Toy Reference");
      smallScreen = false;
    }
  });

  // Select the node specified from the url
  nodeIdName = location.hash.replace("#", "").split("#")[0].toLowerCase();
  if(location.hash.replace("#", "").split("#").length > 1){
    var subTopic = "#" + location.hash.replace("#", "").split("#")[1].toLowerCase();
  } else {
    var subTopic = "";
  }

  if(treeId.indexOf(nodeIdName) > -1){
    nodeIdNum = treeId.indexOf(nodeIdName);
    $("#tree").treeview("revealNode", [nodeIdNum]);
    $("#tree").treeview("selectNode", [nodeIdNum]);
    $("#viewer-frame").attr("src", "pages/" + nodeIdName + ".html" + subTopic);
    if(smallScreen){
      $("#tree").css("display", "none");
    }
  }

  // Listen for nodeSelected
  $("#tree").on("nodeSelected", function(event, data){
    hashChangeTree = true;
    location.hash = "#" + treeId[data.nodeId];
    $("#viewer-frame").attr("src", "pages/" + treeId[data.nodeId] + ".html");
    if(smallScreen){
      $("#tree").css("display", "none");
    }
  });

  // Hide some carousel control arrows when it is on the first or last slide
  $(document).on("click", "#welcome-carousel .carousel-control", function(){
    setTimeout(function(){
      $("#welcome-carousel .carousel-control").show();
      if($("#welcome-carousel .carousel-inner .item:first").hasClass("active")){
        $("#welcome-carousel .carousel-control.left").hide();
      } else if($("#welcome-carousel .carousel-inner .item:last").hasClass("active")){
        $("#welcome-carousel .carousel-control.right").hide();
      }
    }, 608);
  });

  // View a welcome dialog box
  if(!$.localStorage.get("tptreference")){
    BootstrapDialog.show({
      title: "Startup Guide",
      message: welcomeDialog,
      cssClass: "welcome-dialog"
    });
    $.localStorage.set("tptreference", true);
  }

  // Make sure #viewer-frame stays focused
  $(document).click(function(){
    $("#viewer-frame").focus();
  });

  // Reload page when hash changes, fixes problem with parent page not changing when a link is clicked within the iframe
  $(window).on("hashchange", function(){
    if(hashChangeTree){
      hashChangeTree = false;
    } else {
      location.reload();
    }
  });
});
