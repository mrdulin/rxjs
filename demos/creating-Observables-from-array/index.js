/**
 * Created by elsa on 2017/1/2.
 */
var Rx = require('rx');

Rx.Observable
    .from(['angular', 'react', 'jquery'])
    .subscribe(
        function onNext(x) {
            console.log('Next: ' + x)
        },
        function onError(err) {
            console.log('Error: ', err);
        },
        function onCompleted() {
            console.log('Completed');
        }
    )

/**
 *
 Next: angular
 Next: react
 Next: jquery
 Completed

 */