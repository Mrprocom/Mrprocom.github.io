// This function checks if elem is visible
function isVisible(elem){
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
  return (elemBottom <= docViewBottom) && (elemTop >= docViewTop)
}


$(document).ready(function(){

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
      "<li><a href='../#irc' target='_top'></span><span class='text-danger'><b>#irc:</b></span> Internet Relay Chat Channel</a></li>" +
      "<li><a href='../#irc#connect' target='_top'></span><span class='text-danger'><b>#irc#connect:</b></span> How to Connect</a></li>" +
      "<li><a href='../#irc#description' target='_top'></span><span class='text-danger'><b>#irc#description:</b></span> Brief Channel Description</a></li>" +
      "<li><a href='../#irc#channels' target='_top'></span><span class='text-danger'><b>#irc#channels:</b></span> Powder Toy Channels</a></li>" +
      "<li><a href='../#irc#commands' target='_top'></span><span class='text-danger'><b>#irc#commands:</b></span> Important PowderBot Commands</a></li>" +
      "<li><a href='../#mods' target='_top'></span><span class='text-danger'><b>#mods:</b></span> Powder Toy Mods and Lua Scripts</a></li>" +
      "<li><a href='../#mods#v90' target='_top'></span><span class='text-danger'><b>#mods#v90:</b></span> Mods List v90.0+</a></li>" +
      "<li><a href='../#mods#v85' target='_top'></span><span class='text-danger'><b>#mods#v85:</b></span> Mods List v85.0+</a></li>" +
      "<li><a href='../#mods#v75' target='_top'></span><span class='text-danger'><b>#mods#v75:</b></span> Mods List v75.0+</a></li>" +
      "<li><a href='../#mods#below' target='_top'></span><span class='text-danger'><b>#mods#below:</b></span> Mods List Below v75.0</a></li>" +
      "<li><a href='../#wiki' target='_top'></span><span class='text-danger'><b>#wiki:</b></span> Official Wiki</a></li>" +
      "<li><a href='../#lua' target='_top'></span><span class='text-danger'><b>#lua:</b></span> Lua Reference</a></li>" +
      "<li><a href='../#rules' target='_top'></span><span class='text-danger'><b>#rules:</b></span> Rules</a></li>" +
      "<li><a href='../#rules#forum' target='_top'></span><span class='text-danger'><b>#rules#forum:</b></span> Forum Posting Rules</a></li>" +
      "<li><a href='../#rules#save' target='_top'></span><span class='text-danger'><b>#rules#save:</b></span> Save Uploading Rules</a></li>" +
      "<li><a href='../#rules#irc' target='_top'></span><span class='text-danger'><b>#rules#irc:</b></span> IRC Rules</a></li>" +
      "<li><a href='../#rules#reporting' target='_top'></span><span class='text-danger'><b>#rules#reporting:</b></span> Save Reporting Rules</a></li>" +
      "<li><a href='../#rules#modding' target='_top'></span><span class='text-danger'><b>#rules#modding:</b></span> Modding Rules</a></li>" +
      "<li><a href='../#rules#suggesting' target='_top'></span><span class='text-danger'><b>#rules#suggesting:</b></span> How to Suggest an Element</a></li>" +
      "<li><a href='../#notable' target='_top'></span><span class='text-danger'><b>#notable:</b></span> Notable Users</a></li>" +
      "<li><a href='../#notable#developers' target='_top'></span><span class='text-danger'><b>#notable#developers:</b></span> Developers</a></li>" +
      "<li><a href='../#notable#moderators' target='_top'></span><span class='text-danger'><b>#notable#moderators:</b></span> Moderators</a></li>" +
      "<li><a href='../#notable#inactive' target='_top'></span><span class='text-danger'><b>#notable#inactive:</b></span> Inactive Moderators</a></li>" +
      "<li><a href='../#notable#irc' target='_top'></span><span class='text-danger'><b>#notable#irc:</b></span> IRC Channel Moderators</a></li>" +
      "<li><a href='../#notable#special' target='_top'></span><span class='text-danger'><b>#notable#special:</b></span> Special Roles</a></li>" +
      "<li><a href='../#faq' target='_top'></span><span class='text-danger'><b>#faq:</b></span> Tips and Frequently Asked Questions</a></li>" +
      "<li><a href='../#faq#tips' target='_top'></span><span class='text-danger'><b>#faq#tips:</b></span> Tips</a></li>" +
      "<li><a href='../#faq#faq' target='_top'></span><span class='text-danger'><b>#faq#faq:</b></span> Frequently Asked Questions</a></li>" +
      "<li><a href='../#faq#modding' target='_top'></span><span class='text-danger'><b>#faq#modding:</b></span> Modding FAQ</a></li>" +
      "<li><a href='../#faq#rejected' target='_top'></span><span class='text-danger'><b>#faq#rejected:</b></span> Rejected Suggestions List</a></li>" +
    "</ul>";

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
    setInterval(function(){$("#quick-search-bar").focus()}, 0);
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

  // Change channel of IRC client when .channel-switch is clicked
  $(".channel-switch").click(function(){
    $("#irc-iframe").attr("src", "http://webchat.freenode.net?channels=" + $(this).attr("data-channel"));
    $("#irc-button").attr("href", "http://webchat.freenode.net?channels=" + $(this).attr("data-channel"));
  });
});
