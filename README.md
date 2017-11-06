# gas_util
GoogleAppsScriptの便利なユーティリティ

# 便利なimport
rawのURLから直接インポートするスクリプト
evalを使うので気をつけて
```javascript
function importSource(url, mainFunctionName) {
  eval(UrlFetchApp.fetch(url).getContentText("UTF-8"));
  return eval(mainFunctionName);
}
```
# 簡単な使い方
上記import用メソッドを書いて
```javascript
var gas_util = importSource('https://raw.githubusercontent.com/naosim/gas_util/master/build/gas_util.js', 'gas_util');
```
