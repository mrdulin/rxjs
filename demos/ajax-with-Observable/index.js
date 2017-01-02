/**
 * Created by elsa on 2017/1/2.
 */
//使用RXJS的create方法创建Observable
function get(url) {
    return Rx.Observable.create(function(observer) {
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            if(req.status === 200) {
                observer.onNext(req.response);
                observer.onCompleted();
            } else {
                observer.onError(new Error(req.statusText));
            }
        }

        req.onerror = function() {
            observer.onError(new Error('Unknown Error'));
        }

        req.send();
    })
}

var test = get('./contents.json');

test.subscribe(
    function onNext(x) {
        console.log('Result: ' + x);
    },
    function onError(err) {
        console.error('Error: ' + err);
    },
    function onCompleted() {
        console.log('Completed');
    }
);

//使用RXJS DOM库更简单
Rx.DOM.get('./contents.json').subscribe(
    function onNext(data) {
        console.log(data.response);
    },
    function onError(err) {
        console.error(err);
    }
);
