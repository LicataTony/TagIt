import * as mapCtrl from '/client/lib/map';
import * as session from '/client/lib/session';

var markerId = "clickableMarker";

var markerErrorKey = "markerError";

var notHidden = "notHidden";

var color = "color";

var text = "text";


Template.markerAdd.helpers({
  errorMessage: function(field){
    return printErrorMessage(field);
  },
  notHidden: function(){
    return session.get(notHidden);
  },
  color: function(){
    return session.get(color);
  },
  text: function(){
    return session.get(text);
  }
});

Template.markerAdd.onCreated(function(){
  session.clear(markerErrorKey);
  session.clear(notHidden);
  session.clear(color);
  session.clear(text);
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
    //getTag
  var tag = $(e.target).find('[id=tag]').val().toLowerCase();
  tag = tag.replace(' ','');
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
  return {name: name, tag: tag, x: x, y: y};
};

var controlData = function(data, markerError){
  if(data.name == '')               markerError.name = 'Veuillez entrer un nom!';
  if(data.tag == '')                markerError.tag = 'Veuillez entrer un tag!';
  if(data.x == '' || data.y == '')  markerError.mapPos = 'veuillez sélectionner un lieu!';
  return Object.getOwnPropertyNames(markerError).length === 0;
};

var markerAdd = function(data){
  Meteor.call('markerAdd', {name: data.name, tag: data.tag, x: data.x, y: data.y}, function(e,r){
    session.set(notHidden, true);
    if(typeof e == 'undefined'){
      session.clear(markerErrorKey);
      session.set(color, 'background: #6D6; color: #111; font-weight: bold;');
      session.set(text, 'Votre évenement a bien été enregistré!')
    }else{
      console.log(e);
      session.set(color, 'background: #D66; color: #111; font-weight: bold;')
      session.set(text, "Le tag que vous avez mentionné n'existe pas!")
    }
  });
};

var displayErrorMessage = function(markerError){
  session.set(markerErrorKey, markerError);
};
