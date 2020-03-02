const Rx = require('rx');

const subject = new Rx.BehaviorSubject(0);

subject.subscribe(v => console.log('observer A: ' + v));

subject.onNext(1);
subject.onNext(2);

subject.subscribe(v => console.log('observer B: ' + v));

subject.onNext(3);
