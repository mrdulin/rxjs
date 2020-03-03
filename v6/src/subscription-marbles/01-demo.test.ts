import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('Subscription Marbles', () => {
  it('should repeat forever', () => {
    testScheduler.run(({ expectObservable }) => {
      const foreverStream$ = interval(1).pipe(mapTo('a'));
      const unsub = '------ !';
      expectObservable(foreverStream$, unsub).toBe('-aaaaa');
    });
  });
});
