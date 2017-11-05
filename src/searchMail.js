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
