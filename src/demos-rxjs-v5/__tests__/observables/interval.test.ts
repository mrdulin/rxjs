import { Observable, TestScheduler } from 'rxjs';

describe('Observable.interval', () => {

  it('should create an observable emitting periodically', () => {
    const testScheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
    const e1 = Observable.interval(20, testScheduler)
      .take(6)
      .concat(Observable.never());
    const expected = '--a-b-c-d-e-f-';
    const values = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, };
    testScheduler.expectObservable(e1).toBe(expected, values);
    testScheduler.flush();
  });

  it('should set up an interval', () => {


  });

});
