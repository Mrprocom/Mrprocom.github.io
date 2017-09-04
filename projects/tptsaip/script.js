var nodeCount = 0
var listed = [];
var cIndex = 0;
var userClr = {"Unknown User": "link-grey"};
var colours = ["link-red", "link-purple", "link-indigo", "link-blue", "link-cyan", "link-teal", "link-green", "link-yello", "link-orange", "link-brown"];
var oAuthor = "";

// This function converts a 1-digit integer to a 2-digit string
function zfill2(x){
  return x.toString().length == 1 ? "0" + x : x;
}

// This function assigns a new colour to username and returns the same colour every time for that same username
function getColour(username){
  if(userClr[username]){
    return userClr[username];
  }
  var newColour = colours[cIndex % 9];
  userClr[username] = newColour;
  cIndex += 1;
  return newColour;
}

// This function creates nodes that will be shown up on the left
function createNode(json, linked, indent, hDuplicates, hAuthor, hExternal){
  if(nodeCount == 0) oAuthor = json["username"];
  // If the settings do not allow the current node to be shown up, try the nodes linked to it without increasing the indentation
  if((hDuplicates && listed.indexOf(json["id"] || json["name"]) != -1) || (hAuthor && nodeCount != 0 && json["username"] == oAuthor)){
    for(var i in json["links"]){
      createNode(json["links"][i], linked.slice(), indent, hDuplicates, hAuthor, hExternal);
    }
    return;
  }
  var username = json["username"] || "Unknown User";
  var userLink = json["username"] ? "http://tpt.io/@" + username : "#";
  var linkColour = getColour(username);
  var id = json["id"] || json["type"];
  var description = (json["description"] || "").replace("'", "&apos;").replace("\"", "&quot;");
  var padding = "padding-left: calc(15px + " + (3.5 * indent) + "%)";
  var nameAbbr = username.slice(0, 2).toUpperCase();
  var saveLink = json["id"] ? "http://tpt.io/~" + id : "#";
  var saveTitle = json["title"] || (json["name"] || "").replace(/(stamps|Saves)(\\\\|\/)/, "") || "[Clipboard]";
  if(json["num"]) saveTitle = "[Tab " + json["num"] + "]";
  var newNode =
    "<div class='link " + linkColour + "' data-node='" + nodeCount + "' data-id='" + id + "' data-date='" + json["date"] + "' data-description='" + description + "' data-linked='" + linked.join(" ") + "' style='" + padding +"'>" +
      "<div class='link-avatar'>" + nameAbbr + "</div>" +
      "<div class='link-title'>" +
        "<a href='" + saveLink + "'><h4>" + saveTitle + "</h4></a>" +
        "<a href='" + userLink + "'><p>By " + username + "</p></a>" +
      "</div>" +
      "<div class='link-arrow link-expand'><img src='icons/expand.svg'></div>" +
    "</div>";

  $("#links").append(newNode);
  // By default, minimise everything
  for(var i = 0; i < linked.length; i++){
    $("[data-node=" + nodeCount + "]").prop(linked[i], false);
  }
  // Listed is used for the no duplicates setting
  listed.push(json["id"] || json["name"]);
  linked.push("node" + nodeCount.toString());
  nodeCount += 1;
  // Create all nodes linked to it
  if(!hExternal || (hExternal && json["username"] == oAuthor)){
    for(var i in json["links"]){
      createNode(json["links"][i], linked.slice(), indent + 1, hDuplicates, hAuthor, hExternal);
    }
  }
}

// This function removes unnecessary expand arrows
function filterArrows(){
  $(".link").each(function(i){
    var current = $(".link").eq(i);
    var nodeId = "node" + current.attr("data-node").split(" ");
    for(var j = 0; j < $(".link").length; j++){
      var linked = $(".link").eq(j).attr("data-linked").split(" ");
      if(linked.indexOf(nodeId) != -1) return;
    }
    current.find(".link-arrow").remove();
  });
}

// This function updates the node tree when the expand or minimise arrows are clicked
function updateTree(){
  $(".link").each(function(i){
    var current = $(".link").eq(i);
    var linked = current.attr("data-linked").split(" ");
    current.show();
    if(linked[0] != "" && !linked.every(function(j){return current.prop(j)})) current.hide();
  });
}

