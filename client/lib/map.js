import * as session from '/client/lib/session';

var load = function(options){
  maps = [];
  pins = [];
  return GoogleMaps.load(options);
};

var loaded = function(){
  return GoogleMaps.loaded();
};

var build = function(lat,lng,zoom){
  formateOptions(lat,lng,zoom);
  return options;
};

var pins;

var maps;

var options;

var formateOptions = function(lat,lng,zoom) {
  options = {
    center: new google.maps.LatLng(lat, lng),
    zoom: zoom
  };
};

var getOptions = function(){
  return options;
};

var ready = function(mapKey, action){
  GoogleMaps.ready(mapKey, action);
};

var addPin = function(mapKey, lat , lng , idref , title){
  exist = false;

  pins.forEach(function(pin){
    if(pin._id == idref) exist = true;
  });
  if(!exist){
    var label = title.charAt(0);
    var currentMap = getMap(mapKey);
    var pin = new google.maps.Marker({
      position: new google.maps.LatLng(lat,lng),
      map: currentMap.instance,
      _id: idref,
      label: label,
      title: title
    });
     //pins[idref] = pin;
    pins.push(pin);
    return pin;
  }else{
    updatePin(mapKey, lat, lng, idref, title);
  }
};

var addMapClickListener = function(pinArgs){
  var currentMap = getMap(pinArgs.mapKey);
  google.maps.event.addListener(currentMap.instance, 'click', function(event){
    session.set('latLng', {lat: event.latLng.lat(), lng: event.latLng.lng()});
    addPin(pinArgs.mapKey, event.latLng.lat(), event.latLng.lng(), pinArgs._id, pinArgs.title);
  });
};

var addPinClickListener = function(id, listener) {
  var choosenPin;
  pins.forEach(function(pin){
    if(pin._id==id) choosenPin=pin;
  });
  if(choosenPin){
    choosenPin.addListener('click', listener);
  }
};

var setMap = function(key, map){
  maps.push({key: key, map: map});
};

var deletePin = function(id){
  pins.forEach(function(pin){
    if(pin._id==id){
      pin.setMap(null);
      // Remove the reference to this pin instance
      var index = pins.indexOf(pin);
      if(index!==-1){
        pins.splice(index, 1);
      }
    }
  });
};

var updatePin = function(mapKey, lat , lng , idref , title){
  var label = title.charAt(0);
  var currentMap = getMap(mapKey);
  pins.forEach(function(pin){
    if(pin._id==idref){
      pin.setMap(currentMap.instance);
      pin.setPosition(new google.maps.LatLng(lat,lng));
      pin.setTitle(title);
      pin.setLabel(label);
    }
  });
};

var updateSettingPin = function(idref, key, value){
  var pinToUpdate ; // = pins[idref];
  // console.log(idref);
  // console.log(pins);

  pins.forEach(function(pin){
    if(pin._id==idref){
      pinToUpdate = pin
      // break;
    }
  });

  if (key == 'map')   pinToUpdate.setMap(value);
  if (key == 'loc')   pinToUpdate.setPosition(new google.maps.LatLng(value[0],value[1]));
  if (key == 'title') pin.setTitle(title);
  if (key == 'label') pin.setLabel(label);
    console.log(pins);
};


var getMap = function(mapKey){
  var currentMap;
  maps.forEach(function(map){
    if(map.key==mapKey){
      currentMap = map.map;
    }
  });
  return currentMap;
};

var getPinProperties = function(pinId){
  var pinProperties = {};
  if(pins){
    pins.forEach(function(pin){
      if(pin._id == pinId){
        pinProperties = {
          lat: pin.getPosition().lat(),
          lng: pin.getPosition().lng(),
          idref: pin._id,
          title: pin.title
        };
      }
    });
    if(pinProperties) return pinProperties;
  }
  return null;
};

module.exports = {
  load: load,
  loaded: loaded,
  build: build,
  getOptions: getOptions,
  ready: ready,
  addPin: addPin,
  addMapClickListener: addMapClickListener,
  addPinClickListener: addPinClickListener,
  setMap: setMap,
  deletePin: deletePin,
  updatePin: updatePin,
  updateSettingPin: updateSettingPin,
  getPinProperties: getPinProperties
};
