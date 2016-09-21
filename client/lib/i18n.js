import * as session from '/client/lib/session';

var startUp = function(sessionKey){
  session.set("showLoadingIndicator", true);

  TAPi18n.setLanguage(session.get(sessionKey))
    .done(function () {
      session.set("showLoadingIndicator", false);
    })
    .fail(function (error_message) {
      // Handle the situation
      console.log(error_message);
    });
}
module.exports = {
  startUp: startUp
}
