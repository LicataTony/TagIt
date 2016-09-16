import * as session from '/client/lib/session';

var tagErrorKey = 'tagError';

Template.tagSubmit.onCreated(function(){
  session.clear(tagErrorKey);
});

Template.tagSubmit.helpers({
  errorMessage: function(field){
    return printErrorMessage(field);
  }
});

var printErrorMessage = function(field){
  var tagError = session.get(tagErrorKey);
  if(tagError!=null){
    if(tagError[field]!=null){
      return tagError[field];
    }
  }
}

Template.tagSubmit.events({
  'submit form': function(e,t) {
    e.preventDefault();

    var data = getData(e,t);
    var tagError = {};

    var ok = controlData(data, tagError);
    if(ok){
      tagAdd(data);
    }else{
      displayErrorMessage(tagError);
    }
  }
});

var getData = function(e,t){
  var tagName = $(e.target).find('[id=tagName]').val().toLowerCase();
  tagName = tagName.replace(' ','');
  var isPrivate = $(e.target).find('[id=private]').is(':checked');
  return {tagName: tagName, private: isPrivate};
}

var controlData = function(data, tagError){
  if(data.tagName == '')    tagError.tagName = 'Veuillez entrer un nom!';
  return Object.getOwnPropertyNames(tagError).length === 0;
}

var tagAdd = function(data){
  Meteor.call('tagAdd', {tagName: data.tagName, private: data.private}, function(e){
    if(typeof e !== undefined){
      session.clear(tagErrorKey);
      Router.go('/');
    }else{
      console.log(e);
    }
  });
}

var displayErrorMessage = function(tagError){
  session.set(tagErrorKey, tagError);
}
