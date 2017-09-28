import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

//缓存数据
const getDataFromCache = (cacheMock: boolean) =>
  new Promise((resolve) => setTimeout(resolve, 1000, cacheMock ? 'data from cache' : null));
//接口请求数据
const getDataFromServer = () => Observable.of('data from server');

/**
 * 如果有缓存数据，从缓存数据中取
 * 否则，从接口请求数据。
 *
 * @returns
 */
function main() {

  const cacheMock = false;
  const getDataFromCache$ = Observable.fromPromise(getDataFromCache(cacheMock));

  return getDataFromCache$.mergeMap((cacheData) => {
    console.log('cacheData', cacheData);
    if (cacheData) {
      return Observable.of(cacheData);
    }
    return getDataFromServer();
  });
}


main().subscribe((data) => {
  console.log('data:', data);
});

