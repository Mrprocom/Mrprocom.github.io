// This function converts seconds to the most suitable time unit
function timeUnit(seconds){

  if(Math.floor(seconds / 31536000) > 0){
    output = [Math.round(seconds / 31536000 * 1000) / 1000, "year"];
  } else if(Math.floor(seconds / 2626560) > 0){
    output = [Math.round(seconds / 2626560 * 1000) / 1000, "month"];
  } else if(Math.floor(seconds / 604800) > 0){
    output = [Math.round(seconds / 604800 * 1000) / 1000, "week"];
  } else if(Math.floor(seconds / 86400) > 0){
    output = [Math.round(seconds / 86400 * 1000) / 1000, "day"];
  } else if(Math.floor(seconds / 3600) > 0){
    output = [Math.round(seconds / 3600 * 1000) / 1000, "hour"];
  } else if(Math.floor(seconds / 60) > 0){
    output = [Math.round(seconds / 60 * 1000) / 1000, "minute"];
  } else {
    output = [seconds, "second"];
  }
  if(output[0] == 1){
    return output[0] + " " + output[1];
  } else {
    return output[0] + " " + output[1] + "s";
  }
}


// This function converts litres to the most suitable unit
function volumeUnit(volume){

  if(Math.floor(volume / 65500) > 0){
    output = [Math.round(volume / 65500), "swimming pool"];
  } else if(Math.floor(volume / 11000) > 0){
    output = [Math.round(volume / 11000), "water tanker truck"];
  } else if(Math.floor(volume / 780) > 0){
    output = [Math.round(volume / 780), "fridge"];
  } else if(Math.floor(volume / 113) > 0){
    output = [Math.round(volume / 113), "garbage bag"];
  } else {
    return false;
  }
  if(output[0] == 1){
    return output[0] + " " + output[1];
  } else {
    return output[0] + " " + output[1] + "s";
  }
}


// This function converts kilograms to the most suitable unit
function weightUnit(weight){

  if(Math.floor(weight / 136000) > 0){
    output = [Math.round(weight / 136000), "blue whale"];
  } else if(Math.floor(weight / 3900) > 0){
    output = [Math.round(weight / 3900), "half-tonne pickup truck"];
  } else if(Math.floor(weight / 2700) > 0){
    output = [Math.round(weight / 2700), "asian elephant"];
  } else if(Math.floor(weight / 1850) > 0){
    output = [Math.round(weight / 1850), "car"];
  } else if(Math.floor(weight / 725) > 0){
    output = [Math.round(weight / 725), "cow"];
  } else if(Math.floor(weight / 80) > 0){
    output = [Math.round(weight / 80), "human"];
  } else if(Math.floor(weight / 7) > 0){
    output = [Math.round(weight / 7), "bowling ball"];
  } else {
    return false;
  }
  if(output[0] == 1){
    return output[0] + " " + output[1];
  } else {
    return output[0] + " " + output[1] + "s";
  }
}


