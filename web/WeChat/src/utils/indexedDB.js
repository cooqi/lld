const windowDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
export const db = {
  version: 1, // important: only use whole numbers!
  objectStoreName: 'tasks',
  instance: {},
  upgrade: function (e) {
    var _db = e.target.result
    var names = _db.objectStoreNames
    var name = db.objectStoreName
    if (!names.contains(name)) {
      _db.createObjectStore(name, { keyPath: 'id', autoIncrement: true })
    }
  },
  errorHandler: function (error) {
    window.alert('error: ' + error.target.code)
  },
  open: function (callback) {
    var request = windowDB.open(db.objectStoreName, db.version)
    request.onerror = db.errorHandler
    request.onupgradeneeded = db.upgrade
    request.onsuccess = function (e) {
      db.instance = request.result
      db.instance.onerror = db.errorHandler
      callback()
    }
  },
  getObjectStore: function (mode) {
    var txn, store
    mode = mode || 'readonly'
    txn = db.instance.transaction([db.objectStoreName], mode)
    store = txn.objectStore(db.objectStoreName)
    return store
  },
  save: function (data, callback) {
    db.open(function () {
      var store = null
      var request = null
      var mode = 'readwrite'
      store = db.getObjectStore(mode)
      request = data.id ? store.put(data) : store.add(data)
      request.onsuccess = callback
    })
  },
  getAll: function (callback) {
    db.open(function () {
      var store = db.getObjectStore()
      var cursor = store.openCursor()
      var data = []
      cursor.onsuccess = function (e) {
        var result = e.target.result
        if (result && result !== null) {
          data.push(result.value)
          result.continue()
        } else {
          callback(data)
        }
      }
    })
  },
  get: function (id, callback) {
    id = parseInt(id)
    db.open(function () {
      var store = db.getObjectStore()
      var request = store.get(id)
      request.onsuccess = function (e) {
        callback(e.target.result)
      }
    })
  },
  delete: function (id, callback) {
    id = parseInt(id)
    db.open(function () {
      var mode = 'readwrite'
      var store
      var request
      store = db.getObjectStore(mode)
      request = store.delete(id)
      request.onsuccess = callback
    })
  },
  deleteAll: function (callback) {
    window.indexedDB.deleteDatabase(this.objectStoreName)
  }
}
