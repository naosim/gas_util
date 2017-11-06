if(!gas_util) {
  gas_util = {};
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
