import * as mapCtrl from '/client/lib/map';
import * as session from '/client/lib/session';

var mapKey;

var markers;

var markersArgs;

Template.mapItem.onRendered(function () {
  markerArgs = {
    _id: "clickableMarker",
    title: "clickableMarker",
    mapKey: mapKey
  }
  if(mapKey=='visualMap') markers = Markers.find();

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
  //initMarkers();
  mapCtrl.ready(mapKey, finishInitMap);
};

var finishInitMap = function(map) {
  // Add a marker to the map once it's ready
  mapCtrl.setMap(mapKey, map);
  if(mapKey=='clickableMap')  mapCtrl.addMapClickListener(markerArgs);
  if(mapKey=='visualMap')     loadExistingMarkers(markers);
};

var loadExistingMarkers = function(markers){
  markers.forEach(function(marker){
    pushMarkerOnMap(marker);
  });
};

var pushMarkerOnMap = function(markerProperties){
  var label = markerProperties.name.charAt(0);
  var lat = markerProperties.lat;
  var lng = markerProperties.lng;
  var idref = markerProperties._id;
  var title = markerProperties.name;

  var marker = mapCtrl.addMarker(mapKey, lat , lng , idref , title);

  var listener = function() {
    session.set(personne._id, 'orange');
  }

  //mapCtrl.addClickListener(personne._id, listener);
};

var deleteMarkerOnMap = function(oldMarker){
  mapCtrl.deleteMarker(oldMarker._id);
};

var markerChanged = function(id, fieldsChanged){
  if(fieldsChanged.loc) {
    mapCtrl.updateSettingMarker(id,'loc',fieldsChanged.loc);
  }
  if(fieldsChanged.name) {
    mapCtrl.updateSettingMarker(id,'title',fieldsChanged.name);
  }
};
