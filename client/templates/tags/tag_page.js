Template.tagPage.helpers({
  name: function(){
    return '#'+Tags.findOne().name;
  },
  privateStyle: function(){
    if(Tags.findOne().private) return "color: #711;";
    return "";
  }
});
