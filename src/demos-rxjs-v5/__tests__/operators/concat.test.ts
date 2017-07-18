import { Observable, TestScheduler } from 'rxjs';
import {cold, rxTestScheduler} from '../helpers/marble-testing';

describe('Observable.prototype.filter', () => {

  it('t-1', () => {

    const e1 = cold('--a--b--|');
    const e2 = cold(        '--x--y--|');

    const expect = '--a--b----x--y--|';

    rxTestScheduler.expectObservable(e1.concat(e2, rxTestScheduler)).toBe(expect);
    rxTestScheduler.flush();

  });

});
