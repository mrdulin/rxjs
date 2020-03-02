/**
 * Created by dulin on 17/1/3.
 */
var Rx = require('rx');

var subject = new Rx.Subject();
console.log(subject + '\n');

var source = Rx.Observable.interval(300)
  .map(v => 'Internal message #' + v)
  .take(5);

source.subscribe(subject);

subject.subscribe(
  function onNext(x) {
    console.log('onNext: ' + x);
  },
  function onError(err) {
    console.error('onError: ' + err);
  },
  function onCompleted() {
    console.log('onCompleted');
  }
);

subject.onNext('Our message #1');
subject.onNext('Our message #2');

setTimeout(function() {
  subject.onCompleted();
}, 1000);
