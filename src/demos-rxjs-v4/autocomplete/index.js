/**
 * Created by elsa on 2017/1/1.
 */
window.onload = init;

var host = 'http://it-ebooks-api.info';
var API = {
    search: host + '/v1/search'
};

function init() {
    var searchBarEl = document.querySelector('#search-bar');
    debugger;
    var keyups = Rx.Observable.fromEvent(searchBarEl, 'keyup')
        .map(e => e.target.value)
        .filter(text => text.length > 2);

    var throttled = keyups.throttle(500);
    var distinct = throttled.distinctUntilChanged();

    var books = distinct.flatMapLatest(queryBook);
    books.subscribe(data => {
        debugger;
    })
}

function queryBook(query) {
    var url = API.search + '/' + query;
    return fetch(url).then(res => res.json()).then(data => {
        return data.Books;
    });
}
