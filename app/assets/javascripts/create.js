$(function(){

  function appendMessage(message){
    var image = (message.image) ? `<img src=${message.image}></img>` : "";
    
    var html = `<div class="chat__main__name">
                  ${message.user_name}
                </div>
                <div class="chat__main__day">
                  ${message.date}
                </div>
                <div class="chat__main__text" data-message-id="${message.id}">
                  ${message.body}
                </div>
                <div class="chat__main__image">
                  ${image}
                </div>`
                
    return html;
  }

  function appendLastMessage(message){
    var body = (message.body) ? message.body : `写真が投稿されています`;
    var last_message_html = `<p class="side__groups__group__last-message" data-group-id="${message.group_id}">
                ${body}
                </p>`
    
    return last_message_html;
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
      var last_message_html = appendLastMessage(message);
      $(`p[data-group-id=${message.group_id}]`).remove();
      $(`a[data-id=${message.group_id}]`).append(last_message_html);

    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
      $("input[type='submit']").attr("disabled", false);
    })
  })

  var reloadMessages = function(){  
    var last_message_id = $(".chat__main__text:last").attr("data-message-id");
    if (jqxhr){
      return;
    }

    jqxhr = $.ajax({
      url: "api/messages",
      type: "GET",
      data: { id: last_message_id },
      datatype: "json"
    })
    .done(function(messages){
      messages.forEach(function(message) {
        var html = "";
        html = appendMessage(message);
        $(".chat__main").append(html);
        var last_message_html = "";
        last_message_html = appendLastMessage(message);
        $(`p[data-group-id=${message.group_id}]`).remove();
        $(`a[data-id=${message.group_id}]`).append(last_message_html);
        $(".chat__main").animate({scrollTop: $(".chat__main")[0].scrollHeight}, 'slow');
      });
    })
    .fail(function(){
      alert("error")
    })
  }

  var jqxhr;setInterval(reloadMessages, 5000);
});

