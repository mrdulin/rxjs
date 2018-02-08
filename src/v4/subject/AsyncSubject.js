/**
 * Created by dulin on 17/1/3.
 */
// var Rx = require('rx');
// var delayedRange = Rx.Observable.range(0, 5).delay(1000);
// var subject = new Rx.AsyncSubject();
//
// delayedRange.subscribe(subject);
//
// subject.subscribe(
//     function onNext(item) {
//         console.log('Value: ', item);
//     },
//     function onError(err) {
//         console.log('Error: ', err);
//     },
//     function onCompleted() {
//         console.log('onCompleted');
//     }
// )

function getBooks(url) {
  var subject;
  return Rx.Observable.create(function(observer) {
    if (!subject) {
      subject = new Rx.AsyncSubject();
      Rx.DOM.get(url).subscribe(subject);
    }
    return subject.subscribe(observer);
  });
}

var booksObservable = getBooks('http://it-ebooks-api.info/v1/search/react');

booksObservable.subscribe(
  function onNext(result) {
    console.log('Result 1: ', result.response);
  },
  function onError(error) {
    console.error('Error: ', error);
  }
);

setTimeout(function() {
  booksObservable.subscribe(
    function onNext(result) {
      console.log('Result 2:', result.response);
    },
    function onError() {
      console.lerror('Error', error);
    }
  );
}, 5000);
