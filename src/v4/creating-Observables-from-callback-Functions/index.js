/**
 * Created by elsa on 2017/1/2.
 */
var Rx = require('rx');
var fs = require('fs');

var readdir = Rx.Observable.fromNodeCallback(fs.readdir);

var source = readdir('/Users/elsa');

var subscription = source.subscribe(
  function onNext(res) {
    console.log('List of directories: ' + res);
  },
  function onError(err) {
    console.log(err);
  },
  function onCompleted() {
    console.log('Done!');
  }
);
