var fileuploadEl = document.getElementById('fileupload');

Rx.DOM.change(fileuploadEl)
    .flatMap(function(event) {
        return Rx.Observable.from(event.target.files);
    })
    .filter(function(file) {
        debugger;
    })