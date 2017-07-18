/**
 * Created by elsa on 2017/1/2.
 */
var allMoves = Rx.Observable.fromEvent(document, 'mousemove');

// allMoves.subscribe(function(e) {
//     console.log(e.clientX, e.clientY);
// });

var moveOnTheRight = allMoves.filter(function(e) {
    return e.clientX > window.innerWidth / 2;
});

var moveOnTheLeft = allMoves.filter(function(e) {
    return e.clientX < window.innerWidth / 2;
});

moveOnTheRight.subscribe(function(e) {
    console.log('Mouse is on the right: ', e.clientX);
});

moveOnTheLeft.subscribe(function(e) {
    console.log('Mouse is on the left: ', e.clientX);
});