import * as Rx from 'rxjs';

const modules: { [id: number]: object } = {
  1: { id: 1, name: 'react' },
  2: { id: 2, name: 'angular' },
  3: { id: 3, name: 'rxjs' }
};

const mockResponses: { [path: string]: any } = {
  getModuleIds: {
    success: () => [1, 2, 3],
    fail: { error: true }
  },
  getModuleById: {
    success: (ids: number[]) =>
      ids.reduce((pre: { [id: number]: object }, id: number) => {
        pre[id] = modules[id];
        return pre;
      }, {}),
    fail: { error: true }
  }
};

const coin = () => Math.random() > 0.5;
const apiRequest = (data: { path: string; params?: any }) => {
  console.log('timestamp: ', Date.now(), data);
  const mockResponse = mockResponses[data.path];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      coin() ? resolve(mockResponse.success(data.params)) : reject(mockResponse.fail);
    }, 2000);
  });
};

const getModuleIds = () => apiRequest({ path: 'getModuleIds' });
const getModuleById = (ids: number[]) => apiRequest({ path: 'getModuleById', params: ids });

function getAllModules$() {
  return Rx.Observable.fromPromise(getModuleIds())
    .catch((err: any) => Rx.Observable.throw(new Error('getModuleIds出错')))
    .switchMap((moduleIds: number[]) => Rx.Observable.of(moduleIds))
    .switchMap((ids: number[]) => {
      return Rx.Observable.fromPromise(getModuleById(ids)).catch((err: any) =>
        Rx.Observable.throw(new Error('getModuleById出错'))
      );
    });
}

getAllModules$().subscribe(
  (mod: { [id: number]: object }) => {
    console.log('mod: ', mod);
  },
  (err: Error) => {
    console.log(err.message);
  }
);
