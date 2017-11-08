if(!gas_util) {
  var gas_util = {};
}
function formatDate(date) {
  return Utilities.formatDate(date, "JST", "yyyy-MM-dd HH:mm:ss");
}

function createDate(yyyymmdd, h) {
  yyyymmdd = yyyymmdd.trim().split('/').join('-');
  if(yyyymmdd.length == 8) {
    yyyymmdd = yyyymmdd.slice(0, 4) + '-' + yyyymmdd.slice(4, 6) + '-' + yyyymmdd.slice(6, 8);
  }
  return [yyyymmdd]
  .map(function(v) { return new Date(v); })
  .map(function(v) { return v.setHours(h ? parseInt(h) : 0); })
  .map(function(v) { return new Date(v); })[0];
}
function zerofil2(num) {
  return ('00' + num).slice(-2);
}

gas_util.formatDate = formatDate;
gas_util.createDate = createDate;
gas_util.zerofil2 = zerofil2;
