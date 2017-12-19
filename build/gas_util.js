function SheetTable(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = sheet
    .getDataRange()
    .getValues()[0];
  var headersIndexMap = headers.reduce(function(memo, key, i){
      memo[key] = i;
      return memo;
    }, {});
  
  var compare = function(a, b, args, i) {
    i = i || 0;
    var key = args[i];
    if(a[key] < b[key]) {
      return -1;
    }
    if(a[key] > b[key]) {
      return 1;
    }
    if(i < args.length) {
      return compare(a, b, args, i + 1);
    }
    return 0;
  }
  
  var findAll = function(/* sortKeys */) {
    var records = sheet
      .getDataRange()
      .getValues()
      .slice(1)
      .map(function(values){
        return values.reduce(function(memo, v, i){
          memo[headers[i]] = v;
          return memo;
        },{});
      });
    
    if(arguments.length == 0) {
      return records;
    }
    
    var args = arguments;
    records.sort(function(a, b){
      return compare(a, b, args);
    })
    
    return records;
  };
  
  var insert = function(obj) {
    var values = headers.map(function(){ return null; });
    Object.keys(obj).forEach(function(key){
      var i = headersIndexMap[key];
      if(i === undefined) {
        throw new Error('column not found: ' + key);
      }
      values[i] = obj[key];
    });
    sheet.appendRow(values);
  };
  
  var remove = function(returnTrueIfDelete) {
    var list = findAll().reverse();
    list.forEach(function(v, i){
      if(returnTrueIfDelete(v)) {
        var row = (list.length - i - 1) + 2;
        Logger.log(row);
        sheet.deleteRow(row);
      }
    });
  }
  
  var update = function(filter, getter) {
    findAll().map(function(v, i){
      if(!filter(v)) {
        return null;
      }
      return [v, i];
    })
    .filter(function(v) { return v })
    .forEach(function(v) {
      var row = v[1] + 2;
      var value = getter(v[0]);
      Object.keys(value).forEach(function(k){
        var column = headersIndexMap[k] + 1;
        sheet.getRange(row, column).setValue(value[k]);
      });
      
    })
  }
  
  // export
  return {
    findAll: findAll,
    insert: insert,
    remove: remove,
    update: update
  }
}
