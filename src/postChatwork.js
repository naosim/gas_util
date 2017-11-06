if(!gas_util) {
  var gas_util = {};
}
function createChatworkClient(token) {
  var header = {'X-ChatWorkToken' : token };
  return {
    postMessage: function(roomId, message) {
      var url = "https://api.chatwork.com/v2/rooms/" + roomId + "/messages";
      var payload = {
        'body': message
      };
      var options = {
        'method': 'post',
        'headers': header,
        'payload': payload
      };
      UrlFetchApp.fetch(url, options);
    },
    addTask: function(roomId, message, toId) {
      var url = 'https://api.chatwork.com/v2/rooms/' + roomId + '/tasks';
      var payload = {
        'body': message,
        'to_ids': toId
      };
      var options = {
        'method': 'post',
        'headers': header,
        'payload': payload
      };
      UrlFetchApp.fetch(url, options);
    }
  }
}
gas_util.createChatworkClient = createChatworkClient;
