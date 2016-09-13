var get = function (key) {
  return Session.get(key);
};

var set = function(key, data){
  Session.set(key, data);
};

var clear = function(key){
  Session.set(key, null);
};

module.exports = {
  get: get,
  set: set,
  clear: clear
};
