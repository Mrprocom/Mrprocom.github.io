// This function checks if elem is visible
function isVisible(elem){
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
  return (elemBottom <= docViewBottom) && (elemTop >= docViewTop)
}


// This function converts Hex colours to RGB and returns the brightness
function brightness(hex){
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return Math.sqrt(0.299 * r**2 + 0.587 * g**2 + 0.114 * b**2);
}


// This is a sort function for sorting the element properties table
function comparer(index, reverse) {
  return function(a, b){
    var idA = $(a).children("td").eq(1).html();
    var idB = $(b).children("td").eq(1).html();
    if(index == 0){
      var valA = $(a).children("td").eq(0).find("a").html();
      var valB = $(b).children("td").eq(0).find("a").html();
    } else if(index == 2){
      var valA = brightness($(a).children("td").eq(2).html());
      var valB = brightness($(b).children("td").eq(2).html());
    } else if(index == 7){
      var valA = [];
      var valB = [];
      var prpA = $(a).children("td").eq(7).children(".property");
      var prpB = $(b).children("td").eq(7).children(".property");
      for(var i = 0; i < prpA.length; i++){
        var newProp = prpA.eq(i).attr("src").split("/")[2].split(".")[0];
        if(reverse){
          valB.push(newProp);
        } else {
          valA.push(newProp);
        }
      }
      for(var i = 0; i < prpB.length; i++){
        var newProp = prpB.eq(i).attr("src").split("/")[2].split(".")[0];
        if(reverse){
          valA.push(newProp);
        } else {
          valB.push(newProp);
        }
      }
      for(var i = 0; i < Math.max(valA.length, valB.length); i++){
        if(i > 0 && valA.length != valB.length) return valA.length - valB.length;
        if(valA[i] != valB[i]) return (valA[i] || "").localeCompare(valB[i] || "");
      }
      return idA - idB;
    } else {
      var valA = $(a).children("td").eq(index).html();
      var valB = $(b).children("td").eq(index).html();
    }
    if(valA == valB) return idA - idB;
    if(reverse) return $.isNumeric(valA) && $.isNumeric(valB) ? valB - valA : valA.localeCompare(valB) * -1;
    return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
  }
}


// This function prioritises selected properties when sorting the table
function propertyFilter(selectedProp){
  return function(a, b){
    var valA = [];
    var valB = [];
    var prpA = $(a).children("td").eq(7).children(".property");
    var prpB = $(b).children("td").eq(7).children(".property");
    var idA = $(a).children("td").eq(1).html();
    var idB = $(b).children("td").eq(1).html();
    for(var i = 0; i < prpA.length; i++){
      valA.push(prpA.eq(i).attr("data-prop"));
    }
    for(var i = 0; i < prpB.length; i++){
      valB.push(prpB.eq(i).attr("data-prop"));
    }
    totalA = selectedProp.every(function(i){return valA.indexOf(i) != -1}) ? 1 : 0;
    totalB = selectedProp.every(function(i){return valB.indexOf(i) != -1}) ? 1 : 0;
    valA.forEach(function(i){
      value = selectedProp.indexOf(i);
      if(value != -1) totalA += 10**(4 - value);
    });
    valB.forEach(function(i){
      value = selectedProp.indexOf(i);
      if(value != -1) totalB += 10**(4 - value);
    });
    if(totalA == totalB) return idA - idB;
    return totalB - totalA;
  }
}


