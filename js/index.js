$(document).ready(function() {

  $("#randomButton").click(function(){

    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
  
 
    $("#searchButton").click(function(){setupAll()});
    $("#searchField").keyup(function(event){
      console.log('keycode: ' + event.keyCode);
      if (event.keyCode == 13)
          setupAll();
    });
 });

  


  var anchor = "<a target='_blank' href='https://en.wikipedia.org/wiki/";
 function formatHTML(title, snippet){
   
   var a = "<center>" + anchor + title + "'>"
              + "<strong>" + title + "</strong>"
            + "</a> </center>";
   var button = anchor + title + "' class='btn btn-primary'> More </a>";
   
   
   return "<div class='node-container'>"
              + a 
              + "<p>" + snippet + "</p>"
              + button
              + "</div>";
   
   
 }

 function setupAll(){
        
    var searchText = $("#searchField").val();
    
    if ( !searchText  )
      return;
    
    $("#mainThing").empty();
   
    $.ajax({
      
			dataType: 'jsonp',
			jsonp: 'callback',
      url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+searchText,
      success: function(json) {


      
        var title;
        var snippet;

        var searchNodes = json.query.search;

        $.each(searchNodes, function(i, value) {

          setTimeout(function(){

          title = value.title;
          snippet = value.snippet;

          title = title.replace(/'/, "&apos;");

        var formatedHTML = formatHTML(title, snippet);

        $("#mainThing").append(formatedHTML);
          }, i * 450 );
      
    }); // each
      
    }
    
    
      }); // json 
   // click
    
  } // setuaalll