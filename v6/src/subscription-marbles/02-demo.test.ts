import { TestScheduler } from 'rxjs/testing';
const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('subscription-marbles', () => {
  it('should given a hot source, test multiple subscribers that subscribe at different times:', () => {
    testScheduler.run(({ hot, expectObservable }) => {
      const source$ = hot('--a--a--a--a--a--a--a--');
      const sub1 = '       --^-----------!';
      const expect1 = '    --a--a--a--a--';
      const sub2 = '       ---------^--------!';
      const expect2 = '    -----------a--a--a';
      expectObservable(source$, sub1).toBe(expect1);
      expectObservable(source$, sub2).toBe(expect2);
    });
  });
});
