import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

const historyStyle = {
  padding: 0,
  margin: 0,
  marginBottom: 8,
  height: 520,
  maxHeight: 520,
  overflowY: 'auto',
};

class CommandList extends Component {
  render() {
    return (
      <Segment style={historyStyle}>
      </Segment>
    );
  }
}

export default CommandList;
