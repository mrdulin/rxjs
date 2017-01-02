/**
 * Created by elsa on 2017/1/2.
 */
window.onload = init;

function init() {
    // var requestStream = Rx.Observable.just('https://api.github.com/users');

    // 1
    // requestStream.subscribe(function(requestUrl) {
    //
    //     var responseStream = Rx.Observable.create(function(observer) {
    //         $.getJSON(requestUrl)
    //             .done(function(res) {observer.onNext(res)})
    //             .fail(function(jqXHR, status, error) {observer.onError(error)})
    //             .always(function() {observer.onCompleted()});
    //     });
    //
    //
    //     responseStream.subscribe(function(res) {
    //         console.log(res);
    //     })
    // });

    // 2
    // var responseStream = requestStream.flatMap(function(requestUrl) {
    //     return Rx.Observable.fromPromise($.getJSON(requestUrl));
    // })


    // 3
    var refreshButton = document.querySelector('#refresh');
    var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

    // var requestOnRefreshStream = refreshClickStream.map(function() {
    //     var randomOffset = Math.floor(Math.random() * 500);
    //     return 'https://api.github.com/users?since=' + randomOffset;
    // })
    //
    // var startupRequestStream = Rx.Observable.just('https://api.github.com/users');

    // var requestStream = Rx.Observable.merge(
    //     requestOnRefreshStream,
    //     startupRequestStream
    // );


    // var requestStream = refreshClickStream.map(function() {
    //     var randomOffset = Math.floor(Math.random() * 500);
    //     return 'https://api.github.com/users?since=' + randomOffset;
    // }).merge(Rx.Observable.just('https://api.github.com/users'));


    // var requestStream = refreshClickStream.map(function() {
    //     var randomOffset = Math.floor(Math.random() * 500);
    //     return 'https://api.github.com/users?since=' + randomOffset;
    // }).startWith('https://api.github.com/users');

    var requestStream = refreshClickStream.startWith('startup click').map(function() {
        var randomOffset = Math.floor(Math.random() * 500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });


    responseStream.subscribe(function(res) {
        console.log(res);
    })


}