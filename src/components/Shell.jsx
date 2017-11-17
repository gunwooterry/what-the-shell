import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const shellStyle = {
  border: 0,
  fontFamily: 'monospace',
  fontSize: 18,
  width: '100%',
  height: '100%',
  margin: 'auto',
  paddingLeft: 8,
  paddingRight: 8,
};

const emphasizedStyle = {
  MozBoxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .4)',
  WebkitBoxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .4)',
  boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .24)',
  backgroundColor: '#fcfcfc',
  outline: 'none',
};

class Shell extends Component {
  render() {
    return (
      <Segment style={{ padding: 0, margin: 0, height: 48 }}>
        <input
          type="text"
          style={Object.assign(shellStyle, this.props.emphasized && emphasizedStyle)}
        />
      </Segment>
    );
  }
}

Shell.propTypes = {
  emphasized: PropTypes.bool.isRequired,
};


export default Shell;
