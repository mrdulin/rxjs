import * as Rx from 'rxjs';

const ATTEMPT_COUNT: number = 3;
const DELAY: number = 1000;

const delayWithTimes$ = Rx.Observable.of(1, 2, 3)
  .map((val: number): number => {
    if (val === 2) {
      throw new Error('something bad happened');
    } else {
      return val;
    }
  })
  .retryWhen(notBeyondTheAttemptCount);

function notBeyondTheAttemptCount(e: any) {
  return e.scan((errorCount: number, err: Error) => {
    if (errorCount >= ATTEMPT_COUNT) {
      throw err;
    }
    return errorCount + 1;
  }, 0).delay(DELAY);
}

delayWithTimes$.subscribe(
  (val: number) => console.log('delay and times - val', val),
  (err: any) => console.error('delay and times - err', err)
);