// This function displays information about the linked save on the right
function displayItem(item){
  var linkColour = $(item).attr("class").split(" ")[1];
  var id = $(item).attr("data-id");
  var description = $(item).attr("data-description");
  var shortDescription = description.length > 250 ? description.slice(0, 250).replace(/ +$/, "") + "..." : description;
  var title = $(item).find("h4").html();
  var titleLink = $(item).find("h4").parent().attr("href");
  var author = $(item).find("p").html();
  var authorLink = $(item).find("p").parent().attr("href")
  var nameAbbr = $(item).find(".link-avatar").html();
  var datetime = new Date(parseInt($(item).attr("data-date") * 1000));
  var date = zfill2(datetime.getDate()) + "/" + zfill2(datetime.getMonth() + 1) + "/" + datetime.getFullYear();
  var time = zfill2(datetime.getHours()) + ":" + zfill2(datetime.getMinutes()) + ":" + zfill2(datetime.getSeconds());
  if(id == "stamp"){
    $("#thumbnail").attr("src", "icons/stamp.svg");
  } else if(id == "clipboard"){
    $("#thumbnail").attr("src", "icons/clipboard.svg");
  } else if(id == "localsave"){
    $("#thumbnail").attr("src", "icons/localsave.svg");
  } else if(id == "tab"){
    $("#thumbnail").attr("src", "icons/tab.svg");
  } else {
    $("#thumbnail").attr("src", "http://static.powdertoy.co.uk/" + id + ".png");
  }
  $("#save-view").attr("href", "http://tpt.io/~" + id);
  $("#save-open").attr("href", "ptsave:" + id);
  $("#save-title").attr("href", "http://powdertoythings.co.uk/Powder/Saves/Search.html?Search_Query=sort%3Aid%20search%3Atitle%20" + encodeURIComponent(title));
  $("#save-similar").attr("href", "http://powdertoythings.co.uk/Powder/Saves/Search.html?Search_Query=search%3Asimilartitle%20" + encodeURIComponent(title));
  $("#save-description").attr("href", "http://powdertoythings.co.uk/Powder/Saves/Search.html?Search_Query=sort%3Aid%20search%3Adesc%20" + encodeURIComponent(description));
  $("#viewer-info").attr("class", "").addClass(linkColour);
  $("#viewer-info .link-avatar").html(nameAbbr);
  $("#viewer-title").attr("href", titleLink);
  $("#viewer-title h4").html(title);
  $("#viewer-author").attr("href", authorLink);
  $("#viewer-author p").html(author);
  $("#date").html(date);
  $("#time").html(time);
  $("#description").html(shortDescription);
  $("#description").attr("data-content", description);
}


