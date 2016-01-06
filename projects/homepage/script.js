$(document).ready(function(){

  var oneKeyDown = false;
  storage = $.localStorage;
  // Check if "pages" was declared
  if(!storage.isSet("pages")){
    storage.set("pages", []);
  }
  sPages = storage.get("pages");

  // Switch to main-page.html when #switch-main is clicked
  $("#switch-main").on("click", function(){
    $("#iframe-screen").attr("src", "main-page.html");
  });


  // Google search
  $(".google").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/search?q=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  // YouTube search
  $(".youtube").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.youtube.com/results?search_query=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  // Imgaes search
  $(".images").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/search?q=" + searchUrl + "&tbm=isch";
    window.open(searchUrl, "_blank");
  });


  // Maps search
  $(".maps").on("click", function(){
    var searchUrl = encodeURIComponent($("#search-input").val()).replace("%20", "+");
    searchUrl = "https://www.google.com/maps?q=" + searchUrl;
    window.open(searchUrl, "_blank");
  });


  // URL search
  $(".url").on("click", function(){
    var searchUrl = $("#search-input").val();
    $("#iframe-screen").attr("src", searchUrl);
  });


  // Google search on input submit
  $("#search-input").keypress(function(e){
    if (e.which == 13) {
      var searchUrl = encodeURIComponent($(this).val()).replace("%20", "+");
      searchUrl = "https://www.google.com/search?q=" + searchUrl;
      window.open(searchUrl, "_blank");
      return false;
    }
  });


  // Make it so that links can be viewed on the iframe by holding the 1 key
  // Set oneKeyDown to true if the 1 key is being held
  $(document).on("keydown", function(e){
    if (e.which === 49){
        oneKeyDown = true;
      }
  });

  // Set oneKeyDown to false if the 1 key has been released
  $(document).on("keyup", function(e){
    if (e.which === 49){
        oneKeyDown = false;
      }
  });

  // Set the src of the iframe to the href of the .shiftable url
  $(document).on("click", ".shiftable", function(e){
    if(oneKeyDown){
      e.preventDefault();
      $("#iframe-screen").attr("src", $(this).attr("href"));
    }
  });

  // Navigate to the href of .shiftable-tab if the url is from main-page.html
  $(document).on("click", ".shiftable-tab", function(e){
    if(oneKeyDown){
      e.preventDefault();
      window.location = $(this).attr("href");
    }
  });


  // Add rows to the dropdown list using sPages
  for(var page in sPages){

    var newItem = "<li><a href='" + sPages[page][1] + "' class='shiftable'>" + sPages[page][0] + "</a></li>";
    $("#custom").append(newItem);
  }



  $("#add").on("click", function(){
    var name = prompt("Name: ");
    var url = prompt("URL: ");
    sPages.push([name, url]);
    storage.set("pages", sPages);
    location.reload();
  });



  $("#edit").on("click", function(){

    // Prepare an array of nested arrays of sPages
    pagesToStr = [];
    // Add a nested array
    for(var nested in sPages){
      pagesToStr.push('["' + sPages[nested][0] + '", "' + sPages[nested][1] + '"]');
    }

    // Convert array to string with brackets
    pagesToStr = "[" + pagesToStr.join(", ") + "]";
    // Prompt the user to edit the current setup and use the current setup as the default prompt value
    var newPages = prompt("New array ([\"Name\", \"URL\"]): ", pagesToStr);
    // Check if the new array is safe to use
    try {
      // Convert the string to an array
      newPages = JSON.parse(newPages);
      allowed = true;
      for(var nested in newPages){
        // Check if all nested arrays contain two strings
        if((typeof newPages[nested][0] !== "string") && (typeof newPages[nested][1] !== "string") && (newPages[nested].length != 2)){
          allowed = false;
          break;
        }
      }

      if(allowed){
        storage.set("pages", newPages);
        location.reload();
      } else {
        alert("Error: The array you have entered it invalid.")
      }
    }

    catch(err){
      alert(err);
    }
  });
});
