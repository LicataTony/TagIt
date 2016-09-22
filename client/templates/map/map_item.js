import * as mapCtrl from '/client/lib/map';
import * as session from '/client/lib/session';

var mapKey;

var pins;

var pinsArgs;

Template.mapItem.onRendered(function () {
  pinArgs = {
    _id: "clickablePin",
    title: "clickablePin",
    mapKey: mapKey
  }
  if(mapKey=='visualMap') pins = Pins.find();

  initMap();
});

Template.mapItem.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (mapCtrl.loaded()) {
      // Map initialization options
      return mapCtrl.build(46.830,7.17,8);
    }
  },
  mapKey: function(){
    mapKey=session.get('mapKey');
    return mapKey;
  }
});

function initMap() {
  mapCtrl.load({key: 'AIzaSyA_94HLT95IdrUPGeHJH5tzOMggVUQ-MfQ'});
  //initPins();
  mapCtrl.ready(mapKey, finishInitMap);
};

var finishInitMap = function(map) {
  // Add a pin to the map once it's ready
  mapCtrl.setMap(mapKey, map);
  if(mapKey=='clickableMap')  mapCtrl.addMapClickListener(pinArgs);
  if(mapKey=='visualMap')     loadExistingPins(pins);
};

var loadExistingPins = function(pins){
  pins.forEach(function(pin){
    pushPinOnMap(pin);
  });
};

var pushPinOnMap = function(pinProperties){
  var label = pinProperties.name.charAt(0);
  var lat = pinProperties.lat;
  var lng = pinProperties.lng;
  var idref = pinProperties._id;
  var title = pinProperties.name;

  var pin = mapCtrl.addPin(mapKey, lat , lng , idref , title);

  var listener = function() {
    session.set(personne._id, 'orange');
  }

  //mapCtrl.addClickListener(personne._id, listener);
};

var deletePinOnMap = function(oldPin){
  mapCtrl.deletePin(oldPin._id);
};

var pinChanged = function(id, fieldsChanged){
  if(fieldsChanged.loc) {
    mapCtrl.updateSettingPin(id,'loc',fieldsChanged.loc);
  }
  if(fieldsChanged.name) {
    mapCtrl.updateSettingPin(id,'title',fieldsChanged.name);
  }
};
