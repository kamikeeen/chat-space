$(function(){

  function appendMessage(message){
    var image = (message.image) ? `<img src=${message.image}></img>` : "";
    
    var html = `<div class="chat__main__name">
                  ${message.user_name}
                </div>
                <div class="chat__main__day">
                  ${message.date}
                </div>
                <div class="chat__main__text">
                  ${message.body}
                </div>
                <div class="chat__main__image">
                  ${image}
                </div>`
                
    return html;
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var url = $("#new_message").attr(".action");
    var formData = new FormData(this);

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = appendMessage(message);
      $(".chat__main").append(html);
      $(".chat__main").animate({scrollTop: $(".chat__main")[0].scrollHeight}, 'slow');
      $("input[type='submit']").attr("disabled", false);
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert("oh my god");
      $("input[type='submit']").attr("disabled", false);
    })
  })
});