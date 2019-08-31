$(function(){

  function appendUser(user){
    val html = {
      
    }
  }

  $("#group_name").on("keyup", function(){
    var input = $("#group_name").val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users){
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        }
      }

    })
  })
})