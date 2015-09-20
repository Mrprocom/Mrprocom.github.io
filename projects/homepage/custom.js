$(document).ready(function(){



  storage = $.localStorage

  if(storage.isEmpty()){
    storage.set("pages", [["Google", "https://google.com"], ["YouTube", "https://youtube.com"], ["Powder Toy", "http://powdertoy.co.uk"]]);
  }

  for (var page in storage.get("pages")){
    newColumn =
      "<tr><td>" + page.toString() + "</td><td><a href='" + storage.get("pages")[page][1] + "'>" + storage.get("pages")[page][0] + "</a></td><td><a href='#' class='btn btn-danger btn-xs remove-page' name='" + page.toString() + "'>Remove</a></td></tr>";
    $("#page-container").append(newColumn);
  }



  $(document).on("click", ".remove-page", function(){
    pages = storage.get("pages");
    pages.splice($(this).attr("name"), 1);
    storage.set("pages", pages);
    location.reload();
  });



  $("#create").on("click", function(){
    name = prompt("Name:");
    url = prompt("URL:");
    pages = storage.get("pages");
    pages.push([name, url]);
    storage.set("pages", pages);
    location.reload();
  });

  $("#clear").on("click", function(){
    storage.set("pages", []);
    location.reload();
  });
  
});
