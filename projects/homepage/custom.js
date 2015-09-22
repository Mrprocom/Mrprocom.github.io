$(document).ready(function(){


  // Global variables
  storage = $.localStorage;
  sPages = storage.get("pages");

  // Default pages
  if(storage.isEmpty()){
    storage.set("pages", []);
  }

  // Add rows to the table using sPages
  for(var page in sPages){

    var newColumn =
      "<tr name='" + page + "'>" +
        "<td>" + (parseInt(page, 10) + 1) + "</td>" +
        "<td><a href='" + sPages[page][1] + "'>" + sPages[page][0] + "</a></td>" +
        "<td><a class='btn btn-danger btn-xs remove' name='" + page + "'>Remove</a></td>" +
      "</tr>";

    $("#page-container").append(newColumn);
  }


  // Remove function
  $(document).on("click", ".remove", function(){
    var pageNum = $(this).attr("name");
    sPages.splice(pageNum, 1);
    storage.set("pages", sPages);
    location.reload();
  });


  // Add a new page function
  $("#create").on("click", function(){
    var name = prompt("Name:");
    var url = prompt("URL:");
    sPages.push([name, url]);
    storage.set("pages", sPages);
    location.reload();
  });


  // Clear function
  $("#clear").on("click", function(){
    storage.set("pages", []);
    location.reload();
  });


  // Edit function
  $("#edit").on("click", function(){

    // Prepare an array of nested arrays of sPages
    pagesToStr = [];
    // Add a nested array
    for(var nested in sPages){
      pagesToStr.push("[\"" + sPages[nested][0] + "\", \"" + sPages[nested][1] + "\"]");
    }
    // Convert array to string with brackets
    pagesToStr = "[" + pagesToStr.join(", ") + "]";
    // Prompt the user to edit the current setup and use the current setup as the default prompt value
    var newPages = prompt("New array:", pagesToStr);
    // Check if the new array is safe to use
    try {
      // Convert the string to an array
      newPages = JSON.parse(newPages);
      allowed = true;
      for(var nested in newPages){
        // Check if all nested arrays contain two strings
        if(typeof newPages[nested][0] !== "string" && typeof newPages[nested][1] !== "string" && newPages[nested].length != 2){
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