$(document).ready(function(){

  // Set the max value of #birthday to yesterday
  $("#birthday").prop("max", function(){
    return new Date(new Date().setDate(new Date().getDate()-1)).toJSON().split("T")[0];
  });

  $("#birthday").change(function(){
    // Check if the input is not empty
    if($(this).val() == ""){
      return null;
    }

    // Remove old statistics
    $(".panel").remove();
    // Calculate the age in seconds
    birthday = new Date($(this).val()).getTime() / 1000;
    datetime = new Date().getTime() / 1000;
    duration = Math.round(datetime - birthday);
    // Calculate the full age
    years = Math.floor(duration / 31536000) * 31536000;
    months = Math.floor((duration - years) / 2626560) * 2626560;
    days = Math.floor((duration - years - months) / 86400) * 86400;
    hours = Math.floor((duration - years - months - days) / 3600) * 3600;
    minutes = Math.floor((duration - years - months - days - hours) / 60) * 60;
    seconds = Math.floor(duration - years - months - days - hours - minutes);
    years = years / 31536000;
    months = months / 2626560;
    days = days / 86400;
    hours = hours / 3600;
    minutes = minutes / 60;
    // Make the time unit plural if it is
    if(years == 1){years = years + " year, "} else {years = years + " years, "}
    if(months == 1){months = months + " month, "} else {months = months + " months, "}
    if(days == 1){days = days + " day, "} else {days = days + " days, "}
    if(hours == 1){hours = hours + " hour, "} else {hours = hours + " hours, "}
    if(minutes == 1){minutes = minutes + " minute and "} else {minutes = minutes + " minutes and "}
    if(seconds == 1){seconds = seconds + " second"} else {seconds = seconds + " seconds"}
    // Join everything in one string
    fullAge = years + months + days + hours + minutes + seconds;
    // Calculate the total number of months, weeks, days, hours, minutes and seconds lived
    totalMonths = Math.round(duration / 2626560).toLocaleString();
    totalWeeks = Math.round(duration / 604800).toLocaleString();
    totalDays = Math.round(duration / 86400).toLocaleString();
    totalHours = Math.round(duration / 3600).toLocaleString();
    totalMinutes = Math.round(duration / 60).toLocaleString();
    totalSeconds = duration.toLocaleString();
    // Calculate statistics for consciousness
    awakeTime = timeUnit(Math.round(duration * 63.125 / 100));
    sleepTime = timeUnit(Math.round(duration * 36.875 / 100));
    // Calculate statistics for food and drinks intake
    fluidsVolume = Math.round(duration * 0.000023);
    fluidsVolumeE = volumeUnit(fluidsVolume);
    foodWeight = Math.round(duration * 0.000021);
    foodWeightE = weightUnit(foodWeight);
    // Calculate statistics for human waste
    farts = Math.round(duration * 0.00016).toLocaleString();
    fartsVolume = Math.round(duration * 0.0000058);
    fartsVolumeE = volumeUnit(fartsVolume);
    fecesWeight = Math.round(duration * 0.00000521);
    fecesWeightE = weightUnit(fecesWeight);
    urineVolume = Math.round(duration * 0.000016);
    urineVolumeE = volumeUnit(urineVolume);
    urineWeight = Math.round(urineVolume * 1.015);
    urineWeightE = weightUnit(urineWeight);
    // Calculate other statistics
    blinks = Math.round(duration * 63.125 / 100 * 0.283);
    blinksTime = timeUnit(Math.round(blinks * 0.250));
    breaths = Math.round(duration * 0.267).toLocaleString();
    heartbeats = Math.round(duration * 1.2).toLocaleString();
    sneezes = Math.round(duration * 0.000029).toLocaleString();
    yawns = Math.round(duration * 0.0000579);
    yawnsTime = timeUnit(yawns * 6);
    // Convert numbers to strings of numbers separated by commas
    blinks = blinks.toLocaleString();
    fartsVolume = fartsVolume.toLocaleString();
    fecesWeight = fecesWeight.toLocaleString();
    fluidsVolume = fluidsVolume.toLocaleString();
    foodWeight = foodWeight.toLocaleString();
    urineVolume = urineVolume.toLocaleString();
    urineWeight = urineWeight.toLocaleString();
    yawns = yawns.toLocaleString();
    // Make the HTML of each panel
    lifespanPanel =
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>Lifespan</div>" +
        "<div class='panel-body'><ul>" +
          "<li>You have lived for " + fullAge + ".</li>" +
          "<li>The total number of months you have lived is " + totalMonths + ".</li>" +
          "<li>The total number of weeks you have lived is " + totalWeeks + ".</li>" +
          "<li>The total number of days you have lived is " + totalDays + ".</li>" +
          "<li>The total number of hours you have lived is " + totalHours + ".</li>" +
          "<li>The total number of minutes you have lived is " + totalMinutes + ".</li>" +
          "<li>The total number of seconds you have lived is " + totalSeconds + ".</li>" +
        "</ul></div>" +
      "</div>";

    consciousnessPanel =
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>Consciousness</div>" +
        "<div class='panel-body'><ul>" +
          "<li>You have been awake for " + awakeTime + ".</li>" +
          "<li>You have been asleep for " + sleepTime + ".</li>" +
        "</ul></div>" +
      "</div>";

    foodDrinksIntakePanel =
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>Food and Fluids Intake</div>" +
        "<div class='panel-body'><ul>" +
          "<li>The total weight of all food you ate is " + foodWeight + "Kg.</li>";
          if(foodWeightE){
            foodDrinksIntakePanel += "<ul><li>That is equivalent to the weight of " + foodWeightE + "!</li></ul>";
          }
          foodDrinksIntakePanel += "<li>The total volume of all fluids you drank is " + fluidsVolume + "L.</li>";
          if(fluidsVolumeE){
            foodDrinksIntakePanel += "<ul><li>That is equivalent to the capacity of " + fluidsVolumeE + "!</li></ul>";
          }
        foodDrinksIntakePanel += "</ul></div>" +
      "</div>";

    wastePanel =
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>Body Waste</div>" +
        "<div class='panel-body'><ul>" +
          "<li>The total number of farts you made is " + farts + ".</li>" +
          "<li>The total volume of all farts you made is " + fartsVolume + "L.</li>";
          if(fartsVolumeE){
            wastePanel += "<ul><li>That is equivalent to the capacity of " + fartsVolumeE + "!</li></ul>";
          }
          wastePanel += "<li>The total weight of all feces you produced is " + fecesWeight + "Kg.</li>";
          if(fecesWeightE){
            wastePanel += "<ul><li>That is equivalent to the weight of " + fecesWeightE + "!</li></ul>";
          }
          wastePanel += "<li>The total volume of all urine you produced is " + urineVolume + "L.</li>";
          if(urineVolumeE){
            wastePanel += "<ul><li>That is equivalent to the capacity of " + urineVolumeE + "!</li></ul>";
          }
          wastePanel += "<li>The total weight of all urine you produced is " + urineWeight + "Kg.</li>";
          if(urineWeightE){
            wastePanel += "<ul><li>That is equivalent to the weight of " + urineWeightE + "!</li></ul>";
          }
        wastePanel += "</ul></div>" +
      "</div>";

    otherPanel =
      "<div class='panel panel-default'>" +
        "<div class='panel-heading'>Other Statistics</div>" +
        "<div class='panel-body'><ul>" +
          "<li>The number of times you have blinked is " + blinks + ".</li>" +
          "<li>You have spent " + blinksTime + " of your life blinking.</li>" +
          "<li>The total number of times you breathed is " + breaths + ".</li>" +
          "<li>The total number of times your heart beat is " + heartbeats + ".</li>" +
          "<li>The total number of times you sneezed is " + sneezes + ".</li>" +
          "<li>The total number of times you yawned is " + yawns + ".</li>" +
          "<li>You have spent " + yawnsTime + " of your life yawning.</li>" +
        "</ul></div>" +
      "</div>";

    // Show all panels
    $(".container").append(lifespanPanel, consciousnessPanel, foodDrinksIntakePanel, wastePanel, otherPanel);
  });
});
