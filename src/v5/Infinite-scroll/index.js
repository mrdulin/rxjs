const scrollElem = document.getElementById('infinite-scroller');
const scrollEvent$ = Rx.Observable.fromEvent(scrollElem, 'scroll');
/**
   Stream logic
**/
const userScrolledDown$ = scrollEvent$
  .map(e => ({
    sH: e.target.scrollHeight,
    sT: e.target.scrollTop,
    cH: e.target.clientHeight
  }))
  .pairwise()
  .filter(positions => {
    return isUserScrollingDown(positions) && isScrollExpectedPercent(positions[1], 70)
  });

const requestOnScroll$ = userScrolledDown$
  .startWith([])
  .exhaustMap(() => Rx.Observable.fromPromise(fetch(getQuotesAPI())))

/**
   Subscribe and apply effects
**/
requestOnScroll$.subscribe(processData);
