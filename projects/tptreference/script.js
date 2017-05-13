$(document).ready(function(){
  var smallScreen = false;
  var tree = [{
    text: "Reference",
    selectable: false,
    nodes: [
      {text: "Welcome"},
      {text: "Useful Pages"},
      {text: "Game Interface"},
      {text: "Game Shortcuts"},
      {text: "Elements List"},
      {text: "Console"},
      {text: "Saves"},
      {text: "Forum"},
      {text: "Tutorials"},
      {text: "IRC Channel"},
      {text: "Mods and Lua Scripts"},
      {text: "Official Wiki"},
      {text: "Lua Reference"},
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
    "console",
    "saves",
    "forum",
    "tutorials",
    "irc",
    "mods",
    "wiki",
    "lua",
    "rules",
    "notable",
    "faq"
  ];

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
    location.hash = "#" + treeId[data.nodeId];
    $("#viewer-frame").attr("src", "pages/" + treeId[data.nodeId] + ".html");
    if(smallScreen){
      $("#tree").css("display", "none");
    }
  });
});
