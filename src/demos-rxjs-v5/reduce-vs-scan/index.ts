import * as Rx from 'rxjs';

// reduce

// 1
const add = (x: number, y: number): number => x + y;

Rx.Observable.from([
  {
    date: '2016-07-01',
    amount: -320.00
  },
  {
    date: '2016-07-13',
    amount: 1000.00
  },
  {
    date: '2016-07-22',
    amount: 45.0
  }
])
  .pluck('amount')
  .reduce(add, 0)
  .subscribe(console.log);


// 2
const candidates: any[] = [
  { name: 'Brendan Eich', experience: 'JavaScript Inventor' },
  { name: 'Emmet Brown', experience: 'Historian' },
  { name: 'George Lucas', experience: 'Sci-fi writer' },
  { name: 'Alberto Perez', experience: 'Zumba Instructor' },
  { name: 'Bjarne Stroustrup', experience: 'C++ Developer' }
];

Rx.Observable.from(candidates)
  .filter((candidate: any) => {
    const bg: string = candidate.experience.toLowerCase();
    return bg.includes('javascript') || bg.includes('c++');
  })
  .reduce((acc, obj) => {
    acc.push(obj.name);
    return acc;
  }, [])
  .subscribe(console.log);


// scan，和reduce类似，都是对Observable发出的每一个值执行累加器，不同的是，scan会发出每一次累加的中间值。

Rx.Observable.from(candidates)
  .filter((candidate: any) => {
    const bg: string = candidate.experience.toLowerCase();
    return bg.includes('javascript') || bg.includes('c++');
  })
  .scan((acc, obj) => {
    acc.push(obj.name);
    return acc;
  }, [])
  .subscribe(console.log);
