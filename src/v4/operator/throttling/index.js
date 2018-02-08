const obs = Rx.Observable.fromEvent(window, 'resize').throttle(250);
obs.subscribeOnNext(e => {
  console.log('inner height: ' + window.innerHeight);
  console.log('inner width: ' + window.innerWidth);
});
