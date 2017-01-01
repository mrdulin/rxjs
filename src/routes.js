const routes = {
    path: '/',
    component: require('modules/app').default,
    getChildRoutes(nextState, cb) {
        require.ensure([], require => {
            cb(null, [
                require('./modules/search')
            ])
        })
    }
}


export default routes;