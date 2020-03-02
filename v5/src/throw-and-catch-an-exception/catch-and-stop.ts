import * as Rx from 'rxjs';

const interval$ = Rx.Observable.interval(1000);

interval$
  .map(val => {
    if (val > 5) {
      throw new Error('error');
    }
    return val;
  })
  .catch((err, source) => {
    // return Rx.Observable.empty();
    return Rx.Observable.throw(err);
  })
  .subscribe(
    val => {
      console.log(val);
    },
    err => {
      console.log('error happened', err);
    },
    () => {
      console.log('complete');
    }
  );
