if(!gas_util) {
  var gas_util = {};
}
function getListFromSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  var range = sheet.getDataRange();
  var map = range.getValues();

  var header = map[0];
  var ary = [];
  for(var row = 1; row < map.length; row++) {
    var obj = {};
    for(var clm = 0; clm < map[0].length; clm++) {
      obj[header[clm].trim()] = map[row][clm];
    }
    ary.push(obj);
  }
  return ary;
}
function getMapFromSheet(sheetName, pkey) {
  return getListFromSheet(sheetName).reduce(function(memo, v) {
    memo[v[pkey]] = v;
    return memo;
  }, {});
}

gas_util.getListFromSheet = getListFromSheet;
gas_util.getMapFromSheet = getMapFromSheet;
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
if(!gas_util) {
  var gas_util = {};
}
function searchMail(searchText) {
  var numMail = 500;// 1度に取得するメール数
  return GmailApp.getMessagesForThreads(GmailApp.search(searchText, 0, numMail))
    .map(function(v){ return v[v.length - 1] })
    .map(function(v){
      return {
        date: v.getDate(),
        subject: v.getSubject(),
        body: v.getPlainBody()
      };
    });
}
gas_util.searchMail = searchMail;
