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

function createDateBuilder(dateOption) {
  var date = dateOption ? new Date(dateOption.getTime()) : new Date();
  var result = {
    year: function(v) {
      date.setYear(v);
      return createDateBuilder(date);
    },
    addYear: function(v) {
      return result.year(date.getFullYear() + v);
    },
    month: function(v) {// 0オリジン
      date.setMonth(v);
      return createDateBuilder(date);
    },
    addMonth: function(v) {
      return result.month(date.getMonth() + v);
    },
    date: function(v) {
      date.setDate(v);
      return createDateBuilder(date);
    },
    addDate: function(v) {
      return result.date(date.getDate() + v);
    },
    hours: function(v) {
      date.setHours(v);
      return createDateBuilder(date);
    },
    addHours: function(v) {
      return result.hours(date.getHours() + v);
    },
    minutes: function(v) {
      date.setMinutes(v);
      return createDateBuilder(date);
    },
    addMinutes: function(v) {
      return result.minutes(date.getMinutes() + v);
    },
    seconds: function(v) {
      date.setSeconds(v);
      return createDateBuilder(date);
    },
    addSeconds: function(v) {
      return result.seconds(date.getSeconds() + v);
    },
    milliseconds: function(v) {
      date.setMilliseconds(v);
      return createDateBuilder(date);
    },
    addMilliseconds: function(v) {
      return result.milliseconds(date.getMilliseconds() + v);
    },
    zeroTime: function() {
      return result.hours(0).minutes(0).seconds(0).milliseconds(0);
    },
    lastOfMonth: function() {
      return result.addMonth(1).date(1).zeroTime().addMilliseconds(-1);
    },
    build: function() {
      return date;
    }
  };
  return result;
}

gas_util.formatDate = formatDate;
gas_util.createDate = createDate;
gas_util.zerofil2 = zerofil2;
gas_util.createDateBuilder = createDateBuilder;
