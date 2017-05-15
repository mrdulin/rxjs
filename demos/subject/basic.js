const Rx = require('rx');

const subject = new Rx.Subject();
const disposables = new Rx.CompositeDisposable();

//subject作为observable，可以被subscribe
const subSubject1 = subject.subscribe(
  (v) => console.log('observerA: ' + v),
  e => console.log('errorA: ' + e.message),
  () => console.log('completed A')
);

const subSubject2 = subject.subscribe(
  (v) => console.log('observerB: ' + v),
  e => console.log('errorB: ' + e.message),
  () => console.log('completed B')
);


//subject作为Observer，调用next生产值
subject.onNext(1);
subject.onNext(2);

disposables.add(subSubject1);
disposables.add(subSubject2);

setTimeout(() => {
  subject.onCompleted();
  console.log('subSubject1 and subSubject2 are disposed');
  console.log('is disposed: ' + disposables.isDisposed);
  disposables.dispose();
  console.log('is disposed: ' + disposables.isDisposed);
}, 1000);

const observable = Rx.Observable.from(['a','b','c']);

observable.subscribe(subject);
