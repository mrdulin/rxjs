import { Observable, TestScheduler } from 'rxjs';
import {hot, rxTestScheduler} from '../helpers/marble-testing';

describe('Observable.prototype.merge', () => {

  it('should handle merging two hot observables', () => {

    const e1 = hot('----a--^--b-------c--|');
    const e2 = hot(  '---d-^--e---------f-----|');
    const expected =      '---(be)----c-f-----|';

    rxTestScheduler.expectObservable(e1.merge(e2)).toBe(expected);
    rxTestScheduler.flush();

  });

});
