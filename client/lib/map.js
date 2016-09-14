var load = function(options){
  maps = [];
  markers = [];
  return GoogleMaps.load(options);
};

var loaded = function(){
  return GoogleMaps.loaded();
};

var build = function(lat,lng,zoom){
  formateOptions(lat,lng,zoom);
  return options;
};

var markers;

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

var addMarker = function(mapKey, lat , lng , idref , title){
  exist = false;

  markers.forEach(function(marker){
    if(marker._id == idref) exist = true;
  });
  if(!exist){
    var label = title.charAt(0);
    var currentMap = getMap(mapKey);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat,lng),
      map: currentMap.instance,
      _id: idref,
      label: label,
      title: title
    });
     //markers[idref] = marker;
    markers.push(marker);
    return marker;
  }else{
    updateMarker(mapKey, lat, lng, idref, title);
  }
};

var addMapClickListener = function(markerArgs){
  var currentMap = getMap(markerArgs.mapKey);
  google.maps.event.addListener(currentMap.instance, 'click', function(event){
    addMarker(markerArgs.mapKey, event.latLng.lat(), event.latLng.lng(), markerArgs._id, markerArgs.title);
  });
};

var addMarkerClickListener = function(id, listener) {
  var choosenMarker;
  markers.forEach(function(marker){
    if(marker._id==id) choosenMarker=marker;
  });
  if(choosenMarker){
    choosenMarker.addListener('click', listener);
  }
};

var setMap = function(key, map){
  maps.push({key: key, map: map});
};

var deleteMarker = function(id){
  markers.forEach(function(marker){
    if(marker._id==id){
      marker.setMap(null);
      // Remove the reference to this marker instance
      var index = markers.indexOf(marker);
      if(index!==-1){
        markers.splice(index, 1);
      }
    }
  });
};

var updateMarker = function(mapKey, lat , lng , idref , title){
  var label = title.charAt(0);
  var currentMap = getMap(mapKey);
  markers.forEach(function(marker){
    if(marker._id==idref){
      marker.setMap(currentMap.instance);
      marker.setPosition(new google.maps.LatLng(lat,lng));
      marker.setTitle(title);
      marker.setLabel(label);
    }
  });
};

var updateSettingMarker = function(idref, key, value){
  var markerToUpdate ; // = markers[idref];
  // console.log(idref);
  // console.log(markers);

  markers.forEach(function(marker){
    if(marker._id==idref){
      markerToUpdate = marker
      // break;
    }
  });

  if (key == 'map')   markerToUpdate.setMap(value);
  if (key == 'loc')   markerToUpdate.setPosition(new google.maps.LatLng(value[0],value[1]));
  if (key == 'title') marker.setTitle(title);
  if (key == 'label') marker.setLabel(label);
    console.log(markers);
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

var getMarkerProperties = function(markerId){
  var markerProperties = {};
  markers.forEach(function(marker){
    if(marker._id == markerId){
      markerProperties = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
        idref: marker._id,
        title: marker.title
      };
    }
  });
  return markerProperties;
};

module.exports = {
  load: load,
  loaded: loaded,
  build: build,
  getOptions: getOptions,
  ready: ready,
  addMarker: addMarker,
  addMapClickListener: addMapClickListener,
  addMarkerClickListener: addMarkerClickListener,
  setMap: setMap,
  deleteMarker: deleteMarker,
  updateMarker: updateMarker,
  updateSettingMarker: updateSettingMarker,
  getMarkerProperties: getMarkerProperties
};
