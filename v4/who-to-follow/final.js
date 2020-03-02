/**
 * Created by dulin on 17/1/3.
 */
var refreshButton = document.querySelector('#refresh');
var refreshClickObservable = Rx.Observable.fromEvent(refreshButton, 'click');

var closeButton = document.querySelector('#close');
var closeClickObservable = Rx.Observable.fromEvent(closeButton, 'click');

var requestObservable = Rx.Observable.just('https://api.github.com/users');

var responseObservable = requestObservable.flatMap(function(url) {
  return Rx.Observable.fromPromise($.getJSON(url));
});

var suggestion1Stream = closeClickObservable
  .startWith('startup click')
  .combineLatest(responseObservable, function(click, listUsers) {
    return listUsers[Math.floor(Math.random() * listUsers.length)];
  })
  .merge(
    refreshClickObservable.map(function() {
      return null;
    })
  )
  .startWith(null);

suggestion1Stream.subscribe(function(data) {
  console.log(data);
  var $followList = $('#follow-list');
  $followList.empty();
  if (data === null) {
  } else {
    var $li = $('<li>' + data.login + '</li>');
    $followList.append($li);
  }
});
