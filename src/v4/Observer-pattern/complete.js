/**
 * Created by dulin on 17/1/3.
 */
var Rx = require('rx');

//如果数据发生器正常结束，就应当调用onCompleted()方法来通知观测者
//由于Rx.Observable.create()方法返回的是一个Observable对象，因此我们可以 采用链式写法直接进行subscribe()调用。
Rx.Observable.create(function(observer) {
  observer.onNext('A');
  observer.onNext('B');
  observer.onCompleted();
}).subscribe(
  // function(data) { console.log(data); },
  console.log.bind(this),
  console.error,
  console.log.bind(this, 'completed')
);

//倒计时例子：
Rx.Observable.create(function(observer) {
  let i = 10;
  let tid = setInterval(function() {
    observer.onNext(i--);
    if (i < 0) {
      clearInterval(tid);
      observer.onCompleted();
    }
  }, 1000);
}).subscribe(
  function(data) {
    console.log(data);
  },
  console.error,
  console.log.bind(this, 'completed')
);
