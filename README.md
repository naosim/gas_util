# gas_util
GoogleAppsScriptの便利なユーティリティ

# 便利なimport
rawのURLから直接インポートするスクリプト
evalを使うので気をつけて
```
function importSource(url, mainFunctionName) {
  eval(UrlFetchApp.fetch(url).getContentText("UTF-8"));
  return eval(mainFunctionName);
}
```
