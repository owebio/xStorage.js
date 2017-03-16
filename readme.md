# xStorage.js

[xStorage.js online](https://github.com/owebio/xStorage.js)

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
### Modifying Bookmark
``` javascript
var bookmarkStorage = xStorage.local.bookmark;
bookmarkStorage(2, {name:'yahoo', url:'https://www.yahoo.com'});
bookmarkStorage.remove(1);
var firstBookmark = bookmarkStorage(0);
```
### USER INFO
``` javascript
var UI = xStorage.create("UI",{});
UI('language', 'en');
UI('phone', '010-3452-1392');
UI('country', 'ko');
UI('phone', ''); // delete phone
UI('country'); // return 'ko';
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

### Short code without using type
``` javascript
var storage = function(name, value) {
  if (value) return localStorage.setItem(name, value) && this;
  else if (name === '') return localStorage.removeItem(name);
  else if (name) return localStorage.getItem(name);
}
```
### Extras

* be aware that other's code can use web storage too. So if you want to handle web storage for javascript types, you might need to hand it separately. It's one reason to write this code.  
