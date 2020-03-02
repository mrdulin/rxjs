/**
 * Created by dulin on 17/1/3.
 */
const Rx = require('rx');

// Rx.Observable
//     .from([1,2,3,4,5,6,7,8])
//     .filter(val => val % 2)
//     .map(val => val * 10)
//     .subscribe(console.log);

function updateDistance(acc, i) {
  if (i % 2 === 0) {
    acc += 1;
  }
  return acc;
}

var tickObservable = Rx.Observable.interval(1000).scan(updateDistance, 0);

tickObservable.subscribe(evenTicks => {
  console.log('Subscriber 1 - evenTicks: ' + evenTicks + ' so far');
});

tickObservable.subscribe(evenTicks => {
  console.log('Subscriber 2 - evenTicks: ' + evenTicks + ' so far');
});
