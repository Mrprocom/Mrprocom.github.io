selectedCountries = [];
lastTimestamp = 0;
var tableHtml1 =
  "<div class='countries-table'>" +
    "<table class='table table-hover countries-table'>" +
      "<thead>" +
        "<tr>" +
          "<th class='col-sm-1 col-xs-2 sort-rank'>Rank</th>" +
          "<th class='col-sm-7 col-xs-6 sort-name'>Country Name</th>" +
          "<th class='col-xs-4 sort-value'>Value</th>" +
        "</tr>" +
      "</thead>" +
      "<tbody>" +
        "<tr class='spacer'></tr>";
var tableHtml2 =
  "<div class='countries-table'>" +
    "<table class='table table-hover countries-table'>" +
      "<thead>" +
        "<tr>" +
          "<th id='t-name' class='col-xs-8 sort-name'>Country Name</th>" +
          "<th id='t-value' class='col-xs-4 sort-value'>Value</th>" +
        "</tr>" +
      "</thead>" +
      "<tbody>" +
        "<tr class='spacer'></tr>";

var tableHtml3 =
  "<div class='countries-table'>" +
    "<table class='table table-hover countries-table'>" +
      "<thead>" +
        "<tr>" +
          "<th id='t-name' class='col-xs-8 sort-name'>Country Name</th>" +
        "</tr>" +
      "</thead>" +
      "<tbody>" +
        "<tr class='spacer'></tr>";


// This function returns a list of countries sorted by their values
function getRankList(currentMap, reverse){
  var rankList = [];
  for(var value in mapsList[currentMap]["values"]){
    rankList.push(value + "," + mapsList[currentMap]["values"][value]);
  }
  // Sort rankList by values or alphabetically if two values are equal
  rankList = $.map(rankList, function(i){return mapsList["names"][i.split(",")[0]] + "," + i});
  rankList.sort(function(a, b){
    var [name1, code1, value1] = a.split(",");
    var [name2, code2, value2] = b.split(",");
    if(value1 == value2){
      return name1 < name2 ? -1 : 1;
    }
    return parseFloat(value2) - parseFloat(value1);
  });
  rankList = $.map(rankList, function(i){return i.split(",")[1] + "," + i.split(",")[2]});
  return rankList;
}


// This function takes a list of values and modifies it for proper sorting by value
function modifyValues(currentMap, values){
  if(currentMap == "language"){
    return $.map(values, function(i){return i.split(",")[0] + "," + i.split(",")[1].replace(/^0$/, "15")});
  }
  if(currentMap == "religion"){
    return $.map(values, function(i){return i.split(",")[0] + "," + i.split(",")[1].replace(/^0$/, "7")});
  }
  return values
}


// This function returns a list of countries with their ranks sorted by their full names
function getAlphabetTable(currentMap, reverse){
  var alphabetTable = getRankList(currentMap);
  alphabetTable = modifyValues(currentMap, alphabetTable);
  alphabetTable = $.map(alphabetTable, function(i){return alphabetTable.indexOf(i) + 1 + "," + i});
  alphabetTable = $.map(alphabetTable, function(i){return mapsList["names"][i.split(",")[1]] + "|" + i});
  alphabetTable.sort();
  alphabetTable = $.map(alphabetTable, function(i){return i.split("|")[1]});
  if(reverse){
    alphabetTable.reverse();
  }
  return alphabetTable
}


// This function returns a list of countries with their ranks sorted by their ranks
function getRankTable(currentMap, reverse){
  var rankTable = getAlphabetTable(currentMap, reverse);
  rankTable.sort(function(a, b){
    var a = parseFloat(a.split(",")[0]);
    var b = parseFloat(b.split(",")[0]);
    return a - b;
  });
  if(reverse){
    rankTable.reverse();
  }
  return rankTable;
}

