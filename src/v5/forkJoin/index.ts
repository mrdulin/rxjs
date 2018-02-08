import * as Rx from 'rxjs';

const obs1 = Rx.Observable.throw('123');
const obs2 = Rx.Observable.interval(1000).take(5);

//forkJoin和Promise.all的功能一样, 所有的Observable都正常产出值，forkJoin才会执行subscribe的next函数
//只要有一个Observable抛出异常，forkJoin执行subscribe的error函数
//forkJoin的Observable都能正常发出值，则最后执行subscribe的next函数的时刻是最慢的Observable最后发出值的时刻，
//不过，只要其中某一个Observable抛出了异常，马上执行subscribe的error函数。
Rx.Observable.forkJoin([obs1, obs2]).subscribe(
  result => {
    console.log('result 1: ', result);
  },
  err => {
    console.log('err 1: ', err);
  }
);

//如何让并行执行的同时，某一个Observable抛出异常时，仍然执行subscribe的next函数
Rx.Observable.forkJoin([obs1, obs2].map(obs => obs.catch(err => Rx.Observable.of(false)))).subscribe(
  function next(result) {
    console.log('result 2: ', result);
  },
  function error(err) {
    console.log('err 2: ', err);
  }
);

//所有的Observable都正常发出值，执行subscribe的next函数
const obs3 = Rx.Observable.of('蚊子叮-痒');

Rx.Observable.forkJoin([obs2, obs3]).subscribe(
  function next(result) {
    console.log('result 3:', result);
  },
  function error(err) {
    console.log('err 3:', err);
  }
);

//当特定的Observable抛出异常时，执行subscribe的error函数
const obs4 = Rx.Observable.throw('ice angel');
Rx.Observable.forkJoin(
  [obs1, obs2, obs3, obs4].map(obs =>
    obs.catch(err => {
      if (err === 'ice angel') {
        throw err;
      }
      return Rx.Observable.of(err);
    })
  )
).subscribe(
  result => {
    console.log('result 4:', result);
  },
  err => {
    console.log('err 4:', err);
  }
);
