// This function updates the pyramid
function advYear(){

  // Change the population of 99 years old to 0
  pyramidMale[99] = 0;
  pyramidFemale[99] = 0;

  // Make everyone older
  for(var i = 99; i >= 0; i--){
    pyramidMale[i + 1] = pyramidMale[i];
    pyramidFemale[i + 1] = pyramidFemale[i];
  }

  // Add new babies
  var newBirth = population * birth / 1000;
  pyramidMale[0] = Math.round(newBirth * ratio / (ratio + 100));
  pyramidFemale[0] = Math.round(newBirth * 100 / (ratio + 100));

  // Add deaths
  var newDeath = population * death / 1000;
  for(var i = 0; i <= 99; i++){
    pyramidMale[i] -= Math.round(newDeath * deathMaleAges[i] / 100);
    pyramidFemale[i] -= Math.round(newDeath * deathFemaleAges[i] / 100);
    if(pyramidMale[i] < 0){pyramidMale[i] = 0}
    if(pyramidFemale[i] < 0){pyramidFemale[i] = 0}
  }

  // Add migration
  var newMigration = population * migration / 1000;
  for(var i = 0; i <= 99; i++){
    pyramidMale[i] += Math.round(newMigration * migrationMaleAges[i] / 100);
    pyramidFemale[i] += Math.round(newMigration * migrationFemaleAges[i] / 100);
  }

  // Update population
  population = 0;
  for(var i = 0; i <= 99; i++){
    population += pyramidMale[i] + pyramidFemale[i];
  }

  // Update the pyramid
  for(var i = 0; i < 20; i++){
    var males = 0;
    var females = 0;
    for(var j = 0; j < 5; j++){
      males += pyramidMale[i * 5 + j];
      females += pyramidFemale[i * 5 + j];
    }
    $($("#male .age-group .progress")[19 - i]).attr("data-width", males / population * 100);
    $($("#female .age-group .progress")[19 - i]).attr("data-width", females / population * 100);
  }

  // update lengthes and titles
  updateLength();
  updateTitle();
}


// This function executes advYear until #adv-stop is clicked
function advYearCon(){

  setTimeout(function(){
    advYear();
    if(runLoop){
      advYearCon();
    }
  }, 100);
}


// This function updates the width of each .progress element
function updateLength(){

  for(var i = 0; i < 40; i++){
    var newLength = Number($($(".age-group .progress")[i]).attr("data-width")) * 10;
    if(newLength > 100){
      newLength = 100;
    }
    if(isNaN(newLength)){
      newLength = 0;
    }
    $($(".age-group .progress")[i]).css("width", newLength + "%");
  }
}


// This function updates the title attribute of each .progress-bar element to display useful information
function updateTitle(){

  $(".age-group .progress").attr("data-original-title", function(){
    var age = $(this).attr("data-age");
    var percentage = Math.round($(this).attr("data-width") * 100) / 100 + "%";
    return "<b class='age'>" + age + ":</b> <b class='per'>" + percentage + "</b>";
  });
  var age65_99 = 0;
  var age15_64 = 0;
  var age0_14 = 0;
  for(var i = 0; i <= 7; i++){
    age65_99 += Number($($("#male .progress")[i]).attr("data-width"));
    age65_99 += Number($($("#female .progress")[i]).attr("data-width"));
  }
  for(var i = 8; i <= 16; i++){
    age15_64 += Number($($("#male .progress")[i]).attr("data-width"));
    age15_64 += Number($($("#female .progress")[i]).attr("data-width"));
  }
  for(var i = 17; i <= 19; i++){
    age0_14 += Number($($("#male .progress")[i]).attr("data-width"));
    age0_14 += Number($($("#female .progress")[i]).attr("data-width"));
  }
  if(isNaN(age65_99)){age65_99 = 0}
  if(isNaN(age15_64)){age15_64 = 0}
  if(isNaN(age0_14)){age0_14 = 0}
  $("#age-1").attr("data-original-title", "<b class='age'>65 - 99:</b> <b class='per'>" + (Math.round(age65_99 * 100) / 100) + "%</b>");
  $("#age-2").attr("data-original-title", "<b class='age'>15 - 64:</b> <b class='per'>" + (Math.round(age15_64 * 100) / 100) + "%</b>");
  $("#age-3").attr("data-original-title", "<b class='age'>0 - 14:</b> <b class='per'>" + (Math.round(age0_14 * 100) / 100) + "%</b>");
}


