// Simple xStorage.js
// 2017-03-17


(function(){
var _prefix = "xs_";
var xStorage = function(name, value, type) {
  var name =  (name.indexOf(_prefix) == 0) ? name : _prefix + name;
  var type = type || 'local';
  if (value) return xStorage.save(name, value, type);
  else if (name === '') return xStorage.remove(name, type);
  else if (name) return xStorage.load(name, type);
};
xStorage.save = function(name, value, type) {
  var type = type || "local";
  var name =  (name.indexOf(_prefix) == 0) ? name : _prefix + name;
  window[type + 'Storage'].setItem(name, JSON.stringify(value));
  return this;
};
xStorage.load = function(name, type) {
  var type = type || 'local';
  var name =  (name.indexOf(_prefix) == 0) ? name : _prefix + name;
  return JSON.parse(window[type + 'Storage'][name]);
};
xStorage.local   = {};
xStorage.session = {};
xStorage.remove = function(name, type) {
  var name =  (name.indexOf(_prefix) == 0) ? name : _prefix + name;
  var type = type || 'local';
  window[type + 'Storage'].removeItem(name);
  return this;
};
xStorage.clear = function(type) {
  var type = type || 'local';
  Object.keys(window[type + 'Storage']).forEach(function(e, i, a) {
    if (e.indexOf(_prefix) == 0) {
      window[type + 'Storage'].removeItem(e);
    }
  });
  return this;
};
xStorage.open   = function(name, type, data) {
  if (typeof type == "object") {
    var data = type;
    var type = 'local';
  } else {
    var type = type || 'local';
    var data = data || [];
  }
  if (xStorage[type][_prefix + 'name']) return initStorage(name, type);
  else return xStorage.create(name, data, type);
};
xStorage.create = function(name, init, type) {
  var type = type || 'local';
  var result = initStorage(name, type, init);
  if (Object.keys(init).length) result.save();
  return result;
};
var initStorage = function(key, type, init) {
  var name = key.replace(_prefix, '');
  var _StorageItem = xStorage[type][name] = function(key, value) {
    if (value === '') return _StorageItem.remove(key);
    if (value) {
      if (Array.isArray(_StorageItem.data)) _StorageItem.data.splice(key, 1, value);
      else _StorageItem.data[key] = value;
      _StorageItem.save();
      return _StorageItem;
    }
    if (Array.isArray(key) && Array.isArray(_StorageItem.data)) return _StorageItem.add(key);
    return  _StorageItem.data[key];
  }
  _StorageItem.data = init || xStorage.load(name, type);
  _StorageItem.valueOf = function(){return _StorageItem.data.valueOf()};
  _StorageItem.toString = function(){return _StorageItem.data.toString()};
  _StorageItem.title = name;
  _StorageItem.type = type;
  _StorageItem.add   = function(value){
    if (Array.isArray(_StorageItem.data)) {
      _StorageItem.data.push(value);
      _StorageItem.save();
    };
    return _StorageItem;
  };
  _StorageItem.destroy  = function() {
    xStorage.remove(_StorageItem.title, _StorageItem.type);
    delete xStorage[_StorageItem.type][_StorageItem.title];
  };
  _StorageItem.save  = function() {
    xStorage.save(_StorageItem.title, _StorageItem.data,  _StorageItem.type);
    return _StorageItem;
  }
  _StorageItem.remove= function(key){
    if (Array.isArray(_StorageItem.data)) _StorageItem.data.splice(key, 1);
    else delete _StorageItem.data[key];
    _StorageItem.save();
    return _StorageItem;
  };
  return _StorageItem;
}
Object.keys(localStorage).forEach(function(e) {
  if (e.indexOf(_prefix) == 0) initStorage(e, 'local');
});
Object.keys(sessionStorage).forEach(function(e) {
  if (e.indexOf(_prefix) == 0) initStorage(e, 'session');
});
window.xStorage = xStorage;
})();
