import * as Rx from 'rxjs';

const stream$: Rx.Observable<any> = Rx.Observable.of({ message: 'Logged in' })
  .switchMap((result: any) => {
    return Rx.Observable.of({ id: 1, name: 'user' });
  })
  .switchMap((user) => {
    return Rx.Observable.from(
      [{ id: 114, userId: 1 },
      { id: 117, userId: 1 }]
    );
  });

stream$.subscribe((orders) => {
  console.log('Orders', orders);
});
