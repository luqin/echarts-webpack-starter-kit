import React from 'react';
import { Router, Route, Link } from 'react-router';

import WordCloudChart from './WordCloudChart';

var App = React.createClass({
  render() {
    return (
      <div>
        <div>
          App
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

var About = React.createClass({
  render() {
    return (
      <div>
        About
      </div>
    );
  }
});

var Users = React.createClass({
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div className="master">
          <ul>
            {/* use Link to route around the app */}
            {[{id: 1, name: '1'}, {id: 2, name: '2'}].map(user => (
              <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var User = React.createClass({
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      user: {
        name: 'u1'
      }
    });
  },

  render() {
    return (
      <div>
        <h2>{this.state.user.name}</h2>
        {/* etc. */}
      </div>
    );
  }
});

var NoMatch = React.createClass({
  render() {
    return (
      <div>
        NoMatch
      </div>
    );
  }
});

var router = (
  <Router>
    <Route path="/" component={WordCloudChart}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
);

export default router;
