$(function(){

  function appendUserResult(data){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${data.user_name}</p>
                  <a id="user${data.user_id}" class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${data.user_id}" data-user-name="${data.user_name}">追加</a>
                </div>`
    $("#user-search-result").append(html);
  }

  function appendUserGroup(data){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${data.user_id}">
                  <input name="group[user_ids][]" type="hidden" value="${data.user_id}">
                  <p class="chat-group-user__name">${data.user_name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${data.user_id}" data-user-name="${data.user_name}">削除</a>
                </div>`
    $(".chat-group-users.js-add-user").append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $("#user-search-result").empty();
    if (input !== ""){
      $.ajax({
        url: "/users",
        type: "GET",
        data: { keyword: input },
        dataType: "json"
      })
      .done(function(users){
        if (users.length !== 0){
          users.forEach(function(user){
            var data = { user_id: user.id, user_name: user.name };
            appendUserResult(data);
            })
        }
      })
      .fail(function(){
        alert("ユーザーの検索に失敗しました")
      })
    }
  })

  $("#user-search-result").on("click", ".user-search-add", function(){
    var data = { user_id: $(this).attr("data-user-id"), user_name: $(this).attr("data-user-name") };
    $(this).parent().remove();
    appendUserGroup(data)
  })

  $(".js-add-user").on("click", ".js-remove-btn", function(){
    var data = { user_id: $(this).attr("data-user-id"), user_name: $(this).attr("data-user-name") };
    $(this).parent().remove();
    appendUserResult(data)
  })
})