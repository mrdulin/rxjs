import * as Rx from 'rxjs';

const error$ = Rx.Observable.throw('crash');

error$.subscribe(data => console.log(data), (err: string) => console.error(err), () => console.log('complete'));

const errorPatch$ = error$.catch((err: string) => Rx.Observable.of(`Patched ${err}`));

errorPatch$.subscribe((data: any) => console.log(data));
