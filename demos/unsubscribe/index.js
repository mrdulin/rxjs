const Rx = require("rx");

const observable = Rx.Observable.create(function(observer) {
  observer.next(1);
  observer.next(2);
  setInterval(() => {
    observer.next('nmb');
  }, 1000);
});

const subscription = observable.subscribe(x => console.log(x));

setTimeout(() => {
  subscription.unsubscribe();
}, 10000);
