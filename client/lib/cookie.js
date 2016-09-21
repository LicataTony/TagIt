var get = function (key) {
  return Cookie.get(key);
};

var set = function(key, data){
  Cookie.set(key, data);
};

var set = function(key, data, options){
  Cookie.set(key, data, options);
};

var clear = function(key){
  Cookie.remove(key);
};

var clear = function(key, options){
  Cookie.remove(key, options);
};

module.exports = {
  get: get,
  set: set,
  clear: clear
};
