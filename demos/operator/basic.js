const Rx = require('rx');

//每一个操作符都是基于当前可观察对象创建一个新的可观察对象的函数。这是一个单纯无害的操作:之前的可观察对象仍然保持不变。

//例一：
function multiplyByTen(arrNumber) {
  return Rx.Observable.create(observer => {
    arrNumber.subscribe(
      function onNext(num) {
        const newNum = num * 10;
        observer.onNext(newNum);
      },
      function onError(e) {
        observer.onError(e);
      },
      function onComplete() {
        observer.onCompleted();
      }
    )
  });
}

const numsObservable = Rx.Observable.from([1,2,3,4]);

const resultObservable = multiplyByTen(numsObservable);

resultObservable.subscribe(
  v => console.log(v),
  e => console.log(e),
  () => console.log('completed')
)


//将上述方法定义为rx的操作符
Rx.Observable.prototype.multiplyByTen = function() {
  //这里的this是FromObservable
  const _this = this;
  return Rx.Observable.create(observer => {
    _this.subscribe(
      v => observer.onNext(v * 10),
      e => observer.onError(e),
      () => observer.onCompleted()
    )
  });
};

const obs = Rx.Observable.from([1,2,3,4]).multiplyByTen();

obs.subscribe(
  v => console.log(v),
  e => console.log(e),
  () => console.log('completed')
)
