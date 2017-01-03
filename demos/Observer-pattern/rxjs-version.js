/**
 * Created by dulin on 17/1/3.
 */
//在RxJS中，一个观测者需要实现的接口扩展为三个：

//onNext(data) - 可观测对象生成的正常数据，将调用这个接口
//onError(error) - 可观测对象发生的错误，将调用这个接口
//onCompleted() - 可观测对象正常结束数据生成流程，将调用这个接口
var getTime =  function() {
    var _ = ['00','01','02','03','04','05','06','07','08','09'],  //补零
        d = new Date(), h = d.getHours(),m = d.getMinutes(),s = d.getSeconds();
    return [_[h]||h,_[m]||m,_[s]||s].join(":");
};

var elClock = document.getElementById("clock");

//实例化一个可观测对象
//RxJS提供了一个工厂方法Rx.Observable.create()来实例化一个可观测对象， 和我们的实现一样，你需要传入一个数据发生器
var tickObservable = Rx.Observable.create(function(observer) {
    setInterval(function() {
        //这里观测者observer有三个接口, 就是onNext(data), onError(error), onCompleted()
        observer.onNext(getTime());
    }, 1000);
});

//实例化一个观测者
//同样的，RxJS提供了一个工厂方法Rx.Observer.create()来实例化一个观测者。 你看到，需要提供三个函数分别处理onNext()调用、onError()调用和onCompleted() 调用：
//这三个函数的名称可以是任意的名称，甚至是匿名函数
var uiRefresher = Rx.Observer.create(
    function next(data) {
        elClock.textContent = data;
    },
    function onError(err) {
        console.error('Error: ', err);
    },
    function completed() {
        console.log('completed');
    }
);

//和我们的实现一样，调用可观测对象的subscribe()方法来将一个观测者连接到 可观测对象：
tickObservable.subscribe(uiRefresher);
