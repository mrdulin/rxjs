/**
 * Created by dulin on 17/1/3.
 */
//1.
// var quakes = Rx.Observable.create(function(observer) {
//     window.eqfeed_callback = function(response) {
//         var quakes = response.features;
//         quakes.forEach(function(quake) {
//             observer.onNext(quake);
//         })
//     }
//
//     loadJSONP(QUAKE_URL);
// })

//2. 使用flatMap
// var quakes = Rx.Observable.create(function(observer) {
//     window.eqfeed_callback = function(response) {
//         observer.onNext(response);
//         observer.onCompleted();
//     }
//
//     loadJSONP(QUAKE_URL);
// }).flatMap(function transform(dataset) {
//     var features = Rx.Observable.from(dataset.features);
//     return features;
// });

// quakes.subscribe(function(quake) {
//     var coords = quake.geometry.coordinates;
//     var size = quake.properties.mag * 10000;
//     console.log(coords, size);
//     L.circle([coords[1], coords[0], size]).addTo(map);
// })

//2.x 使用map
var quakes = Rx.Observable.create(function(observer) {
  window.eqfeed_callback = function(response) {
    observer.onNext(response);
    observer.onCompleted();
  };

  loadJSONP(QUAKE_URL);
}).map(function(data) {
  return Rx.Observable.from(data.features);
});

quakes.subscribe(function(quakeObservable) {
  quakeObservable.subscribe(function(quake) {
    var coords = quake.geometry.coordinates;
    var size = quake.properties.mag * 10000;
    console.log(coords, size);
    L.circle([coords[1], coords[0], size]).addTo(map);
  });
});

//3. 使用Rx.DOM
// var quakes = Rx.DOM.jsonpRequest({
//     url: QUAKE_URL,
//     jsonpCallback: 'eqfeed_callback'
// });
// //quakes:ScriptObservable
//
// var step2 = quakes.flatMap(function transform(data) {
//     return Rx.Observable.from(data.response.features);
// });
// //step2: MergeAllObservable
// var step3 = step2.map(function(quake) {
//     return {
//         lat: quake.geometry.coordinates[1],
//         lng: quake.geometry.coordinates[0],
//         size: quake.properties.mag * 10000
//     }
// });
// //step3: MapObservable
//
// step3.subscribe(function onNext(quake) {
//     L.circle([quake.lat, quake.lng], quake.size).addTo(map);
// })

//4. 实时的
// var quakes = Rx.Observable.interval(5000)
//     .flatMap(function() {
//         return Rx.DOM.jsonpRequest({
//             url: QUAKE_URL,
//             jsonpCallback: 'eqfeed_callback'
//         }).retry(3);
//     })
//     .flatMap(function(result) {
//         console.log(result);
//         return Rx.Observable.from(result.response.features);
//     })
//     .distinct(function(quake) {
//         return quake.properties.code;
//     });
//
// quakes.subscribe(function(quake) {
//     var coords = quake.geometry.coordinates;
//     var size = quake.properties.mag * 10000;
//     // console.log(quake);
//     L.circle([coords[1], coords[0], size]).addTo(map);
// })
