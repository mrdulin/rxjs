import { Observable, TestScheduler } from 'rxjs';
import { hot, rxTestScheduler } from '../helpers/marble-testing';

describe('Observable.prototype.zip', () => {

  it('从不同的源头结合年龄和名称', (done: jest.DoneCallback) => {

    const expected = [
      { age: 27, name: 'Foo', isDev: true },
      { age: 25, name: 'Bar', isDev: false },
      { age: 29, name: 'Beer', isDev: false }
    ];

    let i = 0;

    const age$: Observable<number> = Observable.of<number>(27, 25, 29);
    const name$: Observable<string> = Observable.of<string>('Foo', 'Bar', 'Beer');
    const isDev$: Observable<boolean> = Observable.of<boolean>(true, false, false);


    Observable.zip(age$, name$, isDev$, (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
      .subscribe(
      (x: any) => expect(x).toEqual(expected[i++]),
      () => { },
      done
      );
  });

  it('should combine a source with a second', () => {

    const values = {
      a: 1,
      b: 2,
      c: 3,

      x: 99,
      y: 98,
      z: 97,

      q: [1, 99],
      w: [2, 98],
      e: [3, 97],

      i: 1 + 99,
      o: 2 + 98,
      p: 3 + 97
    };

    const e1 = rxTestScheduler.createHotObservable('---a---b---c---', values);
    const e2 = rxTestScheduler.createHotObservable('--x--y--z--', values);

    const expected = '---q---w---e';

    rxTestScheduler.expectObservable(e1.zip(e2)).toBe(expected, values);

    const expected2 = '---i---o---p';
    const actual$ = e1.zip(e2, (x: number, y: number) => x + y);
    rxTestScheduler.expectObservable(actual$).toBe(expected2, values);

    rxTestScheduler.flush();

  });

});
