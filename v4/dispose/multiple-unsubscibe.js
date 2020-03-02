const Rx = require('rx');

const obs1 = Rx.Observable.interval(1000);
const obs2 = Rx.Observable.interval(1000);

const sub1 = obs1.subscribe(x => console.log(x));
const sub2 = obs2.subscribe(x => console.log(x));

const disposables = new Rx.CompositeDisposable(sub1, sub2);

setTimeout(() => {
  console.log('sub1 and sub2 are disposed');
  disposables.dispose();
}, 2000);
