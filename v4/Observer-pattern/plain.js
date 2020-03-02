/**
 * Created by dulin on 17/1/3.
 */
var Observer = function(consumer) {
  this._consumer = consumer;
};

Observer.prototype.onNotify = function(data) {
  this._consumer.call(this, data);
};

var Observable = function(generator) {
  this._generator = generator;
};

Observable.prototype.subscribe = function(observer) {
  this._generator.call(this, observer);
};

var getTime = function() {
  var _ = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'], //补零
    d = new Date(),
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds();
  return [_[h] || h, _[m] || m, _[s] || s].join(':');
};

var elClock = document.getElementById('clock');

//1.定义可观测对象
var generator = function(observer) {
  setInterval(function() {
    observer.onNotify(getTime());
  }, 1000);
};
//对比
// Rx.Observable.create(function(observer) {
//      observer.onNext();
//      observer.onCompleted();
// })
var tickObservable = new Observable(generator);

//2.定义观测者
var customer = function(data) {
  elClock.textContent = data;
};

var uiRefresher = new Observer(customer);

//3.建立连接
tickObservable.subscribe(uiRefresher);