$(document).ready(function(){

  var selectedProp = [];
  var searchMenu =
    "<input class='form-control' type='text' id='quick-search-bar' placeholder='Enter keywords to search'>" +
    "<hr>" +
    "<ul class='nav nav-pills nav-stacked' id='search-results'>" +
      "<li><a href='../#welcome' target='_top'></span><span class='text-danger'><b>#welcome:</b></span> Welcome</a></li>" +
      "<li><a href='../#pages' target='_top'></span><span class='text-danger'><b>#pages:</b></span> Useful Pages</a></li>" +
      "<li><a href='../#interface' target='_top'></span><span class='text-danger'><b>#interface:</b></span> Game Interface</a></li>" +
      "<li><a href='../#interface#hud' target='_top'></span><span class='text-danger'><b>#interface#hud:</b></span> Heads Up Display (HUD)</a></li>" +
      "<li><a href='../#interface#side' target='_top'></span><span class='text-danger'><b>#interface#side:</b></span> Quick Options and Categories</a></li>" +
      "<li><a href='../#interface#toolbar' target='_top'></span><span class='text-danger'><b>#interface#toolbar:</b></span> Toolbar</a></li>" +
      "<li><a href='../#interface#element' target='_top'></span><span class='text-danger'><b>#interface#element:</b></span> Element Selector</a></li>" +
      "<li><a href='../#interface#interactive' target='_top'></span><span class='text-danger'><b>#interface#interactive:</b></span> Interactive Version</a></li>" +
      "<li><a href='../#shortcuts' target='_top'></span><span class='text-danger'><b>#shortcuts:</b></span> Game Shortcuts</a></li>" +
      "<li><a href='../#shortcuts#mouse' target='_top'></span><span class='text-danger'><b>#shortcuts#mouse:</b></span> Mouse Shortcuts</a></li>" +
      "<li><a href='../#shortcuts#single' target='_top'></span><span class='text-danger'><b>#shortcuts#single:</b></span> Single Key Shortcuts</a></li>" +
      "<li><a href='../#shortcuts#multi' target='_top'></span><span class='text-danger'><b>#shortcuts#multi:</b></span> Multi-Key Shortcuts</a></li>" +
      "<li><a href='../#shortcuts#pasting' target='_top'></span><span class='text-danger'><b>#shortcuts#pasting:</b></span> Shortcuts When Pasting</a></li>" +
      "<li><a href='../#shortcuts#stickmen' target='_top'></span><span class='text-danger'><b>#shortcuts#stickmen:</b></span> Stickmen Controls</a></li>" +
      "<li><a href='../#shortcuts#interactive' target='_top'></span><span class='text-danger'><b>#shortcuts#interactive:</b></span> Interactive Version</a></li>" +
      "<li><a href='../#elements' target='_top'></span><span class='text-danger'><b>#elements:</b></span> Elements List</a></li>" +
      "<li><a href='../#elements#walls' target='_top'></span><span class='text-danger'><b>#elements#walls:</b></span> Walls</a></li>" +
      "<li><a href='../#elements#electronics' target='_top'></span><span class='text-danger'><b>#elements#electronics:</b></span> Electronics</a></li>" +
      "<li><a href='../#elements#powered' target='_top'></span><span class='text-danger'><b>#elements#powered:</b></span> Powered Materials</a></li>" +
      "<li><a href='../#elements#sensors' target='_top'></span><span class='text-danger'><b>#elements#sensors:</b></span> Sensors</a></li>" +
      "<li><a href='../#elements#force' target='_top'></span><span class='text-danger'><b>#elements#force:</b></span> Force</a></li>" +
      "<li><a href='../#elements#explosives' target='_top'></span><span class='text-danger'><b>#elements#explosives:</b></span> Explosives</a></li>" +
      "<li><a href='../#elements#gases' target='_top'></span><span class='text-danger'><b>#elements#gases:</b></span> Gases</a></li>" +
      "<li><a href='../#elements#liquids' target='_top'></span><span class='text-danger'><b>#elements#liquids:</b></span> Liquids</a></li>" +
      "<li><a href='../#elements#powders' target='_top'></span><span class='text-danger'><b>#elements#powders:</b></span> Powders</a></li>" +
      "<li><a href='../#elements#solids' target='_top'></span><span class='text-danger'><b>#elements#solids:</b></span> Solids</a></li>" +
      "<li><a href='../#elements#radioactive' target='_top'></span><span class='text-danger'><b>#elements#radioactive:</b></span> Radioactive</a></li>" +
      "<li><a href='../#elements#special' target='_top'></span><span class='text-danger'><b>#elements#special:</b></span> Special</a></li>" +
      "<li><a href='../#elements#life' target='_top'></span><span class='text-danger'><b>#elements#life:</b></span> Life</a></li>" +
      "<li><a href='../#elements#tools' target='_top'></span><span class='text-danger'><b>#elements#tools:</b></span> Tools</a></li>" +
      "<li><a href='../#elements#hidden' target='_top'></span><span class='text-danger'><b>#elements#hidden:</b></span> Hidden</a></li>" +
      "<li><a href='../#elementprop' target='_top'></span><span class='text-danger'><b>#elementprop:</b></span> Element Properties</a></li>" +
      "<li><a href='../#console' target='_top'></span><span class='text-danger'><b>#console:</b></span> Console</a></li>" +
      "<li><a href='../#console#set' target='_top'></span><span class='text-danger'><b>#console#set:</b></span> The Set Command</a></li>" +
      "<li><a href='../#console#create' target='_top'></span><span class='text-danger'><b>#console#create:</b></span> The Create Command</a></li>" +
      "<li><a href='../#console#delete' target='_top'></span><span class='text-danger'><b>#console#delete:</b></span> The Delete or Kill Command</a></li>" +
      "<li><a href='../#console#reset' target='_top'></span><span class='text-danger'><b>#console#reset:</b></span> The Reset Command</a></li>" +
      "<li><a href='../#console#bubble' target='_top'></span><span class='text-danger'><b>#console#bubble:</b></span> The Bubble Command</a></li>" +
      "<li><a href='../#console#load' target='_top'></span><span class='text-danger'><b>#console#load:</b></span> The Load Command</a></li>" +
      "<li><a href='../#console#quit' target='_top'></span><span class='text-danger'><b>#console#quit:</b></span> The Quit Command</a></li>" +
      "<li><a href='../#saves' target='_top'></span><span class='text-danger'><b>#saves:</b></span> Powder Toy Saves</a></li>" +
      "<li><a href='../#saves#howto' target='_top'></span><span class='text-danger'><b>#saves#howto:</b></span> How to Save</a></li>" +
      "<li><a href='../#saves#updating' target='_top'></span><span class='text-danger'><b>#saves#updating:</b></span> Updating Saves</a></li>" +
      "<li><a href='../#saves#browser' target='_top'></span><span class='text-danger'><b>#saves#browser:</b></span> The Save Browser</a></li>" +
      "<li><a href='../#saves#searching' target='_top'></span><span class='text-danger'><b>#saves#searching:</b></span> Searching for Saves</a></li>" +
      "<li><a href='../#saves#fp' target='_top'></span><span class='text-danger'><b>#saves#fp:</b></span> The Front Page</a></li>" +
      "<li><a href='../#saves#reporting' target='_top'></span><span class='text-danger'><b>#saves#reporting:</b></span> Reporting Saves</a></li>" +
      "<li><a href='../#forum' target='_top'></span><span class='text-danger'><b>#forum:</b></span> Powder Toy Forum</a></li>" +
      "<li><a href='../#forum#saves' target='_top'></span><span class='text-danger'><b>#forum#saves:</b></span> Embedding Saves on the Forum</a></li>" +
      "<li><a href='../#forum#links' target='_top'></span><span class='text-danger'><b>#forum#links:</b></span> Shortening Links</a></li>" +
      "<li><a href='../#forum#formatting' target='_top'></span><span class='text-danger'><b>#forum#formatting:</b></span> Formatting Posts</a></li>" +
      "<li><a href='../#forum#entity' target='_top'></span><span class='text-danger'><b>#forum#entity:</b></span> HTML Entities</a></li>" +
      "<li><a href='../#forum#tags' target='_top'></span><span class='text-danger'><b>#forum#tags:</b></span> Useful HTML Tags</a></li>" +
      "<li><a href='../#savetutorials' target='_top'></span><span class='text-danger'><b>#savetutorials:</b></span> Tutorials</a></li>" +
      "<li><a href='../#savetutorials#usage' target='_top'></span><span class='text-danger'><b>#savetutorials#usage:</b></span> Element Usage</a></li>" +
      "<li><a href='../#savetutorials#concepts' target='_top'></span><span class='text-danger'><b>#savetutorials#concepts:</b></span> Concepts and Creations</a></li>" +
      "<li><a href='../#savetutorials#art' target='_top'></span><span class='text-danger'><b>#savetutorials#art:</b></span> Art</a></li>" +
      "<li><a href='../#savetutorials#subframe' target='_top'></span><span class='text-danger'><b>#savetutorials#subframe:</b></span> Subframe</a></li>" +
      "<li><a href='../#irc' target='_top'></span><span class='text-danger'><b>#irc:</b></span> Internet Relay Chat Channel</a></li>" +
      "<li><a href='../#irc#connect' target='_top'></span><span class='text-danger'><b>#irc#connect:</b></span> How to Connect</a></li>" +
      "<li><a href='../#irc#description' target='_top'></span><span class='text-danger'><b>#irc#description:</b></span> Brief Channel Description</a></li>" +
      "<li><a href='../#irc#channels' target='_top'></span><span class='text-danger'><b>#irc#channels:</b></span> Powder Toy Channels</a></li>" +
      "<li><a href='../#irc#commands' target='_top'></span><span class='text-danger'><b>#irc#commands:</b></span> Important PowderBot Commands</a></li>" +
      "<li><a href='../#mods' target='_top'></span><span class='text-danger'><b>#mods:</b></span> Powder Toy Mods and Lua Scripts</a></li>" +
      "<li><a href='../#mods#modslist' target='_top'></span><span class='text-danger'><b>#mods#modslist:</b></span> Mods List</a></li>" +
      "<li><a href='../#wiki' target='_top'></span><span class='text-danger'><b>#wiki:</b></span> Official Wiki</a></li>" +
      "<li><a href='../#lua' target='_top'></span><span class='text-danger'><b>#lua:</b></span> Lua Reference</a></li>" +
      "<li><a href='../#cpp' target='_top'></span><span class='text-danger'><b>#cpp:</b></span> C++ Reference</a></li>" +
      "<li><a href='../#cpp#properties' target='_top'></span><span class='text-danger'><b>#cpp#properties:</b></span> Element Properties</a></li>" +
      "<li><a href='../#cpp#propconstants' target='_top'></span><span class='text-danger'><b>#cpp#propconstants:</b></span> Property Constants</a></li>" +
      "<li><a href='../#cpp#menusections' target='_top'></span><span class='text-danger'><b>#cpp#menusections:</b></span> Menu Sections</a></li>" +
      "<li><a href='../#cpp#variables' target='_top'></span><span class='text-danger'><b>#cpp#variables:</b></span> Variables</a></li>" +
      "<li><a href='../#cpp#functions' target='_top'></span><span class='text-danger'><b>#cpp#functions:</b></span> Functions</a></li>" +
      "<li><a href='../#cpp#scons' target='_top'></span><span class='text-danger'><b>#cpp#scons:</b></span> SCons Command Line Flags</a></li>" +
      "<li><a href='../#rules' target='_top'></span><span class='text-danger'><b>#rules:</b></span> Rules</a></li>" +
      "<li><a href='../#rules#s' target='_top'></span><span class='text-danger'><b>#rules#s:</b></span> Section S: Social and Community Rules</a></li>" +
      "<li><a href='../#rules#g' target='_top'></span><span class='text-danger'><b>#rules#g:</b></span> Section G: In-Game Rules</a></li>" +
      "<li><a href='../#rules#r' target='_top'></span><span class='text-danger'><b>#rules#r:</b></span> Section R: Other</a></li>" +
      "<li><a href='../#rules#irc' target='_top'></span><span class='text-danger'><b>#rules#irc:</b></span> IRC Rules</a></li>" +
      "<li><a href='../#rules#reporting' target='_top'></span><span class='text-danger'><b>#rules#reporting:</b></span> Save Reporting Rules</a></li>" +
      "<li><a href='../#rules#modding' target='_top'></span><span class='text-danger'><b>#rules#modding:</b></span> Modding Rules</a></li>" +
      "<li><a href='../#rules#suggesting' target='_top'></span><span class='text-danger'><b>#rules#suggesting:</b></span> How to Suggest an Element</a></li>" +
      "<li><a href='../#notable' target='_top'></span><span class='text-danger'><b>#notable:</b></span> Notable Users</a></li>" +
      "<li><a href='../#notable#developers' target='_top'></span><span class='text-danger'><b>#notable#developers:</b></span> Developers</a></li>" +
      "<li><a href='../#notable#moderators' target='_top'></span><span class='text-danger'><b>#notable#moderators:</b></span> Moderators</a></li>" +
      "<li><a href='../#notable#ex' target='_top'></span><span class='text-danger'><b>#notable#ex:</b></span> Ex-Moderators</a></li>" +
      "<li><a href='../#notable#irc' target='_top'></span><span class='text-danger'><b>#notable#irc:</b></span> IRC Channel Moderators</a></li>" +
      "<li><a href='../#notable#special' target='_top'></span><span class='text-danger'><b>#notable#special:</b></span> Special Roles</a></li>" +
      "<li><a href='../#faq' target='_top'></span><span class='text-danger'><b>#faq:</b></span> Tips and Frequently Asked Questions</a></li>" +
      "<li><a href='../#faq#tips' target='_top'></span><span class='text-danger'><b>#faq#tips:</b></span> Tips</a></li>" +
      "<li><a href='../#faq#faq' target='_top'></span><span class='text-danger'><b>#faq#faq:</b></span> Frequently Asked Questions</a></li>" +
      "<li><a href='../#faq#modding' target='_top'></span><span class='text-danger'><b>#faq#modding:</b></span> Modding FAQ</a></li>" +
      "<li><a href='../#faq#rejected' target='_top'></span><span class='text-danger'><b>#faq#rejected:</b></span> Rejected Suggestions List</a></li>" +
    "</ul>";

  // Enable tooltips
  $("[data-toggle=tooltip]").tooltip();

  // Edit the href attribute of all .sub-topic a to redirect to the correct page
  $(".sub-topic a").each(function(){
    $(this).attr("href", window.location.href.replace(/\/pages\/\S+\.html.*/, "") + $(this).attr("href"));
  });

  // Allow shift-click on .shift-click links to change the iframe
  $(".shift-click").click(function(e){
    if(e.shiftKey && !e.ctrlKey && e.which === 1){
      e.preventDefault();
      window.location.href = $(this).attr("href");
    }
  });

  // Allow shift-control-click on .shift-click links to open them up in a dialog box
  $(".shift-click").click(function(e){
    if(e.shiftKey && e.ctrlKey && e.which === 1){
      e.preventDefault();
      BootstrapDialog.show({
        title: "",
        message: "<iframe src='" + $(this).attr("href") + "' class='dialog-iframe'></iframe>",
        size: BootstrapDialog.SIZE_WIDE
      });
    }
  });

  // Clicking .clickable-panel toggles the panel body
  $(".clickable-panel .panel-heading").click(function(){
    if($($(this).parent().children()[1]).css("display") != "none"){
      $(".panel-body").hide("300ms");
    } else {
      $(".panel-body").hide("300ms");
      $($(this).parent().children()[1]).toggle("300ms");
    }
  });

  // Only load GIFs when they are visible
  $(".element-gif").each(function(){
    if(isVisible(this)){
      $(this).attr("src", $(this).attr("data-gif"));
    }
  });

  $(window).on("scroll.reached resize", function(){
    $(".element-gif").each(function(){
      if(isVisible(this)){
        $(this).attr("src", $(this).attr("data-gif"));
      }
    });
  });

  // Open search dialog when the #quick-search is clicked
  $("#quick-search").click(function(){
    BootstrapDialog.show({
      title: "Quick Search",
      message: searchMenu,
      size: BootstrapDialog.SIZE_WIDE
    });
    setTimeout(function(){$("#quick-search-bar").focus()}, 500);
  });

  // Open the search dialog with the hash of the current page typed out when the E key is pressed
  $(document).keydown(function(e){
    if(e.which == 69 && !$("#quick-search-bar").length){
      var searchFor = location.href.split("/").splice(-1)[0].split(".")[0];
      searchFor = searchFor == "welcome" ? "" : "#" + searchFor + "# ";
      BootstrapDialog.show({
        title: "Quick Search",
        message: searchMenu,
        size: BootstrapDialog.SIZE_WIDE
      });
      setTimeout(function(){$("#quick-search-bar").val(searchFor).trigger("input")}, 200);
      setTimeout(function(){$("#quick-search-bar").focus()}, 500);
    }
  });

  // Search through all topics whenever the input of #quick-search-bar is changed
  $(document).on("input", "#quick-search-bar", function(){
    var userInp = $("#quick-search-bar").val().toLowerCase().split(" ").filter(function(e){return e});;
    $("#search-results li.hidden").removeClass("hidden");
    $("#search-results li").each(function(){
      for(var i = 0; i < userInp.length; i++){
        var searchIn = $(this).find("b").html() + $(this).find("a").html().split("</span>")[1]
        if(searchIn.toLowerCase().indexOf(userInp[i]) < 0){
          $(this).addClass("hidden");
          break;
        }
      }
    });
  });

  // Clear local storage when #startup-guide is clicked
  $("#startup-guide").click(function(){
    $.localStorage.remove("tptreference");
  });

  // Sort table when .sortable is clicked
  $(".sortable").click(function(){
    $(".pactive").removeClass("pactive pactive-0 pactive-1 pactive-2 pactive-3 pactive-4 pactive-white");
    selectedProp = [];
    var table = $(this).parents("table").eq(0);
    var rows = table.find("tbody tr").toArray().sort(comparer($(this).index(), false));
    this.asc = !this.asc;
    if(!this.asc) rows = rows.sort(comparer($(this).index(), true));
    for(var i = 0; i < rows.length; i++){
      table.append(rows[i]);
    }
  });

  // Prioritise selected properties and sort table when .property is clicked
  $(document).on("click", ".property", function(){
    $(".tooltip").remove();
    if($(this).hasClass("pactive")){
      selectedProp = selectedProp.filter(e => e !== $(this).attr("data-prop"));
    } else {
      selectedProp.push($(this).attr("data-prop"));
    }
    $(".pactive").removeClass("pactive pactive-0 pactive-1 pactive-2 pactive-3 pactive-4 pactive-white");
    var table = $(this).parents("table").eq(0);
    var rows = table.find("tbody tr").toArray().sort(propertyFilter(selectedProp));
    for(var i = 0; i < rows.length; i++){
      table.append(rows[i]);
      var prp = $(rows).eq(i).children("td").eq(7).children(".property");
      for(var j = 0; j < prp.length; j++){
        if(selectedProp.indexOf(prp.eq(j).attr("data-prop")) != -1){
          var index = selectedProp.indexOf(prp.eq(j).attr("data-prop"));
          index = index > 4 ? "white" : index;
          prp.eq(j).addClass("pactive pactive-" + index);
        }
      }
    }
  });

  // Change channel of IRC client when .channel-switch is clicked
  $(".channel-switch").click(function(){
    $("#irc-iframe").attr("src", "http://webchat.freenode.net?channels=" + $(this).attr("data-channel"));
    $("#irc-button").attr("href", "http://webchat.freenode.net?channels=" + $(this).attr("data-channel"));
  });
});