$(document).ready(function(){

  ageGroups = [
    ["95 - 99", "0.7233"], ["90 - 94", "1.1991"],
    ["85 - 89", "1.5314"], ["80 - 84", "1.7611"],
    ["75 - 79", "1.9307"], ["70 - 74", "2.0674"],
    ["65 - 69", "2.1879"], ["60 - 64", "2.3007"],
    ["55 - 59", "2.4094"], ["50 - 54", "2.5164"],
    ["45 - 49", "2.6224"], ["40 - 44", "2.7290"],
    ["35 - 39", "2.8371"], ["30 - 34", "2.9483"],
    ["25 - 29", "3.0631"], ["20 - 24", "3.1817"],
    ["15 - 19", "3.3042"], ["10 - 14", "3.4303"],
    ["5 - 9", "3.5606"], ["0 - 4", "3.6959"]
  ];

  deathMaleAges = [
    0.0869, 0.0059, 0.0038, 0.0030, 0.0023, 0.0021, 0.0019, 0.0018, 0.0016, 0.0014,
    0.0012, 0.0013, 0.0018, 0.0028, 0.0042, 0.0057, 0.0072, 0.0089, 0.0106, 0.0124,
    0.0143, 0.0161, 0.0174, 0.0180, 0.0180, 0.0179, 0.0179, 0.0179, 0.0181, 0.0185,
    0.0189, 0.0194, 0.0198, 0.0202, 0.0207, 0.0214, 0.0223, 0.0233, 0.0245, 0.0260,
    0.0277, 0.0297, 0.0322, 0.0353, 0.0389, 0.0429, 0.0472, 0.0519, 0.0570, 0.0624,
    0.0682, 0.0744, 0.0810, 0.0880, 0.0955, 0.1038, 0.1123, 0.1206, 0.1282, 0.1356,
    0.1438, 0.1533, 0.1641, 0.1763, 0.1901, 0.2057, 0.2233, 0.2427, 0.2642, 0.2879,
    0.3154, 0.3461, 0.3787, 0.4128, 0.4497, 0.4921, 0.5410, 0.5958, 0.6570, 0.7255,
    0.8043, 0.8930, 0.9892, 1.0925, 1.2056, 1.3318, 1.4742, 1.6346, 1.8139, 2.0119,
    2.2280, 2.4613, 2.7108, 2.9755, 3.2541, 3.5304, 3.7994, 4.0557, 4.2939, 4.5088
  ];

  deathFemaleAges = [
    0.0729, 0.0051, 0.0029, 0.0022, 0.0019, 0.0017, 0.0015, 0.0014, 0.0013, 0.0012,
    0.0011, 0.0012, 0.0013, 0.0017, 0.0022, 0.0027, 0.0033, 0.0038, 0.0042, 0.0046,
    0.0051, 0.0055, 0.0059, 0.0062, 0.0064, 0.0067, 0.0069, 0.0073, 0.0077, 0.0083,
    0.0089, 0.0095, 0.0101, 0.0107, 0.0112, 0.0118, 0.0125, 0.0134, 0.0145, 0.0157,
    0.0171, 0.0187, 0.0205, 0.0226, 0.0249, 0.0274, 0.0300, 0.0329, 0.0359, 0.0392,
    0.0427, 0.0464, 0.0500, 0.0534, 0.0569, 0.0607, 0.0651, 0.0697, 0.0745, 0.0797,
    0.0857, 0.0926, 0.1006, 0.1097, 0.1201, 0.1322, 0.1456, 0.1600, 0.1754, 0.1922,
    0.2115, 0.2336, 0.2578, 0.2840, 0.3130, 0.3469, 0.3857, 0.4277, 0.4726, 0.5221,
    0.5798, 0.6468, 0.7220, 0.8057, 0.8998, 1.0061, 1.1264, 1.2619, 1.4135, 1.5815,
    1.7660, 1.9669, 2.1838, 2.4166, 2.6647, 2.9156, 3.1652, 3.4091, 3.6428, 3.8614
  ];

  migrationMaleAges = [
    0.2562, 0.3812, 0.5027, 0.5503, 0.5532, 0.5417, 0.5149, 0.4734, 0.4340, 0.4106,
    0.3988, 0.3875, 0.3733, 0.3615, 0.3556, 0.3527, 0.3532, 0.3718, 0.4325, 0.5430,
    0.6828, 0.8234, 0.9551, 1.0904, 1.2405, 1.3958, 1.5285, 1.6178, 1.6710, 1.7055,
    1.7250, 1.7280, 1.7158, 1.6858, 1.6347, 1.5692, 1.5027, 1.4399, 1.3749, 1.3021,
    1.2267, 1.1596, 1.1009, 1.0424, 0.9826, 0.9218, 0.8578, 0.7950, 0.7401, 0.6928,
    0.6481, 0.6023, 0.5594, 0.5230, 0.4879, 0.4505, 0.4133, 0.3775, 0.3439, 0.3154,
    0.2918, 0.2701, 0.2498, 0.2342, 0.2257, 0.2195, 0.2084, 0.1913, 0.1702, 0.1506,
    0.1369, 0.1269, 0.1172, 0.1090, 0.1022, 0.0943, 0.0849, 0.0760, 0.0679, 0.0595,
    0.0511, 0.0441, 0.0387, 0.0336, 0.0286, 0.0239, 0.0200, 0.0168, 0.0138, 0.0109,
    0.0085, 0.0071, 0.0061, 0.0049, 0.0035, 0.0024, 0.0017, 0.0013, 0.0009, 0.0007
  ];

  migrationFemaleAges = [
    0.2413, 0.3600, 0.4756, 0.5204, 0.5223, 0.5135, 0.4943, 0.4602, 0.4213, 0.3933,
    0.3789, 0.3674, 0.3534, 0.3428, 0.3384, 0.3363, 0.3366, 0.3545, 0.4192, 0.5448,
    0.7067, 0.8636, 0.9998, 1.1330, 1.2746, 1.4007, 1.4807, 1.5098, 1.5036, 1.4777,
    1.4405, 1.3921, 1.3297, 1.2573, 1.1833, 1.1106, 1.0369, 0.9643, 0.8996, 0.8445,
    0.7956, 0.7489, 0.7030, 0.6621, 0.6294, 0.5970, 0.5573, 0.5149, 0.4799, 0.4551,
    0.4352, 0.4160, 0.3992, 0.3868, 0.3755, 0.3618, 0.3446, 0.3239, 0.3034, 0.2866,
    0.2717, 0.2575, 0.2444, 0.2319, 0.2221, 0.2149, 0.2049, 0.1888, 0.1697, 0.1524,
    0.1390, 0.1280, 0.1177, 0.1082, 0.0992, 0.0911, 0.0842, 0.0772, 0.0699, 0.0633,
    0.0569, 0.0504, 0.0451, 0.0410, 0.0371, 0.0331, 0.0290, 0.0248, 0.0216, 0.0187,
    0.0155, 0.0126, 0.0101, 0.0078, 0.0054, 0.0036, 0.0027, 0.0022, 0.0019, 0.0017
  ];

  pyramidMale = [
    0.7503, 0.7447, 0.7391, 0.7336, 0.7282, 0.7228, 0.7174, 0.7121, 0.7068, 0.7015,
    0.6963, 0.6912, 0.6860, 0.6809, 0.6759, 0.6708, 0.6658, 0.6608, 0.6559, 0.6509,
    0.6460, 0.6412, 0.6363, 0.6315, 0.6267, 0.6220, 0.6173, 0.6126, 0.6079, 0.6033,
    0.5987, 0.5942, 0.5896, 0.5851, 0.5807, 0.5762, 0.5718, 0.5674, 0.5630, 0.5587,
    0.5544, 0.5501, 0.5458, 0.5415, 0.5372, 0.5330, 0.5287, 0.5245, 0.5202, 0.5160,
    0.5118, 0.5075, 0.5033, 0.4990, 0.4948, 0.4905, 0.4862, 0.4819, 0.4776, 0.4732,
    0.4689, 0.4646, 0.4602, 0.4557, 0.4513, 0.4468, 0.4422, 0.4376, 0.4330, 0.4283,
    0.4235, 0.4186, 0.4136, 0.4085, 0.4032, 0.3978, 0.3922, 0.3864, 0.3803, 0.3740,
    0.3673, 0.3602, 0.3527, 0.3447, 0.3362, 0.3272, 0.3175, 0.3071, 0.2959, 0.2837,
    0.2706, 0.2564, 0.2410, 0.2245, 0.2066, 0.1875, 0.1672, 0.1458, 0.1233, 0.0995
  ];

  pyramidFemale = pyramidMale.slice();


  // Add progress bars to represent an age group of the pyramid
  for(var i = 0; i < 20; i++){
    var newMaleBar =
      "<div class='age-group'>" +
        "<div class='progress' data-toggle='tooltip' data-placement='left' data-age='" + ageGroups[i][0] + "' data-width='" + ageGroups[i][1] + "'>" +
          "<div class='progress-bar progress-bar-primary'></div>" +
        "</div>" +
      "</div>";
    var newFemaleBar =
      "<div class='age-group'>" +
        "<div class='progress' data-toggle='tooltip' data-placement='right' data-age='" + ageGroups[i][0] + "' data-width='" + ageGroups[i][1] + "'>" +
          "<div class='progress-bar progress-bar-info'></div>" +
        "</div>" +
      "</div>";
    $("#male").append(newMaleBar);
    $("#female").append(newFemaleBar);
  }
  updateLength();
  updateTitle();


  // Show statistics and controls when #start is clicked
  $("#start").click(function(){
    population = 1e7;
    birth = Number($("#birth").val());
    death = Number($("#death").val());
    ratio = Number($("#ratio").val());
    migration = Number($("#migration").val());
    var error = false;
    if(isNaN(birth)){
      $("#birth").parent().addClass("has-error");
      $("#birth-error").show();
      error = true;
    } else {
      $("#birth").parent().removeClass("has-error");
      $("#birth-error").hide()
    }
    if(isNaN(death)){
      $("#death").parent().addClass("has-error");
      $("#death-error").show();
      error = true;
    } else {
      $("#death").parent().removeClass("has-error");
      $("#death-error").hide()
    }
    if(isNaN(ratio)){
      $("#ratio").parent().addClass("has-error");
      $("#ratio-error").show();
      error = true;
    } else {
      $("#ratio").parent().removeClass("has-error");
      $("#ratio-error").hide()
    }
    if(isNaN(migration)){
      $("#migration").parent().addClass("has-error");
      $("#migration-error").show();
      error = true;
    } else {
      $("#migration").parent().removeClass("has-error");
      $("#migration-error").hide()
    }
    if(!error){
      $("#s-population").html(population.toLocaleString());
      $("#s-birth").html(birth + "%");
      $("#s-death").html(death + "%");
      $("#s-ratio").html(ratio + ":100");
      $("#s-migration").html(migration + "%");
      $("#controls-start").hide();
      $("#settings").hide();
      $("#controls-update").show();
      $("#stats").show();
      for(var i = 0; i <= 99; i++){
        pyramidMale[i] = Math.round(population * pyramidMale[i] / 100);
        pyramidFemale[i] = Math.round(population * pyramidFemale[i] / 100);
      }
    }
  });


  // Enable tooltips
  $("[data-toggle=tooltip]").tooltip({html: true});


  // Highlight all age groups that are related to the hovered age section
  $("#age-1").on("mouseenter mouseleave", function(){
    for(var i = 0; i <= 7; i++){
      $($("#male .progress .progress-bar")[i]).toggleClass("hover");
      $($("#female .progress .progress-bar")[i]).toggleClass("hover");
    }
  });
  $("#age-2").on("mouseenter mouseleave", function(){
    for(var i = 8; i <= 16; i++){
      $($("#male .progress .progress-bar")[i]).toggleClass("hover");
      $($("#female .progress .progress-bar")[i]).toggleClass("hover");
    }
  });
  $("#age-3").on("mouseenter mouseleave", function(){
    for(var i = 17; i <= 19; i++){
      $($("#male .progress .progress-bar")[i]).toggleClass("hover");
      $($("#female .progress .progress-bar")[i]).toggleClass("hover");
    }
  });


  // Continue updating pyramid when #update-start is clicked until #update-stop is clicked
  runLoop = false;
  $("#update-start").click(function(){
    $("#controls-update").hide();
    $("#controls-stop").show();
    runLoop = true;
    advYearCon();
  });
  $("#update-stop").click(function(){
    $("#controls-stop").hide();
    $("#controls-update").show();
    runLoop = false;
  });
});
