/**
 * Created by elsa on 2017/1/2.
 */
window.onload = init;

function init() {
    var clickCount = 0;
    document.addEventListener('click', handleClick);

    function handleClick(e) {
        if(clickCount < 10) {
            if(e.clientX > window.innerWidth / 2) {
                clickCount++;
                console.log(e.clientX, e.clientY);
            }
        }
    }

    // Rx.Observable.fromEvent(document, 'click')
    //     .filter(function(e) {
    //         return e.clientX > window.innerHeight / 2;
    //     })
    //     .take(10)
    //     .subscribe(function(e) {
    //         console.log(e.clientX, e.clientY);
    //     })
}
