$(document).ready(function(){


  var settingsHtml =
    "<ol>" +
      "<li><input type='text' class='inTitle' placeholder='Title'><input type='text' class='inLink' placeholder='Link'></li>".repeat(16) +
    "</ol>";

  var defGames = [
    ["flOw", "http://www.storewebgames.com/flow_archivos/flowcore.swf"],
    ["2048", "http://games.gamepix.com/play/1?sid=50170"],
    ["Would You Rather", "http://either.io/"],
    ["Tetris", "http://tetris.com/play-tetris/TetrisWeb.swf?id=cd4102ea3ce30482"],
    ["Cut the Rope", "http://games.gamepix.com/play/40071?sid=50170"],
    ["Happy Wheels", "http://www.totaljerkface.com/happy_wheels.tjf"],
    ["Bloons TD5", "http://chat.kongregate.com/gamez/0015/1730/live/Preloader.swf?kongregate_game_version=1452651825"],
    ["Free Rider HD", "http://www.freeriderhd.com/"],
    ["Agar.io", "http://agar.io/"],
    ["ShellShock Live 2", "http://www.shellshocklive2.com/media/SSL2Loader.swf"],
    ["Soccer Physics", "http://ottoojala.com/soccerphysics/"],
    ["Doodle God", "http://chat.kongregate.com/gamez/0008/4158/live/doodlegod.swf?kongregate_game_version=1363137380"],
    ["Fireboy and Watergirl", "http://www.coolmath-games.com/sites/cmatgame/files/fireboyandwatergirl4_coolmath.swf"],
    ["Toss The Turtle", "http://uploads.ungrounded.net/508000/508440_tossTheTurtleV1NG.swf?123"],
    ["Pinball", "http://www.classicgame.com/uploaded/swf/short_circuit.swf"],
    ["Cookie Clicker", "http://orteil.dashnet.org/cookieclicker/"]
  ];


  // Get data from storage
  storage = $.localStorage;
  if(!storage.isSet("games")){
    storage.set("games", defGames);
  }
  sGames = storage.get("games");

  // Change the title and the link of the tiles using data from sGames
  for(var i = 0; i < sGames.length; i++){
    $($("div.text h3")[i]).html(sGames[i][0]);
    $($(".tile")[i]).attr("href", sGames[i][1])
  }

  // Animate tiles
  $(".tile").css("opacity", "0").each(function(index){
    setTimeout(function(){
      $($(".tile")[index]).css({"opacity": "1", "animation-name": "flipInY", "animation-duration": "1.1s"});
    }, index * 200);
  });


  // Settings
  $("#edit").click(function(){
    BootstrapDialog.show({
      closable: false,
      title: "Settings",
      message: $(settingsHtml),
      buttons: [{
        label: "Save",
        action: function(dialogItself){
          newGames = [];
          for(var i = 0; i < 16; i++){
            newGames.push([$($(".inTitle")[i]).val(), $($(".inLink")[i]).val()]);
          }
          storage.set("games", newGames);
          dialogItself.close();
          location.reload();
        }
      }, {
        label: "Default",
        action: function(dialogItself){
          for(var i = 0; i < 16; i++){
            $($(".inTitle")[i]).val(defGames[i][0]);
            $($(".inLink")[i]).val(defGames[i][1]);
          }
        }
      }, {
        label: "Cancel",
        action: function(dialogItself){
          location.reload();
        }
      }]
    });
    
    setTimeout(function(){
      for(var i = 0; i < 16; i++){
        $($(".inTitle")[i]).val(sGames[i][0]);
        $($(".inLink")[i]).val(sGames[i][1]);
      }
    }, 500);
  });
});
