json.user_name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d (%a) %H:%M:%S")
json.body @message.body
json.image @message.image.url
json.id @message.id
