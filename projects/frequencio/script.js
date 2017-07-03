audioCtx = new (window.AudioContext || window.webkitAudioContext)();
currentNotes = [];

// This finds the closest note that is currently being played to the given location
function locateNote(x, y){
  var closest = null;
  var closeBy = Infinity;
  for(var i = 0; i < currentNotes.length; i++){
    if(currentNotes[i]){
      var current = Math.abs(Math.sqrt(x^2 + y^2) - Math.sqrt(currentNotes[i][3]^2 + currentNotes[i][4]^2));
      if(current < closeBy){
        closest = i;
        closeBy = current;
      }
    }
  }
  return closest;
}


// This function returns a percentage of where the frequency is when muscal scale is turned on
function gridPosition(currentFreq, minFreq, maxFreq){
  var realMinFreq = Math.min(minFreq, maxFreq);
  var realMaxFreq = Math.max(minFreq, maxFreq);
  var maxFreqScale = Math.log10(realMaxFreq / realMinFreq) / Math.log10(2**(1/12));
  var curFreqScale = Math.log10(currentFreq / realMinFreq) / Math.log10(2**(1/12));
  var percentage = curFreqScale / maxFreqScale * 100;
  if(minFreq > maxFreq) percentage = 100 - percentage;
  return percentage;
}


// This function draws grids on the screen
function constructGrids(minFreq, maxFreq, grdEvry, mscScal, grdCstm, grdNorm, grdBold, grdBldr){
  $(".grid").remove();
  if(grdCstm){
    for(var i = 0; i < grdNorm.length; i++){
      var percentage = (grdNorm[i] - minFreq) / (maxFreq - minFreq) * 100;
      if(mscScal) percentage = gridPosition(parseFloat(grdNorm[i]), minFreq, maxFreq);
      $("body").append("<div class='grid' style='left: " + percentage + "%'></div>");
    }
    for(var i = 0; i < grdBold.length; i++){
      var percentage = (grdBold[i] - minFreq) / (maxFreq - minFreq) * 100;
      if(mscScal) percentage = gridPosition(parseFloat(grdBold[i]), minFreq, maxFreq);
      $("body").append("<div class='grid grid-bold' style='left: " + percentage + "%'></div>");
    }
    for(var i = 0; i < grdBldr.length; i++){
      var percentage = (grdBldr[i] - minFreq) / (maxFreq - minFreq) * 100;
      if(mscScal) percentage = gridPosition(parseFloat(grdBldr[i]), minFreq, maxFreq);
      $("body").append("<div class='grid grid-bold grid-bldr' style='left: " + percentage + "%'></div>");
    }
  } else {
    for(var i = 0; i < Math.floor(Math.abs(maxFreq - minFreq) / grdEvry); i++){
      var currentFreq = grdEvry * (i + 1) + Math.min(minFreq, maxFreq);
      var percentage = (currentFreq - minFreq) / (maxFreq - minFreq) * 100;
      if(mscScal) percentage = gridPosition(currentFreq, minFreq, maxFreq);
      $("body").append("<div class='grid' style='left: " + percentage + "%'></div>");
    }
  }
}


