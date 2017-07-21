import * as Rx from 'rxjs';

const badStream$ = Rx.Observable.throw('crash');
const goodStream$ = Rx.Observable.of(1, 2, 3);

const merged$ = Rx.Observable.merge(
  badStream$,
  goodStream$
);

merged$.subscribe(
  (data: any) => console.log(data),
  (err: any) => console.error(err),
  () => console.log('merge completed')
);

// ----
const mergedPatched$ = Rx.Observable.merge(
  badStream$,
  goodStream$
).catch((err: any) => Rx.Observable.of(err));

mergedPatched$.subscribe(
  (data: any) => console.log(data),
  (err: any) => console.error(err),
  () => console.log('patchedMerged completed')
);

// ----
const preMergedPatched$ = Rx.Observable.merge(
  badStream$.catch((err: any) => Rx.Observable.of(`pre patched merge ${err}`)),
  goodStream$
).catch((err: any) => Rx.Observable.of(err));

preMergedPatched$.subscribe(
  (data: any) => console.log(data),
  (err: any) => console.error(err),
  () => console.log('pre patched merge completed')
);
