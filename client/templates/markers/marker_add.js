import * as mapCtrl from '/client/lib/map';
import * as session from '/client/lib/session';

var markerId = "clickableMarker";

var markerErrorKey = "markerError";

Template.markerAdd.helpers({
  errorMessage: function(field){
    return printErrorMessage(field);
  }
});

Template.markerAdd.onCreated(function(){
  session.clear(markerErrorKey);
});

var printErrorMessage = function(field){
  var markerError = session.get(markerErrorKey);
  if(markerError!=null){
    if(markerError[field]!=null){
      return markerError[field];
    }
  }
};

Template.markerAdd.events({
  'submit form': function(e) {
    e.preventDefault();

    var data = getData(e);
    var markerError = {};

    var ok = controlData(data, markerError);
    if(ok){
      markerAdd(data);
    }else{
      displayErrorMessage(markerError);
    }
  }
});

var getData = function(e,t){
    //getName
  var name = $(e.target).find('[id=name]').val().toLowerCase();
  name = name.replace(' ','');
    //getPrivateTag
  var privateTag = $(e.target).find('[id=privateTag]').val().toLowerCase();
  privateTag = privateTag.replace(' ','');
    //getPos
  var markerProperties = mapCtrl.getMarkerProperties(markerId);
  var x = markerProperties.lat;
  var y = markerProperties.lng;
  if(isNaN(x)){
    x='';
  }
  if(isNaN(y)){
    y='';
  }
  return {name: name, privateTag: privateTag, x: x, y: y};
};

var controlData = function(data, markerError){
  if(data.name == '')               markerError.name = 'Veuillez entrer un nom!';
  if(data.privateTag == '')         markerError.privateTag = 'Veuillez entrer un tag!';
  if(data.x == '' || data.y == '')  markerError.mapPos = 'veuillez sélectionner un lieu!';
  return Object.getOwnPropertyNames(markerError).length === 0;
};

var markerAdd = function(data){
  Meteor.call('markerAdd', {name: data.name, privateTag: data.privateTag, x: data.x, y: data.y}, function(e){
    if(typeof e !== undefined){
      session.clear(markerErrorKey);
      Router.go('/');
    }else{
      console.log(e);
    }
  });
};

var displayErrorMessage = function(markerError){
  session.set(markerErrorKey, markerError);
};
