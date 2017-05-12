/**
 * Created by dulin on 17/1/3.
 */
var Rx = require('rx');

//在数据发生器中，如果发生了错误，就应当调用onError()方法来通知观测者。 这将导致一个异常中止，即观测者将不会收到之后的通知。
//下面的示例将在终端输出：1和"some fake error"，但不会输出2：

var dataGenerator = function(observer) {
    observer.onNext('1');
    observer.onError('some fake error');
    observer.onNext('2');
};

var tickObservable = Rx.Observable.create(dataGenerator);

tickObservable.subscribe(
    function(data) { console.log(data); },
    function (error) { console.error(new Error(error)); },
    function () { console.log('completed'); }
);

//在上面的代码中，我们直接给subscribe()方法传入三个函数，而不是一个Observer 对象。RxJS可以处理这种调用方法，它将自动构造一个匿名的Observer对象。查看源码。
