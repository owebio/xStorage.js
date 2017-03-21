# xStorage.js

[xStorage.js online](https://owebio.github.io/xStorage.js/)

## Features
* Supporting data types in Web storage. : array, object, string, number
* Shorthand function. : create, update, remove in one function
* Stability with other codes to use same web storage. : prefix
* Practical uses for object and array type values

## Shorthand function

``` javascript
// 1. Save data
xStorage("address", {city: "seoul", country: "ko"});
// 2. Load data
var language = xStorage('language');
// 3. remove data
xStorage('currency', '');
```
## Practical cases

### Creating Bookmarkstorage
Don't need to load or to save again.
Added/updated/modified/created/destroyed/removed, it's saved automatically.
``` javascript
var bookmarkStorage = xStorage.create("bookmark",[]);
bookmarkStorage.add({name:'google', url:'https://www.google.com'});
bookmarkStorage.add({name:'msn', url:'http://www.msn.com'});
bookmarkStorage.add({name:'naver', url:'https://www.naver.com'});
var firstBookmark = bookmarkStorage(0);
var bookmarkData = bookmarkStorage.data;
```
### modifying Bookmark
``` javascript
var bookmarkStorage = xStorage.local.bookmark;
bookmarkStorage(2, {name:'yahoo', url:'https://www.yahoo.com'});
bookmarkStorage.remove(1);
var firstBookmark = bookmarkStorage(0);
```
### user info
``` javascript
var userinfo = xStorage.create("userinfo",{});
userinfo('language', 'en');
userinfo('phone', '010-3452-1392');
userinfo('country', 'ko');
userinfo('phone', ''); // delete phone
userinfo('country'); // return 'ko';
```

##  xStorage API : Global

* xStorage(name, value, type); // type : local | session
* xStorage.save(name, value, type); // = xStorage(name, value, type)
* xStorage.load(name, type); // = xStorage(name, type)
* xStorage.remove(name, type); // = xStorage(name, '')
* xStorage.clear(type); // clear storage, type : local | session
* xStorage.create(name, initValue, type); // initValue : [] | {}
* xStorage.local; // local Storage collection
* xStorage.session; // session Storage collection

## xStorage API : Inner function object

* _StorageItem(keyOrIndex, value); // type : local | session
* _StorageItem.data;
* _StorageItem.title;
* _StorageItem.type;  // local | session
* _StorageItem.add(); // only array type
* _StorageItem.remove(keyOrIndex);
* _StorageItem.destroy();
* _StorageItem.save();
* _StorageItem.valueOf(); // == _StorageItem._data.valueOf();
* _StorageItem.toString(); // == _StorageItem._data.toString();

## MISC

### Shorthand function without using types.
``` javascript
var storage = function(name, value) {
  if (value === '') return localStorage.removeItem(name);
  else if (value) return localStorage.setItem(name, value) && this;
  else if (name) return localStorage.getItem(name);
}
```
### Extras
#### UPDATES

* 2017-03-17
  * fix variable names.

#### IE8 pollyfill
If you want to use this on IE8, you need three pollyfills.

[JSON](https://github.com/douglascrockford/JSON-js), [Object.keys](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Polyfill), [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
