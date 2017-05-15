const dom_search = document.getElementById('search');

const obs = Rx.Observable.fromEvent(dom_search, 'keyup')
  .map(e => e.target.value)
  .debounce(500);

obs.subscribeOnNext(val => {
  console.log(val);
});