// This function returns a list of countries with their ranks sorted by their values
function getValueTable(currentMap, reverse){
  var valueTable = getAlphabetTable(currentMap, reverse);
  valueTable = $.map(valueTable, function(i){return mapsList["names"][i.split(",")[1]] + "," + i})
  // Sort valueTable by values or alphabetically if two values are equal
  valueTable.sort(function(a, b){
    var [name1, rank1, code1, value1] = a.split(",");
    var [name2, rank2, code2, value2] = b.split(",");
    if(value1 == value2){
      return name1 < name2 ? -1 : 1;
    }
    return parseFloat(value1) - parseFloat(value2);
  });
  valueTable = $.map(valueTable, function(i){return i.split(",").slice(1, 4).join(",")});
  if(reverse){
    valueTable.reverse();
  }
  return valueTable;
}


// This function returns HTML code for the table of countries
function constructTable(currentMap, countryList){
  if(currentMap && mapsList[currentMap]["rank"]){
    var tableHtml = tableHtml1;
  } else if(currentMap){
    var tableHtml = tableHtml2;
  } else {
    var tableHtml = tableHtml3;
  }
  if(selectedCountries.length > 0){
    countryList = $.map(countryList, function(i){if(selectedCountries.indexOf(i.split(",")[1]) != -1){return i}});
  }
  if(currentMap && mapsList[currentMap]["unit"]){
    tableHtml = tableHtml.replace("Value", "Value (" + mapsList[currentMap]["unit"].replace(/^ /, "") + ")");
  }
  if(currentMap){
    tableHtml = tableHtml.replace("Value", mapsList[currentMap]["key"]);
  }
  for(var country = 0; country < countryList.length; country++){
    var countryRank = countryList[country].split(",")[0];
    var countryName = mapsList["names"][countryList[country].split(",")[1]];
    var countryCode = countryList[country].split(",")[1].toUpperCase();
    var flagPath = "flags/" + countryList[country].split(",")[1] + ".svg";
    var countryValue = parseFloat(countryList[country].split(",")[2]).toLocaleString();
    if(currentMap && mapsList[currentMap]["replace"]){
      countryValue = mapsList[currentMap]["replace"][countryValue];
    }
    // Swap between Israel and Palestinian Territory if the shown mape is refugees
    if(currentMap == "refugees" && countryCode == "IL"){
      countryName = "Palestinian Territory";
      countryCode = "PS";
      flagPath = "flags/ps.svg";
    } else if(currentMap == "refugees" && countryCode == "PS"){
      countryName = "Israel";
      countryCode = "IL";
      flagPath = "flags/il.svg";
    }
    // Only list the rankings if true
    if(currentMap && mapsList[currentMap]["rank"]){
      tableHtml += "<tr><td>#" + countryRank + "</td>";
    }
    tableHtml +=
      "<td><img src='" + flagPath + "' class='flag'> " +
      countryName + " (" + countryCode + ")</td>";
    if(currentMap){
      tableHtml += "<td>" + countryValue + "</td></tr>";
    }
    // Add a spacer after each row except the last row
    if(country + 1 != countryList.length){
      tableHtml += "<tr class='spacer'>";
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</table></div>";
  return tableHtml;
}


// Show label function
function showLabel(event, label, code){
  if(currentMap){
    countryName = label.text();
    keyName = mapsList[currentMap]["key"];
    keyValue = mapsList[currentMap]["values"][code];
    // Replace is to replace values with strings to use
    if(mapsList[currentMap]["replace"] && keyValue in mapsList[currentMap]["replace"]){
      keyValue = mapsList[currentMap]["replace"][keyValue];
    } else {
      keyValue = parseFloat(keyValue).toLocaleString();
    }
    // Append a unit at the end if it is not false
    if(mapsList[currentMap]["unit"]){
      keyValue = keyValue + mapsList[currentMap]["unit"];
    }
    // use N/A as the value if it starts with NaN
    if(keyValue.match(/^NaN/)){
      keyValue = "N/A";
    }
    var newLabel = "<b>Country:</b> " + countryName + " (" + code.toUpperCase() + ")<br><b>" + keyName + ":</b> " + keyValue
    // Add a rank if it is true
    if(mapsList[currentMap]["rank"] && code in mapsList[currentMap]["values"]){
      rankList = getRankList(currentMap);
      rank = rankList.indexOf(code + "," + mapsList[currentMap]["values"][code]) + 1;
      // Find the real rank of Israel if the map is showing refugees
      // Israel and Palestinian Territory have their values swapped
      if(currentMap == "refugees"){
        var israelRank = (rankList.indexOf("ps," + mapsList[currentMap]["values"]["ps"]) + 1) + ("/" + rankList.length);
      }
      newLabel += "<br><b>Rank:</b> " + rank + "/" + rankList.length;
    }
    // Mention both Israel and Palestinian Territory in the refugees map when Israel is hovered over
    if(currentMap == "refugees" && code == "il"){
      newLabel = newLabel.replace("Israel (IL)", "Palestinian Territory (PS)");
      newLabel += "<hr><b>Country:</b> Israel (IL)<br><b>Refugees:</b> " + mapsList[currentMap]["values"]["ps"] + "<br><b>Rank:</b> " + israelRank;
    }
    label.html(newLabel);
  } else {
    label.text(label.text() + " (" + code.toUpperCase() + ")");
  }
}


// Region click function
function addRegion(event, code, region){
  // This is useful for dealing with two region click calls at the same time
  if(lastTimestamp == event.timeStamp){
    return 0
  }
  lastTimestamp = event.timeStamp;
  if(selectedCountries.indexOf(code) === -1){
    selectedCountries.push(code);
  } else {
    selectedCountries.splice(selectedCountries.indexOf(code), 1);
  }
  console.log(selectedCountries);
  console.log(region);
  console.log(event);
}


$(document).ready(function(){

  currentMap = false;
  revRank = false;
  revAlphabet = false;
  revValue = false;
  var instructionsPanel =
    "<div class='instructions-panel'>" +
      "<h2>Instructions</h2>" +
      "<hr>" +
      "<ul>" +
        "<li>Click on a category at the bottom to view a list of related maps to show.</li>" +
        "<li>Use the scrollbar at the bottom or use the scrollwheel to navigate through the list.</li>" +
        "<li>Click on a map to view it. You can click on a different map to change the current one or click the Back button to go back to the category selector.</li>" +
        "<li>Click on the <kbd>+</kbd> or <kbd>-</kbd> buttons at the top-left corner to zoom in or out, or you can use the scrollwheel while the mouse is on the map to zoom in or out.</li>" +
        "<li>Click on the map, hold and drag to move it if it is zoomed in.</li>" +
        "<li>Hover over a country to view information about it, including information related to the currently-viewed map.</li>" +
        "<li>Click on a country to highlight it, you can highlight one country at a time. Click it again to remove the highlight or click on a different country to highlight it instead.</li>" +
        "<li>Click on the <span class='glyphicon glyphicon-th-list'></span> button at the top left corner to view a table of countries, ranks and values depending on what the currently-viewed map is.</li>" +
        "<li>If you have some countries selected on the map, only those countries will appear on the table. This is useful for easy comparisons. Deselect all countries for all countries to appear on the table.</li>" +
        "<li>Click on a title from the table header to sort the table by whatever was clicked. Click it again to reverse the sorting.</li>" +
        "<li>Use the search feature on your web browser to quickly find a specific country, it can be accessed with the <kbd>Ctrl+F</kbd> keyboard shortcut on most web browsers.</li>" +
      "</ul>" +
      "<h2>Disclaimer and Important Notes</h2>" +
      "<hr>" +
      "<p>Only a total of 182 countries are shown on this map. Some countries were not included, things like Israel only being shown while Palestine is not, Sudan being shown while South Sudan is not and Serbia being shown while Kosovo is not, are not intentional. The interactive map that was used happened to not include them, and it did not include some small countries, like Singapore, Bahrain, Vatican city and more.</p>" +
      "<p>Since a lot of refugees originate from Palestine, it was only included in the Refugees map alongside with Israel. If you hover over Israel, the number of refugees originating from Israel and Palestine will show up.</p>" +
      "<p>The statistics were collected from the Internet and sorted manually, meaning that mistakes are possible, so these statistics might not be 100% accurate.</p>" +
      "<p>The title of some maps include year durations, like 2010-2015, this usually means that the year the data was collected in differs from country to country, but they are all in that duration, so in that example, the data for each country was collected at some point between the year 2010 and the year 2015.</p>" +
    "</div>";

  // Show map
  $("#vmap").vectorMap({
    map: "world_en",
    backgroundColor: "#2c2c2c",
    color: "#ffffff",
    hoverOpacity: 0.7,
    selectedColor: "#666666",
    scaleColors: ["#c8eeff", "#006491"],
    values: sample_data,
    multiSelectRegion: true,
    normalizeFunction: "polynomial",
    onLabelShow: function(event, label, code){showLabel(event, label, code)},
    onRegionClick: function(event, code, region){addRegion(event, code, region)}
  });

  // Change height of #vmap depending on the size of the title
  $("#vmap").css("height", "calc(100% - 140px - " + $("#title").css("height"));

  // Change padding of .selector-item if scrollbar is visible
  $("#map-selector").scrollLeft(1);
  setTimeout(function(){
    if($("#map-selector").scrollLeft() !== 0){
      $(".selector-item").css("padding", "10px");
    } else {
      $(".selector-item").css("padding", "15px");
    };
    $("#map-selector").scrollLeft(0);
  }, 10);

  // Zoom in/out on scroll
  $(window).bind("mousewheel", function(e){
    if($("#vmap:hover").length){
      if(e.originalEvent.wheelDelta >= 0){
        $("#vmap").vectorMap("zoomIn");
      } else {
        $("#vmap").vectorMap("zoomOut");
      }
    }
  });

  // Scroll sideways
  $(window).bind("mousewheel", function(e){
    if($("#map-selector:hover").length){
      if(e.originalEvent.wheelDelta >= 0){
        var leftPos = $("#map-selector").scrollLeft();
        $("#map-selector").stop().animate({scrollLeft: leftPos + 100}, 50);

      } else {
        var leftPos = $("#map-selector").scrollLeft();
        $("#map-selector").stop().animate({scrollLeft: leftPos - 100}, 50);
      }
    }
  });

  // Go to the specified set when .category is clicked
  $(".category").click(function(){
    var gotoSet = $("#" + $(this).attr("data-go"));
    $(".selector-set").fadeOut(300);
    setTimeout(function(){
      gotoSet.fadeIn(300);
      // Change padding of .selector-item if scrollbar is visible
      $("#map-selector").scrollLeft(1);
      setTimeout(function(){
        if($("#map-selector").scrollLeft() !== 0){
          $(".selector-item").css("padding", "10px");
        } else {
          $(".selector-item").css("padding", "15px");
        };
        $("#map-selector").scrollLeft(0);
      }, 1);
    }, 300);
  });

  // Go back to the main set when .back is clicked
  $(".back").click(function(){
    $(".selector-set").fadeOut(300);
    setTimeout(function(){
      $("#categories-set").fadeIn(300);
      // Change padding of .selector-item if scrollbar is visible
      $("#map-selector").scrollLeft(1);
      setTimeout(function(){
        if($("#map-selector").scrollLeft() !== 0){
          $(".selector-item").css("padding", "10px");
        } else {
          $(".selector-item").css("padding", "15px");
        };
        $("#map-selector").scrollLeft(0);
      }, 1);
    }, 300);
  });

  // Change map when .map-type is clicked
  $(".map-type").click(function(){
    currentMap = $(this).attr("data-vmap");
    var newValues = $.extend({}, mapsList[currentMap]["values"]);
    var newScales = mapsList[currentMap]["scales"].slice(0);
    $("#vmap").css("opacity", "0");
    $("#title h2").css("opacity", "0");
    setTimeout(function(){
      // Reset selectedCountries
      selectedCountries = [];
      // Make the map blank first and then change it to the new map
      $("#vmap").html("<div id='table-btn'><span class='glyphicon glyphicon-th-list'></span></div>").vectorMap({
        map: "world_en",
        backgroundColor: "#2c2c2c",
        color: "#ffffff",
        hoverOpacity: 0.7,
        selectedColor: "#666666",
        scaleColors: newScales,
        values: newValues,
        multiSelectRegion: true,
        normalizeFunction: "linear",
        onLabelShow: function(event, label, code){showLabel(event, label, code)},
        onRegionClick: function(event, code, region){addRegion(event, code, region)}
      });
      if(!mapsList[currentMap]["linear"]){
        $("#vmap").vectorMap("set", "normalizeFunction", "polynomial");
      }
      $("#vmap").css("opacity", "1");
      // Change the title to match the shown map
      $("#title h2").text(mapsList[currentMap]["title"]);
      $("#title h2").css("opacity", "1");
      // Change height of #vmap depending on the size of the title
      $("#vmap").css("height", "calc(100% - 140px - " + $("#title").css("height"));
    }, 300);
  });

  // Change padding of .selector-item if scrollbar is visible and the height of #vmap when resizing
  $(window).resize(function(){
    $("#vmap").css("height", "calc(100% - 140px - " + $("#title").css("height"));
    $("#map-selector").scrollLeft(1);
    setTimeout(function(){
      if($("#map-selector").scrollLeft() !== 0){
        $(".selector-item").css("padding", "10px");
      } else {
        $(".selector-item").css("padding", "15px");
      };
      $("#map-selector").scrollLeft(0);
    }, 10);
  });

  // View a table showing country names their ranks and their values when #table-btn is clicked
  $(document).on("click", "#table-btn", function(){
    revRank = false;
    revAlphabet = false;
    revValue = false;
    rankTable = getRankTable(currentMap || "table");
    alphabetTable = getAlphabetTable(currentMap || "table");
    valueTable = getValueTable(currentMap || "table");
    if(currentMap && mapsList[currentMap]["rank"]){
      var tableHtml = constructTable(currentMap, rankTable);
    } else {
      var tableHtml = constructTable(currentMap, valueTable);
    }
    
    BootstrapDialog.show({
      title: "Table of Countries and Ranks",
      message: tableHtml,
      size: BootstrapDialog.SIZE_WIDE
    });
    // Reverse rankTable for the next sort
    rankTable = [].concat(rankTable).reverse();
  });

  // Sort table when a table header is clicked
  $(document).on("click", ".sort-rank", function(){
    var tableHtml = constructTable(currentMap, rankTable);
    $(".bootstrap-dialog-message").html(tableHtml);
    // Reverse rankTable for the next sort and reset alphabetTable and valueTable
    revRank = !revRank;
    revAlphabet = false;
    revValue = false;
    rankTable = getRankTable(currentMap || "table", revRank);
    alphabetTable = getAlphabetTable(currentMap || "table");
    valueTable = getValueTable(currentMap || "table");
  });

  $(document).on("click", ".sort-name", function(){
    var tableHtml = constructTable(currentMap, alphabetTable);
    $(".bootstrap-dialog-message").html(tableHtml);
    // Reverse alphabetTable for the next sort and reset rankTable and valueTable
    revRank = false;
    revAlphabet = !revAlphabet;
    revValue = false;
    rankTable = getRankTable(currentMap || "table");
    alphabetTable = getAlphabetTable(currentMap || "table", revAlphabet);
    valueTable = getValueTable(currentMap || "table");
  });

  $(document).on("click", ".sort-value", function(){
    var tableHtml = constructTable(currentMap, valueTable);
    $(".bootstrap-dialog-message").html(tableHtml);
    // Reverse valueTable for the next sort and reset rankTable and alphabetTable
    revRank = false;
    revAlphabet = false;
    revValue = !revValue;
    rankTable = getRankTable(currentMap || "table");
    alphabetTable = getAlphabetTable(currentMap || "table");
    valueTable = getValueTable(currentMap || "table", revValue);
  });

  // Show instructions when #instructions is clicked
  $("#instructions").click(function(){
    BootstrapDialog.show({
      title: "Instructions",
      message: instructionsPanel,
      size: BootstrapDialog.SIZE_WIDE
    });
  });
});
