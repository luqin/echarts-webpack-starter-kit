import React from 'react';

var App = React.createClass({
    render() {
        return (
            <div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default App;