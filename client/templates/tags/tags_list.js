import * as session from '/client/lib/session';

Template.tagsList.helpers({
  tags: function(){
    if(session.get(searchText)){
      var searchedText = session.get(searchText)
      if(searchedText&&searchedText != ''){
        return Tags.find({name: {$regex : ".*"+searchedText+".*"}});
      }
    }
  }
});

Template.tagsList.events({
  'keyup #searchInput': function (evt, template) {
    var searchedText = template.find("#searchInput").value.toLowerCase();
    searchedText = searchedText.replace(' ','');
    console.log(searchedText);
    session.set(searchText, searchedText);
  }
});

var searchText = 'searchText';
