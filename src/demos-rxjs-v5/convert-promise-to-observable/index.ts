import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

//缓存数据
const getDataFromCache = (cacheMock: boolean) =>
  new Promise(resolve => setTimeout(resolve, 1000, cacheMock ? 'data from cache' : null));
//接口请求数据
const getDataFromServer = () => {
  if (Math.random() > 0.5) {
    return Observable.of('data from server');
  } else {
    return Observable.throw('server error');
  }
};

/**
 * 如果有缓存数据，从缓存数据中取
 * 否则，从接口请求数据。
 *
 * @returns
 */
function main() {
  const cacheMock = false;
  const getDataFromCache$ = Observable.fromPromise(getDataFromCache(cacheMock));

  return getDataFromCache$
    .mergeMap(cacheData => {
      console.log('cacheData', cacheData);
      if (cacheData) {
        return Observable.of(cacheData);
      }
      return getDataFromServer();
    })
    .catch(err => Observable.throw('请求数据失败'));
}

main().subscribe(
  data => {
    console.log('data:', data);
  },
  (errMsg: string) => {
    console.log('errMsg: ', errMsg);
  }
);
