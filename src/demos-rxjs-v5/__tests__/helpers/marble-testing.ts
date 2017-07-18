import { HotObservable } from 'rxjs/testing/HotObservable';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import { TestScheduler } from 'rxjs';

const rxTestScheduler = new TestScheduler((a, b) => expect(a).toEqual(b));

function hot(marbles: string, values?: any, error?: any): HotObservable<any> {
  return rxTestScheduler.createHotObservable.apply(rxTestScheduler, arguments);
}

function cold(marbles: string, values?: any, error?: any): ColdObservable<any> {
  return rxTestScheduler.createColdObservable.apply(rxTestScheduler, arguments);
}

export {
  rxTestScheduler,
  hot,
  cold
};
