const Rx = require('rx');

const observable = Rx.Observable.create(function(observer) {
	observer.next(1);
	observer.next(2);
	observer.next(3);
	setTimeout(() => {
		observer.next(4);
		observer.onCompleted();
	}, 1000)
});

console.log('just before subscribe');
observable.subscribe(function(x) {
	console.log('got value' + x)
}, function(err) {
	console.error('something wrong occurred: ' + err)
}, function() {
	console.log('done')
});
console.log('just after subscribe')
