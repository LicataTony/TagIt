import * as mapCtrl from '/client/lib/map';
import * as session from '/client/lib/session';
import * as cookie from '/client/lib/cookie';

var markerId = "clickableMarker";

var markerErrorKey = "markerError";

var notHidden = "notHidden";

var submitMarkerSuccess = "submitMarkerSuccess";

var submitMarkerError = "submitMarkerError";

var currentUploadedFileId = "currentUploadedFileId";

Template.markerAdd.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
        // Trigger geocoding request.
        $("#lieu").geocomplete({
          details: ".geoloc" ,
          detailsAttribute: "data-geo"
        });
    }
  });
  fillPreferences();
});

Template.markerAdd.helpers({
  errorMessage: function(field){
    return printErrorMessage(field);
  },
  notHidden: function(){
    return session.get(notHidden);
  },
  color: function(){
    if(session.get(submitMarkerSuccess))  return 'background: #6D6; color: #111; font-weight: bold;';
    if(session.get(submitMarkerError))    return 'background: #D66; color: #111; font-weight: bold;';
  },
  text: function(){
    if(session.get(submitMarkerSuccess))  return 'Votre évenement a bien été enregistré!';
    if(session.get(submitMarkerError))    return "Un ou plusieurs des tags que vous avez mentionné n'existe pas ou ne sont pas approuvés par l'administrateur!";
  },
  coorGps: function(){
    var latLng = session.get('latLng');
    if(latLng) return 'Latitude: '+latLng.lat+' Longitude: '+latLng.lng;
    return null;
  },
  tagParam: function(){
    var tagParam = Router.current().params.tag;
    return tagParam == undefined ? "" : tagParam;
  },
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  currentUploadedFileId: function(){
    return session.get(currentUploadedFileId);
  },
  currentImage: function(){
    return Images.findOne(session.get(currentUploadedFileId));
  }
});

Template.markerAdd.onCreated(function(){
  session.clear(markerErrorKey);
  session.clear(notHidden);
  session.clear(submitMarkerSuccess);
  session.clear(submitMarkerError);
  session.clear('latLng');
  session.set('mapKey', 'clickableMap');
  this.currentUpload = new ReactiveVar(false);
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
  'submit form': function(e,t) {
    $("#lieu").trigger("geocode");
    e.preventDefault();

    var data = getData(e);
    var markerError = {};

    var ok = controlData(data, markerError);
    if(ok){
      markerAdd(data);
    }else{
      displayErrorMessage(markerError);
    }
  },
  'click .reset-image': function(){
    session.clear(currentUploadedFileId);
  },
  'change #fileInput': function (e, template) {
    //TODO lib image
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({            // lib
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          session.set(currentUploadedFileId, fileObj._id);
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});

var setPreferences = function(data){
  cookie.set('tagsArray', data.tagsArray);
  cookie.set('name', data.name);
  cookie.set('url', data.url);
  cookie.set('description', data.description);
  cookie.set('imageId', data.imageId);
};

var fillPreferences = function(){
  var prefTags = Router.current().params.tag == undefined ? "" : Router.current().params.tag+' ';
  var tagsArray = cookie.get('tagsArray').replace(/,/g,' ');
  if(tagsArray){
    tagsArray.split(" ").forEach(function(tagName){
      var exist = false;
      prefTags.split(" ").forEach(function(existingTag){
        if(existingTag == tagName) exist = true;
      })
      if(!exist) prefTags += tagName.replace(/,/g,'')+' ';
    });
  }
  $('#tagsName').val(prefTags);
  $('#name').val(cookie.get('name'));
  $('#url').val(cookie.get('url'));
  $('#description').val(cookie.get('description'));
  session.set(currentUploadedFileId, cookie.get('imageId'));
  /*
  $(e.target).find('[id=tagsName]').val(prefTags);
  $(e.target).find('[id=name]').val(cookie.get('name'));
  $(e.target).find('[id=url]').val(cookie.get('url'));
  $(e.target).find('[id=description]').val(cookie.get('description'));
  */
}

var getData = function(e,t){
    //getPos
  var lat = parseFloat($(e.target).find('[data-geo=lat]').val());
  var lng = parseFloat($(e.target).find('[data-geo=lng]').val());
  if(isNaN(lat)) lat='';
  if(isNaN(lng)) lng='';

    //getLocation
  var location = $(e.target).find('[data-geo=formatted_address]').val();

    //getTags
  var tags = $(e.target).find('[id=tagsName]').val().toLowerCase();
  tagsArray = tags.split(" ");
  var tagsArrayWithoutVoid = [];
  tagsArray.forEach(function(tag){
    if(tag != '') tagsArrayWithoutVoid.push(tag);
  });
  tagsArray = tagsArrayWithoutVoid;

    //getDate
  var date = getDate(e);
  var beginHour = $(e.target).find('[id=beginHour]').val();
  var endHour = $(e.target).find('[id=endHour]').val();

    //getName
  var name = $(e.target).find('[id=name]').val();

    //getUrl
  var url = $(e.target).find('[id=url]').val();

    //getDescription
  var description = $(e.target).find('[id=description]').val();

  //TODO lib image
    //getImage
  var imageId = '';
  if(session.get(currentUploadedFileId)) imageId = session.get(currentUploadedFileId);

  return {tagsArray: tagsArray, date: date, beginHour: beginHour, endHour: endHour, lat: lat, lng: lng, location: location, name: name, url: url, description: description, imageId: imageId};
};


var getDate = function(e){
  var year = parseInt($(e.target).find('[id=year]').val());
  var month = parseInt($(e.target).find('[id=month]').val())-1; //-1 because months start to 0
  var day = parseInt($(e.target).find('[id=day]').val());
  return new Date(year, month, day);
}

var controlData = function(data, markerError){
  if(data.tagsArray.length == 0)                                        markerError.tags = 'Veuillez entrer au moins un tag!';
  if(data.date == null || data.beginHour == '' || data.endHour == '')   markerError.date = 'Veuillez entrer une date valide!';
  if(data.lat == '' || data.lng == '' || data.location == '')           markerError.mapPos = 'veuillez entrer un lieu!';
  if(data.name == '')                                                   markerError.name = 'veuillez entrer un nom!';
  return Object.getOwnPropertyNames(markerError).length === 0;
};

var markerAdd = function(data){
  Meteor.call('markerAdd', {tagsArray: data.tagsArray, date: data.date, beginHour: data.beginHour, endHour: data.endHour, lat: data.lat, lng: data.lng, location: data.location, name: data.name, url: data.url, description: data.description, imageId: data.imageId}, function(e,r){
    session.set(notHidden, true);
    if(typeof e == 'undefined'){
      session.clear(markerErrorKey);
      session.set(submitMarkerError, false);
      session.set(submitMarkerSuccess, true);
      setPreferences(data);
    }else{
      console.log(e);
      session.set(submitMarkerSuccess, false);
      session.set(submitMarkerError, true);
    }
  });
};

var displayErrorMessage = function(markerError){
  session.set(markerErrorKey, markerError);
};
