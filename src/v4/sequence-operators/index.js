/**
 * Created by elsa on 2017/1/2.
 */
var Rx = require('rx');

// Rx.Observable.range(1, 10).subscribe(console.log);
// Rx.Observable.range(-3, 10).subscribe(console.log);

const a = Rx.Observable.interval(200).map(i => 'A' + i);
const b = Rx.Observable.interval(100).map(i => 'B' + i);

// Rx.Observable.merge(a, b).take(10).subscribe(console.log);

/**
 B0
 A0
 B1
 B2
 A1
 B3
 B4
 A2
 B5
 B6
 */

// Rx.Observable.range(1,5).map(x => x * 2).subscribe(logValue);

function logValue(value) {
  console.log(value);
}

function isEven(val) {
  return val % 2 === 0;
}

// Rx.Observable.range(1, 5).filter(isEven).subscribe(logValue);

// Rx.Observable.range(1, 5).reduce((acc, x) => acc + x).subscribe(logValue);

// const avg = Rx.Observable.range(1, 5)
//     .reduce((prev, cur) => {
//         return {
//             sum: prev.sum + cur,
//             count: prev.count + 1
//         };
//     }, {sum: 0, count: 0});
//
// avg.subscribe(logValue); //{ sum: 15, count: 5 }
//
// avg.map(x => x.sum / x.count ).subscribe(x => console.log('Average is: ', x)); //Average is:  3

// const average = Rx.Observable.interval(1000)
//     .scan((prev, cur) => {
//         return {
//             sum: prev.sum + cur,
//             count: prev.count + 1
//         }
//     }, {sum: 0, count: 0})
//     .map(x => x.sum / x.count)
//     .subscribe(console.log);

const concatAll = source => source.reduce((a, b) => a.concat(b));

// console.log(concatAll([[1,2,3], [4,5,6], [7, 8, 9]]));
//[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

var counter = Rx.Observable.interval(1000);

// var subscription1 = counter.subscribe(i => console.log('Subscription 1: ', i));
// var subscription2 = counter.subscribe(i => console.log('Subscription 2: ', i));
//
// setTimeout(() => {
//     console.log('Canceling subscription2!');
//     subscription2.dispose();
// }, 2000)

var p = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000);
});

// p.then(() => console.log('Potential side effect!'));
//
// var subscription = Rx.Observable.fromPromise(p).subscribe(() => console.log('Observable resolved!'));
// subscription.dispose();

function getJSON(arr) {
  return Rx.Observable.from(arr).map(JSON.parse);
}

// getJSON([
//     '{"1": 1, "2": 2}',
//     '{"success: true}',
//     '{"enabled": true}'
// ]).subscribe(
//     function onNext(json) {
//         console.log('Parsed JSON: ', json);
//     },
//     function onError(err) {
//         console.log(err.message);
//     }
// )

//Parsed JSON:  { '1': 1, '2': 2 }
//Unexpected token s in JSON at position 2

var caught = getJSON(['{"1": 1, "2": 2}', '{"1: 1}', '{"enabled": true}']).catch(
  Rx.Observable.return({
    error: 'There was an error parsing JSON'
  })
);

caught.subscribe(
  function onNext(json) {
    console.log('Parsed JSON: ', json);
  },
  function onError(e) {
    console.log('Error: ', e.message);
  }
);
