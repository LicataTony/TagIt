import * as session from '/client/lib/session';

Template.tagPage.helpers({
  tagName: function(){
    return '#'+Tags.findOne().tagName;
  },
  privateStyle: function(){
    if(Tags.findOne().private) return "color: #711;";
    return "";
  }
});

Template.tagPage.onCreated(function(){
  session.set('mapKey', 'visualMap');
});
