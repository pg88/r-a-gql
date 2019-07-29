import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class Info extends Component {
  render() {
    const links = {};
    return (
      <div>
        <h2>Learn Meteor!</h2>

      </div>
    );
  }


}

export default InfoContainer = withTracker(() => {
  return {
    links: null,
  };
})(Info);
