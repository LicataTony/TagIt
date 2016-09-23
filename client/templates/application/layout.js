import * as session from '/client/lib/session';
import * as lang from '/client/lib/i18n';

var currentLanguage = 'currentLanguage';

Template.layout.events({
  'click .en-lang': function(){
    session.set(currentLanguage, 'en');
    console.log(session.get(currentLanguage));
  },
  'click .fr-lang': function(){
    session.set(currentLanguage, 'fr');
    console.log(session.get(currentLanguage));
  }
})

Template.layout.onRendered(function(){
  session.set(currentLanguage, 'fr');
  Meteor.startup(function () {
   lang.startUp(currentLanguage);
 });
})