$(document).ready(function(){

  var hDuplicates = true;
  var hAuthor = true;
  var hExternal = false;
  var json;
  var timer;

  // Enable tooltips and popovers
  $("[data-toggle='tooltip']").tooltip();
  $("[data-toggle='popover']").popover();

  // Convert the JSON string into an object and use it to create the nodes tree and the save viewer if it is valid
  $("#prettify").click(function(){
    try {
      json = $("#paste-area").val();
      json = json.replace(/\r?\n|\r/g, "").replace(/\\/g, "\\\\");
      json = JSON.parse(json);
      createNode(json, [], 0, hDuplicates, hAuthor, hExternal);
      updateTree();
      filterArrows();
      displayItem($(".link").eq(0));
      $("#json-input").fadeOut(500);
      setTimeout(function(){
        $("#json-input").remove();
      }, 500);
    } catch(e) {
      console.log(e);
      BootstrapDialog.show({
        title: "Error",
        message: "Error: Invalid JSON input."
      });
    }
  });

  // Set a default height for the thumbnail, change the title and bottom buttons depending on the width of the window and position .save-buttons
  $("#thumbnail").css("height", $("#viewer").width() / 1.59375);
  $("#title h1").html($(window).width() >= 518 ? "Save Authorship Info Prettifier" : "SAIP");
  $(".save-buttons").css("top", ($("#thumbnail").height() - 70) / 2 + "px");
  $(".save-buttons").css("left", ($("#thumbnail").width() - 235) / 2 + "px");
  if($(window).width() <= 767){
    $("#expand-all").html("Expand");
    $("#h-duplicates").html("Sh. Dup");
    $("#h-author").html("Sh. Aut");
    $("#h-external").html("Hd. Ext");
    $("#view-json").html("JSON");
  }

  // Update the thumbnail height, the title and bottom buttons and .save-buttons position on resize
  $(window).resize(function(){
    $("#thumbnail").css("height", $("#viewer").width() / 1.59375);
    $("#title h1").html($(window).width() >= 518 ? "Save Authorship Info Prettifier" : "SAIP");
    $(".save-buttons").css("top", ($("#thumbnail").height() - 70) / 2 + "px");
    $(".save-buttons").css("left", ($("#thumbnail").width() - 235) / 2 + "px");
    if($(window).width() <= 767){
      $("#expand-all").html("Expand");
      $("#h-duplicates").html($("#h-duplicates").html().replace("Show Duplicates", "Sh. Dup").replace("Hide Duplicates", "Hd. Dip"));
      $("#h-author").html($("#h-author").html().replace("Show Author Links", "Sh. Aut").replace("Hide Author Links", "Hd. Aut"));
      $("#h-external").html($("#h-external").html().replace("Show External Content", "Sh. Ext").replace("Hide External Content", "Hd. Ext"));
      $("#view-json").html("JSON");
    } else {
      $("#expand-all").html("Expand All");
      $("#h-duplicates").html($("#h-duplicates").html().replace("Sh. Dup", "Show Duplicates").replace("Hd. Dip", "Hide Duplicates"));
      $("#h-author").html($("#h-author").html().replace("Sh. Aut", "Show Author Links").replace("Hd. Aut", "Hide Author Links"));
      $("#h-external").html($("#h-external").html().replace("Sh. Ext", "Show External Content").replace("Hd. Ext", "Hide External Content"));
      $("#view-json").html("View JSON");
    }
  });

  // Reload page when #title is clicked
  $("#title").click(function(){
    location.reload();
  });

  // Use a custom thumbnail for 404 saves
  $("#thumbnail").on("error", function(){
    $(this).attr("src", "icons/404.svg");
  });

  // Show save options and darken #thumbnail on hover
  $("#thumbnail, .save-buttons").mouseout(function(){
    if($("#viewer-title").attr("href") != "#"){
      timer = setTimeout(function(){
        $(this).css("filter", "");
        $(".save-buttons").fadeOut(400);
      }, 10);
    }
  }).mouseover(function(){
    $("#thumbnail").css("filter", "brightness(50%)");
    $("#save-options").fadeIn(400);
    clearTimeout(timer);
  });

  // Show search-by options when #save-options is clicked
  $("#save-search").click(function(){
    $("#save-options").fadeOut(400);
    $("#search-options").fadeIn(400);
  });

  // Show linked nodes when .link-expand is clicked
  $(document).on("click", ".link-expand", function(e){
    e.stopPropagation()
    var currentNode = $(this).parents(".link").attr("data-node");
    $(".link").each(function(i){$(".link").eq(i).prop("node" + currentNode, true)});
    $(this).removeClass("link-expand").addClass("link-minimise");
    $(this).children("img").attr("src", "icons/minimise.svg");
    updateTree();
  });

  // Hide linked nodes when .link-minimise is clicked
  $(document).on("click", ".link-minimise", function(e){
    e.stopPropagation()
    var currentNode = $(this).parents(".link").attr("data-node");
    $(".link").each(function(i){$(".link").eq(i).prop("node" + currentNode, false)});
    $(this).removeClass("link-minimise").addClass("link-expand");
    $(this).children("img").attr("src", "icons/expand.svg");
    updateTree();
  });

  // Display information about the selected node on the right when .link is clicked
  $(document).on("click", ".link", function(){
    displayItem(this);
  });

  // Automatically hide #description popover on mouseout
  $("#description").mouseout(function(){
    if($(this).attr("aria-describedby")){
      $(this).click();
    }
  });

  // Show all nodes when #expand-all is clicked
  $("#expand-all").click(function(){
    $(".link").each(function(i){
      var current = $(".link").eq(i);
      var linked = current.attr("data-linked").split(" ");
      for(var j = 0; j < linked.length; j++){
        current.prop(linked[j], true);
      }
      $(".link-expand").eq(i).children().eq(0).attr("src", "icons/minimise.svg")
    });
    $(".link-expand").removeClass("link-expand").addClass("link-minimise");
    updateTree();
  });

  // Toggle these settings when their buttons are clicked
  $("#h-duplicates").click(function(){
    if($(window).width() >= 768){
      $(this).html(hDuplicates ? "Hide Duplicates" : "Show Duplicates");
    } else {
      $(this).html(hDuplicates ? "Hd. Dup" : "Sh. Dup");
    }
    hDuplicates = !hDuplicates;
    $(".link").remove();
    nodeCount = 0;
    listed = [];
    oAuthor = "";
    createNode(json, [], 0, hDuplicates, hAuthor, hExternal);
    updateTree();
    filterArrows();
    displayItem($(".link").eq(0));
  });

  $("#h-author").click(function(){
    if($(window).width() >= 768){
      $(this).html(hAuthor ? "Hide Author Links" : "Show Author Links");
    } else {
      $(this).html(hAuthor ? "Hd. Aut" : "Sh. Aut");
    }
    hAuthor = !hAuthor;
    $(".link").remove();
    nodeCount = 0;
    listed = [];
    oAuthor = "";
    createNode(json, [], 0, hDuplicates, hAuthor, hExternal);
    updateTree();
    filterArrows();
    displayItem($(".link").eq(0));
  });

  $("#h-external").click(function(){
    if($(window).width() >= 768){
      $(this).html(hExternal ? "Hide External Content" : "Show External Content");
    } else {
      $(this).html(hExternal ? "Hd. Ext" : "Sh. Ext");
    }
    hExternal = !hExternal;
    $(".link").remove();
    nodeCount = 0;
    listed = [];
    oAuthor = "";
    createNode(json, [], 0, hDuplicates, hAuthor, hExternal);
    updateTree();
    filterArrows();
    displayItem($(".link").eq(0));
  });

  // Show a dialog box containing a prettified JSON version
  $("#view-json").click(function(){
    BootstrapDialog.show({
      title: "JSON Format",
      message: "<pre class='json'></pre>",
      size: BootstrapDialog.SIZE_WIDE
    });
    setTimeout(function(){
      $(".json").jsonViewer(json, {withQuotes: true});
    }, 150);
  });
});
