/**
 * Created by elsa on 2017/1/3.
 */
var subject = new Rx.BehaviorSubject('Wait for content');

subject.subscribe(
  function(result) {
    document.body.textContent = result.response || result;
  },
  function(err) {
    document.body.textContent = 'There was an error retrieving content';
  }
);

Rx.DOM.get('http://it-ebooks-api.info/v1/search/react').subscribe(subject);
