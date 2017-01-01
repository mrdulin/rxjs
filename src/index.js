const {render} = ReactDOM;
const {Router, browserHistory} = ReactRouter;

import routes from './routes';

import 'weui';

render(
    <Router history={browserHistory} routes={routes}></Router>,
    document.getElementById('container')
)