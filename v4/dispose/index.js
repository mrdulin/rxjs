const Rx = require('rx');

const observable = Rx.Observable.create(function(observer) {
  observer.next(1);
  observer.next(2);
  const intervalId = setInterval(() => {
    observer.next('nmb');
  }, 1000);

  return function dispose() {
    clearInterval(intervalId);
  };
});

const subscription = observable.subscribe(x => console.log(x));

setTimeout(() => {
  console.log('subscription dispose');
  // subscription.unsubscribe()
  subscription.dispose();
}, 5000);
