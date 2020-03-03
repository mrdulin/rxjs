import { timer, interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('switchMap', () => {
  it('should pass', () => {
    testScheduler.run(({ expectObservable }) => {
      const dueTime = testScheduler.createTime('|');
      const periodOrScheduler = testScheduler.createTime('---|');
      const source = timer(dueTime, periodOrScheduler).pipe(take(5));

      const expected = 'a--b--c--d--(e|)';
      const values = { a: 0, b: 1, c: 2, d: 3, e: 4 };
      expectObservable(source).toBe(expected, values);
    });
  });

  it('should pass with time progression syntax', () => {
    testScheduler.run(({ expectObservable }) => {
      const source = timer(0, 5000).pipe(take(5));
      const expected = '12ms a 4999ms b 4999ms c 4999ms d 4999ms (e|)';
      const values = { a: 0, b: 1, c: 2, d: 3, e: 4 };
      expectObservable(source).toBe(expected, values);
    });
  });
});
