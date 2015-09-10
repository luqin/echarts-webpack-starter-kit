import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import App from './components/App';
import NoMatch from './components/NoMatch';
import WordCloudChart from './components/WordCloudChart';

var router = (
    <Router>
        <Redirect from="/" to="/echarts/word-cloud"/>
        <Route path="/" component={App}>
            <Route path="echarts">
                <Route path="word-cloud" component={WordCloudChart}/>
            </Route>

            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
);

export default router;