$(document).ready(function(){

  mouseDown = false;
  var wavForm = "sine";
  var minVolm = 0;
  var maxVolm = 1;
  var minFreq = 20;
  var maxFreq = 20000;
  var sustain = 1000;
  var mscScal = false;
  var grdShow = false;
  var grdSnap = false;
  var grdEvry = 500;
  var grdCstm = false;
  var grdList = [];
  var grdNorm = [];
  var grdBold = [];
  var grdBldr = [];
  var dialogm =
    "<h3 class='setting-title'>Presets</h3>" +
    "<hr>" +
    "<div class='btn-group btn-group-justified'>" +
      "<a class='btn btn-info preset' data-keys='25'>25 Keys</a>" +
      "<a class='btn btn-info preset' data-keys='49'>49 Keys</a>" +
      "<a class='btn btn-info preset' data-keys='61'>61 Keys</a>" +
      "<a class='btn btn-info preset' data-keys='76'>76 Keys</a>" +
      "<a class='btn btn-info preset' data-keys='88'>88 Keys</a>" +
    "</div>" +
    "<hr class='hidden-line'>" +
    "<h3 class='setting-title'>General</h3>" +
    "<hr>" +
    "<div class='row'>" +
      "<div class='col-sm-4 col-xs-6 labels'>" +
        "<p data-toggle='tooltip' data-original-title='The generated waveform. Changing the waveform affects the generated tone.'>Waveform:</p>" +
        "<p data-toggle='tooltip' data-original-title='The lowest volume you could get. You can make it higher than the max volume for upside down volume control.'>Min Volume:</p>" +
        "<p data-toggle='tooltip' data-original-title='The highest volume you could get. You can make it lower than the min volume for upside down volume control.'>Max Volume:</p>" +
        "<p data-toggle='tooltip' data-original-title='The lowest frequency you could make in hertz. You can make it higher than the max frequency for right to left frequency control.'>Min Frequency:</p>" +
        "<p data-toggle='tooltip' data-original-title='The highest frequency you could make in hertz. You can make it lower than the min frequency for right to left frequency control.'>Max Frequency:</p>" +
        "<p data-toggle='tooltip' data-original-title='How much time it takes for the tone to fade out in milliseconds.'>Sustain Duration:</p>" +
        "<p data-toggle='tooltip' data-original-title='Turning this option on will equalise the distance between each musical note.'>Musical Scale:</p>" +
      "</div>" +
      "<div class='col-sm-6 col-xs-4'>" +
        "<select class='form-control' id='wav-form'>" +
          "<option>Sine</option>" +
          "<option>Square</option>" +
          "<option>Sawtooth</option>" +
          "<option>Triangle</option>" +
          "<option>Organ</option>" +
          "<option>Custom 1</option>" +
          "<option>Custom 2</option>" +
          "<option>Custom 3</option>" +
        "</select>" +
        "<input class='form-control' type='number' value='0' id='min-volm' placeholder='Example: 20'><span class='text-muted unit unit-small'>%</span>" +
        "<input class='form-control' type='number' value='100' id='max-volm' placeholder='Example: 100'><span class='text-muted unit unit-small'>%</span>" +
        "<input class='form-control' type='number' value='20' id='min-freq' placeholder='The lowest a human could hear is 20Hz'><span class='text-muted unit'>Hz</span>" +
        "<input class='form-control' type='number' value='20000' id='max-freq' placeholder='The highest a human could hear is 20,000Hz'><span class='text-muted unit'>Hz</span>" +
        "<input class='form-control' type='number' value='1000' id='sustain' placeholder='Example: 1500'><span class='text-muted unit'>ms</span>" +
        "<input type='checkbox' id='msc-scal'>" +
      "</div>" +
    "</div>" +
    "<h3 class='setting-title'>Grids</h3>" +
    "<hr>" +
    "<div class='row'>" +
      "<div class='col-sm-4 col-xs-6 labels'>" +
        "<p data-toggle='tooltip' data-original-title='Show vertical grid lines for easier playing experience.'>Show Grids:</p>" +
        "<p data-toggle='tooltip' data-original-title='Snaps all sounds to the nearest grid line. Requires showing grids first.'>Snap to Grid:</p>" +
        "<p data-toggle='tooltip' data-original-title='Every how many hertz should a grid line be placed. Requires showing grids first.'>Grid Every:</p>" +
        "<p data-toggle='tooltip' data-original-title='Enable this option to place grid lines in whatever frequency position you want.'>Custom Grid:</p>" +
        "<p data-toggle='tooltip' data-original-title='What frequencies to place grids on. Enter the frequency numbers in hertz separated with spaces. Put an asterisk before the number for a thick grid line or two asterisks for a thicker grid line. Requires showing grids and enabling custom grids.'>Custom Grid:</p>" +
      "</div>" +
      "<div class='col-sm-6 col-xs-4'>" +
        "<input type='checkbox' id='grd-show'><br>" +
        "<input type='checkbox' id='grd-snap'>" +
        "<input class='form-control' type='number' value='500' id='grd-evry' placeholder='Example: 500'><span class='text-muted unit'>Hz</span>" +
        "<input type='checkbox' id='grd-cstm'>" +
        "<input class='form-control' type='text' value='1000' id='grd-list' placeholder='Example: 261.63 *392.00 **440 523.25'>" +
      "</div>" +
    "</div>" +
    "<hr class='hidden-line'>" +
    "<a class='btn btn-info btn-lg btn-block' id='save'>Save Settings</a>";

  var noteNames = {
    16.35: "C0",
    17.32: "C#0",
    18.35: "D0",
    19.45: "D#0",
    20.60: "E0",
    21.83: "F0",
    23.12: "F#0",
    24.50: "G0",
    25.96: "G#0",
    27.50: "A0",
    29.14: "A#0",
    30.87: "B0",
    32.70: "C1",
    34.65: "C#1",
    36.71: "D1",
    38.89: "D#1",
    41.20: "E1",
    43.65: "F1",
    46.25: "F#1",
    49.00: "G1",
    51.91: "G#1",
    55.00: "A1",
    58.27: "A#1",
    61.74: "B1",
    65.41: "C2",
    69.30: "C#2",
    73.42: "D2",
    77.78: "D#2",
    82.41: "E2",
    87.31: "F2",
    92.50: "F#2",
    98.00: "G2",
    103.83: "G#2",
    110.00: "A2",
    116.54: "A#2",
    123.47: "B2",
    130.81: "C3",
    138.59: "C#3",
    146.83: "D3",
    155.56: "D#3",
    164.81: "E3",
    174.61: "F3",
    185.00: "F#3",
    196.00: "G3",
    207.65: "G#3",
    220.00: "A3",
    233.08: "A#3",
    246.94: "B3",
    261.63: "C4",
    277.18: "C#4",
    293.66: "D4",
    311.13: "D#4",
    329.63: "E4",
    349.23: "F4",
    369.99: "F#4",
    392.00: "G4",
    415.30: "G#4",
    440.00: "A4",
    466.16: "A#4",
    493.88: "B4",
    523.25: "C5",
    554.37: "C#5",
    587.33: "D5",
    622.25: "D#5",
    659.25: "E5",
    698.46: "F5",
    739.99: "F#5",
    783.99: "G5",
    830.61: "G#5",
    880.00: "A5",
    932.33: "A#5",
    987.77: "B5",
    1046.50: "C6",
    1108.73: "C#6",
    1174.66: "D6",
    1244.51: "D#6",
    1318.51: "E6",
    1396.91: "F6",
    1479.98: "F#6",
    1567.98: "G6",
    1661.22: "G#6",
    1760.00: "A6",
    1864.66: "A#6",
    1975.53: "B6",
    2093.00: "C7",
    2217.46: "C#7",
    2349.32: "D7",
    2489.02: "D#7",
    2637.02: "E7",
    2793.83: "F7",
    2959.96: "F#7",
    3135.96: "G7",
    3322.44: "G#7",
    3520.00: "A7",
    3729.31: "A#7",
    3951.07: "B7",
    4186.01: "C8",
    4434.92: "C#8",
    4698.63: "D8",
    4978.03: "D#8",
    5274.04: "E8",
    5587.65: "F8",
    5919.91: "F#8",
    6271.93: "G8",
    6644.88: "G#8",
    7040.00: "A8",
    7458.62: "A#8",
    7902.13: "B8",
    8372.02: "C9",
    8869.85: "C#9",
    9397.28: "D9",
    9956.07: "D#9",
    10548.09: "E9",
    11175.31: "F9",
    11839.83: "F#9",
    12543.86: "G9",
    13289.76: "G#9",
    14080.01: "A9",
    14917.25: "A#9",
    15804.28: "B9",
    16744.05: "C10",
    17739.7: "C#10",
    18794.56: "D10",
    19912.14: "D#10",
  }

  // Make the welcome screen fade away
  setTimeout(function(){
    $("#welcome").fadeOut(500);
  }, 1500);

  // Make a new sound when touching #playground
  $("#playground").bind("touchstart mousedown", function(e){
    e.preventDefault();
    // This is to support both touch and mouse control
    var started = e.originalEvent.changedTouches || [e.originalEvent];
    if(!e.originalEvent.changedTouches) mouseDown = true;
    // Prevent double taps for touch devices
    if((("ontouchstart" in window || navigator.maxTouchPoints) && e.type != "mousedown") || (!("ontouchstart" in window || navigator.maxTouchPoints) && e.type == "mousedown")){
      for(var i = 0; i < started.length; i++){
        // Modify pageY to not include the height of the top and bottom rows
        var pageY = started[i].pageY > 69 ? started[i].pageY - 69 : 0;
        pageY = started[i].pageY > $("#playground").height() ? $("#playground").height() : started[i].pageY;
        var newNote = [audioCtx.createGain(), audioCtx.createOscillator(), started[i].pageX, started[i].pageY];
        var thisFreq = started[i].pageX / $("#playground").width() * (maxFreq - minFreq) + minFreq;
        // If the musical scale option is on, change the frequency to rely on that
        if(mscScal){
          var realMinFreq = Math.min(minFreq, maxFreq);
          var realMaxFreq = Math.max(minFreq, maxFreq);
          var maxFreqScale = Math.log10(realMaxFreq / realMinFreq) / Math.log10(2**(1/12));
          thisFreq = realMinFreq * 2**(started[i].pageX / $("#playground").width() * maxFreqScale / 12);
          if(minFreq > maxFreq) thisFreq = realMinFreq * 2**((1 - (started[i].pageX / $("#playground").width())) * maxFreqScale / 12);
        }
        // This is to find the closest music note to display at the bottom
        var freqList = $.map(Object.keys(noteNames), function(i){return parseFloat(i)})
        var closestNote = freqList.reduce(function(prev, curr){
          return (Math.abs(curr - thisFreq) < Math.abs(prev - thisFreq) ? curr : prev);
        });
        // Change the frequency to the frequency of the closest grid if the grid snap option is turned on
        if(grdShow && grdSnap){
          var searchList = $.map(grdList, function(i){return parseFloat(i.replace(/^\*\*?/, ""))});
          if(!grdCstm){
            searchList = [];
            for(var i = 0; i < Math.ceil(Math.max(minFreq, maxFreq) / grdEvry); i++){
              searchList.push(grdEvry * (i + 1));
            }
          }
          var thisFreq = searchList.reduce(function(prev, curr){
            return (Math.abs(curr - thisFreq) < Math.abs(prev - thisFreq) ? curr : prev);
          });
        }
        // Make the frequency sound
        newNote[0].connect(audioCtx.destination);
        newNote[0].gain.value = (1 - (pageY / $("#playground").height())) * (maxVolm - minVolm) + minVolm;
        switch(wavForm){
          case "organ":
            var real = new Float32Array([0,0,-0.042008,0.010474,-0.138038,0.002641,-0.001673,0.001039,-0.021054,0.000651,-0.000422,0.000334,-0.000236,0.000191,-0.000161,0.000145,-0.018478,0.000071,-0.000066,0.000047,-0.000044,0.000041,-0.000034,0.000031,-0.000030,0.000028,-0.000025,0.000024,-0.000022,0.000020,-0.000015,0.000013,-0.011570,0.000004,-0.000003,0.000003,-0.000003,0.000003,-0.000003,0.000002,-0.000002,0.000002,-0.000002,0.000002,-0.000002,0.000002,-0.000002,0.000002,-0.000001,0.000001,-0.000001,0.000001,0,0,0,0,0,0,0,0,0,0,0,0,-0.000898,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001,0.000001,-0.000001]);
            var imag = new Float32Array([0,0.196487,0,0,-0.000003,0,0,0,-0.000002,0,0,0,0,0,0,0,-0.000007,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-0.000018,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-0.000006,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            newNote[1].setPeriodicWave(audioCtx.createPeriodicWave(real, imag));
            break;    

          case "custom 1":
            var real = new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8]);
            var imag = new Float32Array(real.length);
            newNote[1].setPeriodicWave(audioCtx.createPeriodicWave(real, imag));
            break;

          case "custom 2":
            var real = new Float32Array([1,-1,1]);
            var imag = new Float32Array(real.length);
            newNote[1].setPeriodicWave(audioCtx.createPeriodicWave(real, imag));
            break;

          case "custom 3":
            var real = new Float32Array([1,0,-1,-1,0.7,0,0,0,0.7,0,0.2]);
            var imag = new Float32Array(real.length);
            newNote[1].setPeriodicWave(audioCtx.createPeriodicWave(real, imag));
            break;

          default:
            newNote[1].type = wavForm;
        }
        newNote[1].frequency.value = thisFreq;
        newNote[1].connect(newNote[0]);
        newNote[1].start();
        currentNotes.push(newNote);
        // Display the frequency of the current note at the bottom with a leading .0 if there is no .n at the end
        var newFreq = Math.round(thisFreq).toLocaleString();
        $("#current-notes").prepend("<div id='note-" + (currentNotes.length - 1) + "' class='note'>" + newFreq + " Hz | " + noteNames[closestNote] + "</div>");
      }
    }
  });

  // Change the frequency and volume of the moved note on #playground
  $("#playground").bind("touchmove mousemove", function(e){
    e.preventDefault();
    // The way this works is very similar to how the previous function works
    // It only finds the closest note in the currentNotes array and changes its frequency
    var moved = e.originalEvent.changedTouches || [e.originalEvent];
    if((e.originalEvent.changedTouches || mouseDown) && ((("ontouchstart" in window || navigator.maxTouchPoints) && e.type != "mousemove") || (!("ontouchstart" in window || navigator.maxTouchPoints) && e.type == "mousemove"))){
      for(var i = 0; i < moved.length; i++){
        var targetIndex = locateNote(moved[i].pageX, moved[i].pageY);
        var pageY = moved[i].pageY > 69 ? moved[i].pageY - 69 : 0;
        pageY = moved[i].pageY > $("#playground").height() ? $("#playground").height() : moved[i].pageY;
        var thisFreq = moved[i].pageX / $("#playground").width() * (maxFreq - minFreq) + minFreq;
        if(mscScal){
          var realMinFreq = Math.min(minFreq, maxFreq);
          var realMaxFreq = Math.max(minFreq, maxFreq);
          var maxFreqScale = Math.log10(realMaxFreq / realMinFreq) / Math.log10(2**(1/12));
          thisFreq = realMinFreq * 2**(moved[i].pageX / $("#playground").width() * maxFreqScale / 12);
          if(minFreq > maxFreq) thisFreq = realMinFreq * 2**((1 - (moved[i].pageX / $("#playground").width())) * maxFreqScale / 12);
        }
        var freqList = $.map(Object.keys(noteNames), function(i){return parseFloat(i)})
        var closestNote = freqList.reduce(function(prev, curr){
          return (Math.abs(curr - thisFreq) < Math.abs(prev - thisFreq) ? curr : prev);
        });
        if(grdShow && grdSnap){
          var searchList = $.map(grdList, function(i){return parseFloat(i.replace(/^\*\*?/, ""))});
          if(!grdCstm){
            searchList = [];
            for(var i = 0; i < Math.ceil(Math.max(minFreq, maxFreq) / grdEvry); i++){
              searchList.push(grdEvry * (i + 1));
            }
          }
          var thisFreq = searchList.reduce(function(prev, curr){
            return (Math.abs(curr - thisFreq) < Math.abs(prev - thisFreq) ? curr : prev);
          });
        }
        currentNotes[targetIndex][0].gain.value = (1 - (pageY / $("#playground").height())) * (maxVolm - minVolm) + minVolm;
        currentNotes[targetIndex][1].frequency.value = thisFreq;
        var newFreq = Math.round(thisFreq).toLocaleString();
        $("#note-" + targetIndex).html(newFreq + " Hz | " + noteNames[closestNote]);
      }
    }
  });

  // Make the sound fade away when the finger is lifted from #playground
  $(document).bind("touchend mouseup", function(e){
    e.preventDefault();
    var ended = e.originalEvent.changedTouches || [e.originalEvent];
    if(!e.originalEvent.changedTouches) mouseDown = false;
    if((("ontouchstart" in window || navigator.maxTouchPoints) && e.type != "mouseup") || (!("ontouchstart" in window || navigator.maxTouchPoints) && e.type == "mouseup")){
      for(var i = 0; i < ended.length; i++){
        var targetIndex = locateNote(ended.pageX, ended.pageY);
        var target = currentNotes[targetIndex];
        delete currentNotes[targetIndex];
        var decreaseBy = target[0].gain.value / (sustain || 1);
        // Add the sustain effect
        for(var i = 0; i < sustain; i++){
          setTimeout(function(){
            target[0].gain.value -= decreaseBy;
          }, i);
        }
        setTimeout(function(){target[1].stop(); $("#note-" + targetIndex).remove()}, sustain);
        $("#note-" + targetIndex).fadeOut(sustain);
      }
    }
  });

  // Show the settings menu when #settings-button is click #settings-button
  $("#settings-button").click(function(){
    settingsDialog = new BootstrapDialog({
      title: "Settings",
      message: dialogm,
      size: BootstrapDialog.SIZE_WIDE
    });
    settingsDialog.open();
    setTimeout(function(){
      // Enable iCheck checkboxes
      $("input").iCheck({
        checkboxClass: "icheckbox_square-purple",
        radioClass: "iradio_square-purple"
      });
      // Enable tooltips
      $(document).ready(function(){
          $("[data-toggle='tooltip']").tooltip(); 
      });
      // Show current settings
      $("#wav-form").val(wavForm[0].toUpperCase() + wavForm.slice(1));
      $("#min-volm").val(minVolm * 100);
      $("#max-volm").val(maxVolm * 100);
      $("#min-freq").val(minFreq);
      $("#max-freq").val(maxFreq);
      $("#sustain").val(sustain);
      if(mscScal) $("#msc-scal").parent().addClass("checked");
      if(grdShow) $("#grd-show").parent().addClass("checked");
      if(grdSnap) $("#grd-snap").parent().addClass("checked");
      $("#grd-evry").val(grdEvry);
      if(grdCstm) $("#grd-cstm").parent().addClass("checked");
      $("#grd-list").val(grdList.join(" "));
    }, 150);
  });

  // Presets
  $(document).on("click", ".preset", function(){
    $("#msc-scal").parent().addClass("checked");
    $("#grd-show").parent().addClass("checked");
    $("#grd-cstm").parent().addClass("checked");
    switch($(this).attr("data-keys")){
      case "25":
        $("#min-freq").val(246.94);
        $("#max-freq").val(1108.73);
        $("#grd-list").val("**261.63 277.18 *293.66 311.13 *329.63 *349.23 369.99 *392.00 415.3 *440 466.16 *493.88 **523.25 554.37 *587.33 622.25 *659.25 *698.46 739.99 *783.99 830.61 *880.00 932.33 *987.77 **1046.5");
        break;
      case "49":
        $("#min-freq").val(61.74);
        $("#max-freq").val(1108.73);
        $("#grd-list").val("**65.41 69.3 *73.42 77.78 *82.41 *87.31 92.5 *98 103.83 *110 116.54 *123.47 **130.81 138.59 *146.83 155.56 *164.81 *174.61 185 *196 207.65 *220 233.08 *246.94 **261.63 277.18 *293.66 311.13 *329.63 *349.23 369.99 *392 415.3 *440 466.16 *493.88 **523.25 554.37 *587.33 622.25 *659.25 *698.46 739.99 *783.99 830.61 *880 932.33 *987.77 **1046.5");
        break;
      case "61":
        $("#min-freq").val(61.74);
        $("#max-freq").val(2217.46);
        $("#grd-list").val("**65.41 69.3 *73.42 77.78 *82.41 *87.31 92.5 *98 103.83 *110 116.54 *123.47 **130.81 138.59 *146.83 155.56 *164.81 *174.61 185 *196 207.65 *220 233.08 *246.94 **261.63 277.18 *293.66 311.13 *329.63 *349.23 369.99 *392 415.3 *440 466.16 *493.88 **523.25 554.37 *587.33 622.25 *659.25 *698.46 739.99 *783.99 830.61 *880 932.33 *987.77 **1046.5 1108.73 *1174.66 1244.51 *1318.51 *1396.91 1479.98 *1567.98 1661.22 *1760 1864.66 *1975.53 **2093");
        break;
      case "76":
        $("#min-freq").val(38.89);
        $("#max-freq").val(3322.44);
        $("#grd-list").val("*41.2 *43.65 46.25 *49 51.91 *55 58.27 *61.74 **65.41 69.3 *73.42 77.78 *82.41 *87.31 92.5 *98 103.83 *110 116.54 *123.47 **130.81 138.59 *146.83 155.56 *164.81 *174.61 185 *196 207.65 *220 233.08 *246.94 **261.63 277.18 *293.66 311.13 *329.63 *349.23 369.99 *392 415.3 *440 466.16 *493.88 **523.25 554.37 *587.33 622.25 *659.25 *698.46 739.99 *783.99 830.61 *880 932.33 *987.77 **1046.5 1108.73 *1174.66 1244.51 *1318.51 *1396.91 1479.98 *1567.98 1661.22 *1760 1864.66 *1975.53 **2093 2217.46 *2349.32 2489.02 *2637.02 *2793.83 2959.96 *3135.96");
        break;
      case "88":
        $("#min-freq").val(25.96);
        $("#max-freq").val(4434.92);
        $("#grd-list").val("*27.5 29.14 *30.87 **32.7 34.65 *36.71 38.89 *41.2 *43.65 46.25 *49 51.91 *55 58.27 *61.74 **65.41 69.3 *73.42 77.78 *82.41 *87.31 92.5 *98 103.83 *110 116.54 *123.47 **130.81 138.59 *146.83 155.56 *164.81 *174.61 185 *196 207.65 *220 233.08 *246.94 **261.63 277.18 *293.66 311.13 *329.63 *349.23 369.99 *392 415.3 *440 466.16 *493.88 **523.25 554.37 *587.33 622.25 *659.25 *698.46 739.99 *783.99 830.61 *880 932.33 *987.77 **1046.5 1108.73 *1174.66 1244.51 *1318.51 *1396.91 1479.98 *1567.98 1661.22 *1760 1864.66 *1975.53 **2093 2217.46 *2349.32 2489.02 *2637.02 *2793.83 2959.96 *3135.96 3322.44 *3520 3729.31 *3951.07 **4186.01");
        break;
    }
  });

  // Automatically fix wrong inputs in settings
  $(document).on("blur", "#min-volm, #max-volm", function(){
    if($("#min-volm").val().isNaN) $("#min-volm").val(minVolm);
    if($("#max-volm").val().isNaN) $("#max-volm").val(maxVolm);
    if($(this).val() < 0) $(this).val("0");
    if($(this).val() > 100) $(this).val("100");
  });

  $(document).on("blur", "#min-freq, #max-freq", function(){
    if($("#min-freq").val().isNaN) $("#min-freq").val(minFreq);
    if($("#max-freq").val().isNaN) $("#max-freq").val(maxFreq);
    if($(this).val() < 20) $(this).val("20");
    if($(this).val() > 20000) $(this).val("20000");
    if($("#grd-evry").val() > Math.max($("#min-freq").val(), $("#max-freq").val())) $("#grd-evry").val(Math.max($("#min-freq").val(), $("#max-freq").val()));
  });

  $(document).on("blur", "#sustain", function(){
    if($(this).val() < 0) $(this).val("0");
    if($(this).val().isNaN) $(this).val(sustain);
  });

  $(document).on("blur", "#grd-evry", function(){
    if($(this).val().isNaN) $(this).val(grdEvry);
    if($(this).val() > Math.max($("#min-freq").val(), $("#max-freq").val())) $(this).val(Math.max($("#min-freq").val(), $("#max-freq").val()));
  });

  $(document).on("blur", "#grd-list", function(){
    var splitList = $(this).val().split(" ").filter(function(i){return i});
    splitList = $.map(splitList, function(i){if(!i.replace(/^\*\*?/, "").isNaN){return i}});
    splitList = $.map(splitList, function(i){
      var isBold = /^\*/.test(i);
      var isBolder = /^\*\*/.test(i);
      i = parseFloat(i.replace(/^\*\*?/, ""));
      if(i < Math.min($("#min-freq").val(), $("#max-freq").val())) i = Math.min($("#min-freq").val(), $("#max-freq").val());
      if(i > Math.max($("#min-freq").val(), $("#max-freq").val())) i = Math.max($("#min-freq").val(), $("#max-freq").val());
      if(isBold) i = "*" + i;
      if(isBolder) i = "*" + i;
      return i.toString();
    });
    $(this).val(splitList.join(" "));
  });

  // Change settings when #save is clicked
  $(document).on("click", "#save", function(){
    wavForm = $("#wav-form").val().toLowerCase();
    minVolm = parseFloat($("#min-volm").val()) / 100;
    maxVolm = parseFloat($("#max-volm").val()) / 100;
    minFreq = parseFloat($("#min-freq").val());
    maxFreq = parseFloat($("#max-freq").val());
    sustain = parseFloat($("#sustain").val());
    mscScal = $("#msc-scal").parent().hasClass("checked");
    grdShow = $("#grd-show").parent().hasClass("checked");
    grdSnap = $("#grd-snap").parent().hasClass("checked");
    grdEvry = parseFloat($("#grd-evry").val());
    grdCstm = $("#grd-cstm").parent().hasClass("checked");
    grdList = $("#grd-list").val().split(" ");
    grdNorm = $.map($("#grd-list").val().split(" "), function(i){if(i[0] != "*"){return i}});
    grdBold = $.map($("#grd-list").val().split(" "), function(i){if(i[0] == "*" && i[1] != "*"){return i.substring(1)}});
    grdBldr = $.map($("#grd-list").val().split(" "), function(i){if(i[0] == "*" && i[1] == "*"){return i.substring(2)}});
    if(grdShow) constructGrids(minFreq, maxFreq, grdEvry, mscScal, grdCstm, grdNorm, grdBold, grdBldr);
    settingsDialog.close();
  });
});
