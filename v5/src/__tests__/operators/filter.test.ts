import { Observable, TestScheduler } from 'rxjs';
import {hot, rxTestScheduler} from '../helpers/marble-testing';

describe('Observable.prototype.filter', () => {

  it('t-1', () => {
    const values = {x: 1, y: 2, z: 3};
    const e1 = hot('-x-y-z', values);
    const expected = '---y';

    const actual$ = e1.filter((x: number) => x % 2 === 0);

    rxTestScheduler.expectObservable(actual$).toBe(expected, values);
    rxTestScheduler.flush();
  });

});
