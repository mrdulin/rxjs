import { Observable, TestScheduler } from 'rxjs';
import { hot, rxTestScheduler } from '../helpers/marble-testing';

describe('Observable.interval', () => {

  it('should create an observable emitting periodically', () => {
    const e1 = Observable.interval(20, rxTestScheduler)
      .take(6)
      .concat(Observable.never());
    const expected = '--a-b-c-d-e-f-';
    const values = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };
    rxTestScheduler.expectObservable(e1).toBe(expected, values);
    rxTestScheduler.flush();
  });

  it('should set up an interval', () => {
    const e1 = Observable.interval(100, rxTestScheduler);
    const expected = '----------0---------1---------2---------3---------4---------5---------6-----';
    rxTestScheduler.expectObservable(e1).toBe(expected, [0, 1, 2, 3, 4, 5, 6]);
    rxTestScheduler.flush();
  });

});
