import * as session from '/client/lib/session';

var userErrorKey = 'userError';

var errorMessageKey = "errorMessage";

var submitUserSuccess = "submitUserSuccess";

var submitUserError = "submitUserError";

var notHidden = "notHidden";

Template.userSubscribe.onCreated(function(){
  session.clear(userErrorKey);
});

Template.userSubscribe.helpers({
  errorMessage: function(field){
    return printErrorMessage(field);
  },
  color: function(){
    if(session.get(submitUserSuccess))  return 'background: #6D6; color: #111; font-weight: bold;';
    if(session.get(submitUserError))    return 'background: #D66; color: #111; font-weight: bold;';
  },
  text: function(){
    if(session.get(submitUserSuccess))  return 'Votre compte a bien été enregistré!';
    if(session.get(submitUserError))    return session.get(errorMessageKey);
  },
  notHidden: function(){
    return session.get(notHidden);
  }
});

var printErrorMessage = function(field){
  var userError = session.get(userErrorKey);
  if(userError!=null){
    if(userError[field]!=null){
      return userError[field];
    }
  }
}

Template.userSubscribe.onCreated(function(){
  session.clear(userErrorKey);
  session.clear(errorMessageKey);
  session.clear(notHidden);
  session.clear(submitUserSuccess);
  session.clear(submitUserError);
});

Template.userSubscribe.events({
  'submit form': function(e,t) {
    e.preventDefault();

    var data = getData(e,t);
    var userError = {};

    var ok = controlData(data, userError);
    if(ok){
      userAdd(data);
    }else{
      displayErrorMessage(userError);
    }
  }
});

var getData = function(e,t){
  var email = $(e.target).find('[id=email]').val().toLowerCase();
  email = email.replace(/ /g,'');
  var privateTag = $(e.target).find('[id=privateTag]').val().toLowerCase();
  privateTag = privateTag.replace(/ /g,'');
  var password = $(e.target).find('[id=password]').val();
  var webSite = $(e.target).find('[id=webSite]').val().toLowerCase();
  var description = $(e.target).find('[id=description]').val();
  return {email: email, privateTag: privateTag, password: password, webSite: webSite, description: description};
}

var controlData = function(data, userError){
  var emailFilter = /(\S+@\S+\.\S+)/;
  var webSiteFilter = /(https?:\/\/\S+\.\S+)/;
  var confirmPassword = $('#confirmPassword').val();

  if(data.email.match(emailFilter) == null)           userError.email = "Votre email ne contient pas une structure cohérente!";
  if(data.email == '')                                userError.email = 'Veuillez entrer un email!';
  if(data.privateTag == '')                           userError.privateTag = 'Veuillez entrer un tag privé!';
  if(data.password == '')                             userError.password = 'Veuillez entrer un mot de passe!';
  if(confirmPassword == '')                           userError.confirmPassword = 'Veuillez entrer votre mot de passe à nouveau!';
  if(data.password != confirmPassword)                userError.confirmPassword = 'Votre mot de passe et votre confirmation ne sont pas identiques!';
  if(data.webSite.match(webSiteFilter) == null)       userError.webSite = 'Votre site web ne contient pas une structure cohérente!';
  if(data.webSite == '')                              userError.webSite = 'Veuillez entrer un site web!';
  if(data.description == '')                          userError.description = 'Veuillez entrer une description!';
  return Object.getOwnPropertyNames(userError).length === 0;
}

var userAdd = function(data){
  Meteor.call('userAdd', data, function(e){
    session.set(notHidden, true);
    if(typeof e == 'undefined'){
      session.clear(userErrorKey);
      session.clear(errorMessageKey);
      session.set(submitUserError, false);
      session.set(submitUserSuccess, true);
    }else{
      session.set(submitUserSuccess, false);
      session.set(submitUserError, true);
      session.set(errorMessageKey, e.message.replace(/(\[\S+\])/,''));
    }
  });
}

var displayErrorMessage = function(userError){
  session.set(userErrorKey, userError);
}
