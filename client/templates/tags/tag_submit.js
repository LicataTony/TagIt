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
  var name = $(e.target).find('[id=name]').val().toLowerCase();
  name = name.replace(' ','');
  var isPrivate = $(e.target).find('[id=private]').is(':checked');
  return {name: name, private: isPrivate};
}

var controlData = function(data, tagError){
  if(data.name == '')    tagError.name = 'Veuillez entrer un nom!';
  return Object.getOwnPropertyNames(tagError).length === 0;
}

var tagAdd = function(data){
  Meteor.call('tagAdd', {name: data.name, private: data.private}, function(e){
    if(typeof e !== undefined){
      session.clear('personneError');
      Router.go('/');
    }else{
      console.log(e);
    }
  });
}

var displayErrorMessage = function(tagError){
  session.set(tagErrorKey, tagError);
}
